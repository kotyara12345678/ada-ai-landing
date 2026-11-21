from fastapi.testclient import TestClient

from tests.conftest import valid_lead


def test_health(client: TestClient) -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_ready_checks_database(client: TestClient) -> None:
    response = client.get("/api/health/ready")
    assert response.status_code == 200
    assert response.json()["database"] == "up"


def test_create_lead_persists_and_notifies(client: TestClient, telegram_calls: list[str]) -> None:
    response = client.post("/api/leads", json=valid_lead())
    assert response.status_code == 201, response.text

    body = response.json()
    assert body["public_id"].startswith("ADA-")
    assert body["status"] == "new"
    assert len(telegram_calls) == 1
    assert telegram_calls[0] == body["public_id"]

    listing = client.get(
        "/api/admin/leads", headers={"Authorization": "Bearer test-admin-token"}
    )
    assert listing.status_code == 200
    assert listing.json()["total"] >= 1


def test_lead_requires_consent(client: TestClient) -> None:
    response = client.post("/api/leads", json=valid_lead(consent=False))
    assert response.status_code == 422
    assert "согласие" in response.json()["detail"].lower()


def test_lead_short_description_rejected(client: TestClient) -> None:
    response = client.post("/api/leads", json=valid_lead(description="сайт"))
    assert response.status_code == 422


def test_lead_invalid_email_rejected(client: TestClient) -> None:
    response = client.post("/api/leads", json=valid_lead(email="not-an-email"))
    assert response.status_code == 422


def test_lead_requires_email(client: TestClient) -> None:
    missing = valid_lead()
    missing.pop("email")
    assert client.post("/api/leads", json=missing).status_code == 422
    assert client.post("/api/leads", json=valid_lead(email="")).status_code == 422


def test_honeypot_marked_as_spam_without_notification(
    client: TestClient, telegram_calls: list[str]
) -> None:
    response = client.post(
        "/api/leads",
        json=valid_lead(
            name="Spam Bot",
            contact="@spam_bot",
            description="Купить базу клиентов для рассылки очень дешево сейчас",
            company="spam",
        ),
    )
    assert response.status_code == 201
    assert response.json()["status"] == "spam"
    assert telegram_calls == []


def test_instant_submit_marked_as_spam(client: TestClient) -> None:
    import time

    response = client.post(
        "/api/leads",
        json=valid_lead(contact="@fast_bot", started_at=int(time.time() * 1000)),
    )
    assert response.status_code == 201
    assert response.json()["status"] == "spam"


def test_duplicate_lead_conflict(client: TestClient) -> None:
    payload = valid_lead(contact="@duplicate_user", description="Нужен корпоративный сайт с каталогом услуг и формой.")
    first = client.post("/api/leads", json=payload)
    assert first.status_code == 201

    second = client.post("/api/leads", json=payload)
    assert second.status_code == 409


def test_admin_requires_token(client: TestClient) -> None:
    assert client.get("/api/admin/leads").status_code == 401
    assert (
        client.get("/api/admin/leads", headers={"Authorization": "Bearer wrong"}).status_code == 401
    )


def test_admin_status_update(client: TestClient) -> None:
    created = client.post("/api/leads", json=valid_lead(contact="@status_user")).json()
    response = client.patch(
        f"/api/admin/leads/{created['public_id']}",
        json={"status": "contacted"},
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "contacted"

    invalid = client.patch(
        f"/api/admin/leads/{created['public_id']}",
        json={"status": "unknown"},
        headers={"Authorization": "Bearer test-admin-token"},
    )
    assert invalid.status_code == 422
