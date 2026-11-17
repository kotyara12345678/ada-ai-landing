"""Адаптеры LLM-провайдеров со стримингом.

Провайдер выбирается через переменные окружения (LLM_PROVIDER, LLM_BASE_URL, LLM_MODEL),
поэтому фронтенд и бизнес-логика не зависят от конкретного вендора.
"""

from __future__ import annotations

import json
from collections.abc import AsyncIterator
from typing import Protocol

import httpx

from app.core.config import settings
from app.core.logging import get_logger
from app.services.prompt import build_system_prompt

logger = get_logger(__name__)


class LLMError(RuntimeError):
    """Ошибка провайдера, которую можно показать пользователю в общем виде."""


class LLMProvider(Protocol):
    name: str
    model: str

    def stream(self, messages: list[dict[str, str]], page: str | None) -> AsyncIterator[str]: ...


class OpenAICompatibleProvider:
    """OpenAI Chat Completions API и совместимые серверы (OpenRouter, DeepSeek, локальные)."""

    name = "openai"

    def __init__(self) -> None:
        self.model = settings.llm_model
        self.base_url = settings.llm_base_url
        self.api_key = settings.llm_api_key

    async def stream(self, messages: list[dict[str, str]], page: str | None) -> AsyncIterator[str]:
        payload = {
            "model": self.model,
            "stream": True,
            "temperature": settings.llm_temperature,
            "max_tokens": settings.llm_max_tokens,
            "messages": [
                {"role": "system", "content": build_system_prompt(page)},
                *messages[-settings.llm_max_history_messages :],
            ],
        }
        headers = {"Authorization": f"Bearer {self.api_key}", "Content-Type": "application/json"}
        timeout = httpx.Timeout(settings.llm_timeout_seconds, connect=10.0)

        async with httpx.AsyncClient(timeout=timeout) as client:
            async with client.stream(
                "POST", f"{self.base_url}/chat/completions", json=payload, headers=headers
            ) as response:
                if response.status_code >= 400:
                    body = (await response.aread()).decode(errors="ignore")[:300]
                    logger.warning("llm_error", extra={"status": response.status_code, "event": "llm"})
                    raise LLMError(f"Провайдер вернул {response.status_code}: {body}")

                async for line in response.aiter_lines():
                    if not line.startswith("data:"):
                        continue
                    data = line[5:].strip()
                    if not data or data == "[DONE]":
                        continue
                    try:
                        chunk = json.loads(data)
                    except json.JSONDecodeError:
                        continue
                    choices = chunk.get("choices") or []
                    if not choices:
                        continue
                    delta = choices[0].get("delta") or {}
                    content = delta.get("content")
                    if content:
                        yield content


class AnthropicProvider:
    """Anthropic Messages API со стримингом."""

    name = "anthropic"
    api_version = "2023-06-01"

    def __init__(self) -> None:
        self.model = settings.llm_model
        self.base_url = settings.llm_base_url if "anthropic" in settings.llm_base_url else "https://api.anthropic.com/v1"
        self.api_key = settings.llm_api_key

    async def stream(self, messages: list[dict[str, str]], page: str | None) -> AsyncIterator[str]:
        payload = {
            "model": self.model,
            "stream": True,
            "max_tokens": settings.llm_max_tokens,
            "temperature": settings.llm_temperature,
            "system": build_system_prompt(page),
            "messages": [
                {"role": message["role"], "content": message["content"]}
                for message in messages[-settings.llm_max_history_messages :]
            ],
        }
        headers = {
            "x-api-key": self.api_key,
            "anthropic-version": self.api_version,
            "Content-Type": "application/json",
        }
        timeout = httpx.Timeout(settings.llm_timeout_seconds, connect=10.0)

        async with httpx.AsyncClient(timeout=timeout) as client:
            async with client.stream(
                "POST", f"{self.base_url}/messages", json=payload, headers=headers
            ) as response:
                if response.status_code >= 400:
                    body = (await response.aread()).decode(errors="ignore")[:300]
                    logger.warning("llm_error", extra={"status": response.status_code, "event": "llm"})
                    raise LLMError(f"Провайдер вернул {response.status_code}: {body}")

                async for line in response.aiter_lines():
                    if not line.startswith("data:"):
                        continue
                    data = line[5:].strip()
                    if not data:
                        continue
                    try:
                        event = json.loads(data)
                    except json.JSONDecodeError:
                        continue
                    if event.get("type") == "content_block_delta":
                        text = (event.get("delta") or {}).get("text")
                        if text:
                            yield text


def get_provider() -> LLMProvider | None:
    """Возвращает провайдера или None, если LLM не настроена."""
    if not settings.llm_configured:
        return None
    if settings.llm_provider == "anthropic":
        return AnthropicProvider()
    return OpenAICompatibleProvider()
