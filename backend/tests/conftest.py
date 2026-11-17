"""Тесты API. Запуск: pytest -q (из каталога backend)."""

from __future__ import annotations

import os
import pathlib

os.environ["APP_ENV"] = "test"
os.environ["AUTO_CREATE_SCHEMA"] = "false"
os.environ["LLM_PROVIDER"] = "disabled"
os.environ["LLM_API_KEY"] = ""
os.environ["TELEGRAM_BOT_TOKEN"] = ""
os.environ["TELEGRAM_CHAT_ID"] = ""
os.environ["ADMIN_TOKEN"] = "test-admin-token"
os.environ["RATE_LIMIT_LEADS"] = "100"
os.environ["RATE_LIMIT_CHAT"] = "100"
os.environ["DATABASE_ECHO"] = "false"

TEST_DB_DIR = pathlib.Path(__file__).parent / ".pytest"
TEST_DB_DIR.mkdir(exist_ok=True)
os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///{(TEST_DB_DIR / 'test.db').as_posix()}"

import asyncio  # noqa: E402

import pytest  # noqa: E402
from fastapi.testclient import TestClient  # noqa: E402

from app.db.base import Base  # noqa: E402
from app.db.session import engine  # noqa: E402
from app.main import app  # noqa: E402


@pytest.fixture(scope="session", autouse=True)
def prepare_database():
    async def setup() -> None:
        async with engine.begin() as connection:
            await connection.run_sync(Base.metadata.drop_all)
            await connection.run_sync(Base.metadata.create_all)

    asyncio.run(setup())
    yield
    async def teardown() -> None:
        async with engine.begin() as connection:
            await connection.run_sync(Base.metadata.drop_all)
        await engine.dispose()

    asyncio.run(teardown())


@pytest.fixture()
def client() -> TestClient:
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(autouse=True)
def reset_rate_limits():
    from app.api.deps import chat_limiter, lead_limiter

    asyncio.run(lead_limiter.reset())
    asyncio.run(chat_limiter.reset())
    yield


@pytest.fixture()
def telegram_calls(monkeypatch):
    calls: list[str] = []

    async def fake_send(lead):
        calls.append(lead.public_id)
        return True, None

    monkeypatch.setattr("app.services.telegram.send_lead_notification", fake_send)
    return calls


def valid_lead(**overrides) -> dict:
    payload = {
        "name": "Иван",
        "contact": "@ivan_test",
        "email": "ivan@example.com",
        "direction": "ai-development",
        "description": "Нужен AI-агент для обработки входящих обращений в поддержку.",
        "budget": "50 000 – 150 000 ₽",
        "deadline": "В течение месяца",
        "consent": True,
        "started_at": 1,
    }
    payload.update(overrides)
    return payload
