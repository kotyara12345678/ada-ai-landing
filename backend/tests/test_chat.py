from __future__ import annotations

import json

from fastapi.testclient import TestClient

from app.services.marker import LeadMarkerParser
from app.services.ratelimit import SlidingWindowLimiter
from app.services.spam import is_spam
from app.schemas.lead import LeadCreate


def collect_deltas(raw: str) -> str:
    """Собирает текст так, как это делает браузер: склеивает delta-события."""
    chunks: list[str] = []
    for block in raw.split("\n\n"):
        if "event: delta" not in block:
            continue
        for line in block.splitlines():
            if line.startswith("data:"):
                chunks.append(json.loads(line[5:].strip())["content"])
    return "".join(chunks)


class FakeProvider:
    name = "fake"
    model = "fake-model"

    def __init__(self, chunks: list[str]) -> None:
        self.chunks = chunks

    async def stream(self, messages, page):  # noqa: ANN001, ANN201
        for chunk in self.chunks:
            yield chunk


def test_chat_status_disabled(client: TestClient) -> None:
    response = client.get("/api/chat/status")
    assert response.status_code == 200
    assert response.json()["enabled"] is False


def test_chat_stream_returns_503_when_not_configured(client: TestClient) -> None:
    response = client.post(
        "/api/chat/stream", json={"messages": [{"role": "user", "content": "Привет"}]}
    )
    assert response.status_code == 503


def test_chat_stream_deltas_and_done(client: TestClient, monkeypatch) -> None:
    provider = FakeProvider(["Здравствуйте! ", "Telegram-бот ", "начинается от 5 000 ₽."])
    monkeypatch.setattr("app.api.routes.chat.get_provider", lambda: provider)

    response = client.post(
        "/api/chat/stream",
        json={"messages": [{"role": "user", "content": "Сколько стоит бот?"}], "page": "/chatbots"},
    )
    assert response.status_code == 200
    assert "text/event-stream" in response.headers["content-type"]

    text = response.text
    assert "event: delta" in text
    assert "Telegram-бот начинается от 5 000 ₽." in collect_deltas(text)
    assert "event: done" in text
    assert "<<<LEAD" not in text


def test_chat_stream_creates_lead_from_marker(
    client: TestClient, monkeypatch, telegram_calls: list[str]
) -> None:
    marker = (
        '<<<LEAD {"name": "Анна", "contact": "@anna_dev", "email": "anna@example.com", '
        '"direction": "chatbots", "description": "Нужен Telegram-бот для приема заказов кофейни", '
        '"budget": "до 15 000 ₽", "deadline": "2 недели"} >>>'
    )
    provider = FakeProvider(["Передаю заявку команде. ", marker])
    monkeypatch.setattr("app.api.routes.chat.get_provider", lambda: provider)

    response = client.post(
        "/api/chat/stream",
        json={"messages": [{"role": "user", "content": "Да, передайте заявку"}], "page": "/chatbots"},
    )
    assert response.status_code == 200

    text = response.text
    assert "event: lead" in text
    assert "<<<LEAD" not in text
    assert collect_deltas(text) == "Передаю заявку команде. "
    assert len(telegram_calls) == 1


def test_chat_stream_invalid_marker_reports_error(client: TestClient, monkeypatch) -> None:
    provider = FakeProvider(['<<<LEAD {"name": "X"} >>>'])
    monkeypatch.setattr("app.api.routes.chat.get_provider", lambda: provider)

    response = client.post(
        "/api/chat/stream", json={"messages": [{"role": "user", "content": "Заявка"}]}
    )
    assert response.status_code == 200
    assert "event: error" in response.text


def test_marker_parser_across_chunks() -> None:
    parser = LeadMarkerParser()
    visible = ""
    payloads: list[str] = []
    for chunk in ['Ответ клиенту. <<<LE', 'AD {"name": "А', 'нна"} >>', ">"]:
        text, found = parser.feed(chunk)
        visible += text
        payloads.extend(found)
    visible += parser.flush()

    assert payloads == [' {"name": "Анна"} ']
    assert visible == "Ответ клиенту. "


def test_limiter_blocks_after_limit() -> None:
    import asyncio

    limiter = SlidingWindowLimiter(limit=2, window_seconds=60)

    async def scenario() -> None:
        first, _ = await limiter.check("ip")
        second, _ = await limiter.check("ip")
        third, retry = await limiter.check("ip")
        assert (first, second) == (True, True)
        assert third is False
        assert retry >= 1

    asyncio.run(scenario())


def test_spam_detector_flags_links() -> None:
    payload = LeadCreate(
        name="Тест",
        contact="@testuser",
        email="test@example.com",
        description="http://a.ru http://b.ru http://c.ru http://d.ru покупайте",
        consent=True,
        started_at=1,
    )
    spam, reason = is_spam(payload)
    assert spam is True
    assert reason in {"too_many_links", "spam_keywords"}
