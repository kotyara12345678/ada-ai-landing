"""Тесты API коммерческих предложений."""

from __future__ import annotations

from fastapi.testclient import TestClient

from tests.conftest import valid_lead

HEADERS = {"Authorization": "Bearer test-admin-token"}


def _create(client: TestClient, **payload: object) -> dict:
    response = client.post("/api/admin/proposals", json=payload, headers=HEADERS)
    assert response.status_code == 201, response.text
    return response.json()


def _content(revision: int, **overrides: object) -> dict:
    payload = {
        "revision": revision,
        "content": {
            "template": "growth-automation",
            "problem": "Ручная обработка заявок",
            "solution": "Автоматизируем приём и распределение",
            "deliverables": ["Согласованный план"],
            "scope": [
                {
                    "id": "row-1",
                    "title": "Лендинг",
                    "quantity": 1,
                    "unit": "шт.",
                    "unit_price": 7000,
                },
                {
                    "id": "row-2",
                    "title": "Автоматизация",
                    "quantity": 2,
                    "unit": "шт.",
                    "unit_price": 8000,
                },
            ],
            "stages": [{"title": "Анализ", "duration": "по согласованию", "description": ""}],
            "payment_terms": "50/50",
            "notes": "",
        },
    }
    payload.update(overrides)
    return payload


def test_proposals_require_admin(client: TestClient) -> None:
    assert client.get("/api/admin/proposals").status_code == 401
    assert (
        client.get(
            "/api/admin/proposals", headers={"Authorization": "Bearer wrong"}
        ).status_code
        == 401
    )


def test_create_proposal_numbers_and_defaults(client: TestClient) -> None:
    first = _create(client, client_company="ООО Ромашка")
    second = _create(client)

    assert first["public_id"].startswith("КП-")
    assert first["status"] == "draft"
    assert first["client_company"] == "ООО Ромашка"
    assert first["total"] == 0
    assert first["revision"] == 1
    assert first["content"]["template"] == "growth-automation"
    assert first["content"]["catalog_snapshot"], "снимок цен должен сохраняться в КП"

    first_number = int(first["public_id"].rsplit("-", 1)[1])
    second_number = int(second["public_id"].rsplit("-", 1)[1])
    assert second_number == first_number + 1


def test_total_is_computed_on_server(client: TestClient) -> None:
    proposal = _create(client)
    response = client.patch(
        f"/api/admin/proposals/{proposal['public_id']}",
        json=_content(revision=1),
        headers=HEADERS,
    )
    assert response.status_code == 200, response.text
    body = response.json()
    assert body["total"] == 7000 + 2 * 8000
    assert body["revision"] == 2

    fetched = client.get(f"/api/admin/proposals/{proposal['public_id']}", headers=HEADERS)
    assert fetched.json()["total"] == 23000


def test_client_cannot_send_total_field(client: TestClient) -> None:
    proposal = _create(client)
    payload = _content(revision=1)
    payload["total"] = 1
    response = client.patch(
        f"/api/admin/proposals/{proposal['public_id']}", json=payload, headers=HEADERS
    )
    assert response.status_code == 422


def test_stale_revision_is_rejected(client: TestClient) -> None:
    proposal = _create(client)
    url = f"/api/admin/proposals/{proposal['public_id']}"

    assert client.patch(url, json=_content(revision=1), headers=HEADERS).status_code == 200

    stale = client.patch(url, json=_content(revision=1), headers=HEADERS)
    assert stale.status_code == 409
    assert "изменён" in stale.json()["detail"]

    fresh = client.patch(url, json=_content(revision=2), headers=HEADERS)
    assert fresh.status_code == 200
    assert fresh.json()["revision"] == 3


def test_price_snapshot_is_not_recalculated(client: TestClient) -> None:
    proposal = _create(client)
    payload = _content(revision=1)
    payload["content"]["scope"][0]["unit_price"] = 1234
    saved = client.patch(
        f"/api/admin/proposals/{proposal['public_id']}", json=payload, headers=HEADERS
    )
    assert saved.status_code == 200

    fetched = client.get(f"/api/admin/proposals/{proposal['public_id']}", headers=HEADERS)
    assert fetched.json()["content"]["scope"][0]["unit_price"] == 1234
    assert fetched.json()["total"] == 1234 + 2 * 8000


def test_sent_snapshot_survives_later_edits(client: TestClient) -> None:
    proposal = _create(client)
    url = f"/api/admin/proposals/{proposal['public_id']}"
    client.patch(url, json=_content(revision=1), headers=HEADERS)

    sent = client.post(f"{url}/send", headers=HEADERS)
    assert sent.status_code == 200
    body = sent.json()
    assert body["status"] == "sent"
    assert body["sent_at"]
    assert body["sent_snapshot"]["content"]["solution"] == "Автоматизируем приём и распределение"
    assert body["sent_snapshot"]["total"] == 23000

    edited = client.patch(
        url,
        json={"revision": 2, "content": {**_content(2)["content"], "solution": "Новая версия"}},
        headers=HEADERS,
    )
    assert edited.status_code == 200

    fetched = client.get(url, headers=HEADERS).json()
    assert fetched["content"]["solution"] == "Новая версия"
    assert fetched["sent_snapshot"]["content"]["solution"] == "Автоматизируем приём и распределение"


def test_status_sent_requires_send_endpoint(client: TestClient) -> None:
    proposal = _create(client)
    response = client.patch(
        f"/api/admin/proposals/{proposal['public_id']}",
        json={"revision": 1, "status": "sent"},
        headers=HEADERS,
    )
    assert response.status_code == 422


def test_statuses_accepted_and_rejected(client: TestClient) -> None:
    proposal = _create(client)
    url = f"/api/admin/proposals/{proposal['public_id']}"

    accepted = client.patch(url, json={"revision": 1, "status": "accepted"}, headers=HEADERS)
    assert accepted.status_code == 200
    assert accepted.json()["status"] == "accepted"

    rejected = client.patch(url, json={"revision": 2, "status": "rejected"}, headers=HEADERS)
    assert rejected.status_code == 200
    assert rejected.json()["status"] == "rejected"

    invalid = client.patch(url, json={"revision": 3, "status": "unknown"}, headers=HEADERS)
    assert invalid.status_code == 422


def test_duplicate_gets_new_number_and_cleared_client(client: TestClient) -> None:
    source = _create(
        client,
        client_company="ООО Клиент",
        client_name="Иван",
        client_contact="@ivan",
        client_email="ivan@example.com",
    )
    client.patch(
        f"/api/admin/proposals/{source['public_id']}",
        json=_content(revision=1),
        headers=HEADERS,
    )

    response = client.post(
        f"/api/admin/proposals/{source['public_id']}/duplicate", headers=HEADERS
    )
    assert response.status_code == 200, response.text
    copy = response.json()

    assert copy["public_id"] != source["public_id"]
    assert int(copy["public_id"].rsplit("-", 1)[1]) > int(source["public_id"].rsplit("-", 1)[1])
    assert copy["status"] == "draft"
    assert copy["client_company"] == ""
    assert copy["client_name"] == ""
    assert copy["client_contact"] == ""
    assert copy["total"] == 23000
    assert copy["content"]["scope"][0]["unit_price"] == 7000


def test_create_from_lead_and_idempotent_repeat(
    client: TestClient, telegram_calls: list[str]
) -> None:
    lead_response = client.post(
        "/api/leads",
        json=valid_lead(
            contact="@kp_lead",
            description="Нужен AI-агент для ответов клиентам по нашей базе знаний.",
        ),
    )
    assert lead_response.status_code == 201, lead_response.text
    lead = lead_response.json()

    created = client.post(f"/api/admin/proposals/from-lead/{lead['public_id']}", headers=HEADERS)
    assert created.status_code == 201, created.text
    proposal = created.json()
    assert proposal["lead_public_id"] == lead["public_id"]
    assert proposal["client_name"] == "Иван"
    assert proposal["client_email"] == "ivan@example.com"
    assert "AI-агент" in proposal["content"]["problem"] or proposal["content"]["scope"]
    assert proposal["total"] > 0

    repeated = client.post(f"/api/admin/proposals/from-lead/{lead['public_id']}", headers=HEADERS)
    assert repeated.status_code == 200
    assert repeated.json()["public_id"] == proposal["public_id"]

    missing = client.post("/api/admin/proposals/from-lead/ADA-000000", headers=HEADERS)
    assert missing.status_code == 404


def test_list_filter_and_delete(client: TestClient) -> None:
    proposal = _create(client)
    listing = client.get("/api/admin/proposals?status=draft", headers=HEADERS)
    assert listing.status_code == 200
    assert listing.json()["total"] >= 1

    bad_filter = client.get("/api/admin/proposals?status=unknown", headers=HEADERS)
    assert bad_filter.status_code == 422

    deleted = client.delete(
        f"/api/admin/proposals/{proposal['public_id']}", headers=HEADERS
    )
    assert deleted.status_code == 204
    assert (
        client.get(f"/api/admin/proposals/{proposal['public_id']}", headers=HEADERS).status_code
        == 404
    )


def test_foreign_origin_is_rejected(client: TestClient) -> None:
    response = client.post(
        "/api/admin/proposals",
        json={"client_company": "X"},
        headers={**HEADERS, "Origin": "https://evil.example"},
    )
    assert response.status_code == 403
