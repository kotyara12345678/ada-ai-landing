from __future__ import annotations

import json
from collections.abc import AsyncIterator

from fastapi import APIRouter, HTTPException, Request, status
from fastapi.responses import StreamingResponse
from pydantic import ValidationError

from app.api.deps import chat_limiter, client_ip
from app.core.config import settings
from app.core.logging import get_logger
from app.db.session import SessionLocal
from app.schemas.chat import ChatRequest, ChatStatus
from app.schemas.lead import LeadCreate
from app.services import leads as leads_service
from app.services.llm import LLMError, get_provider
from app.services.marker import LeadMarkerParser

router = APIRouter(prefix="/chat", tags=["chat"])
logger = get_logger(__name__)


def sse(event: str, data: dict[str, object]) -> str:
    return f"event: {event}\ndata: {json.dumps(data, ensure_ascii=False)}\n\n"


@router.get("/status", response_model=ChatStatus, summary="Доступность AI-консультанта")
async def chat_status() -> ChatStatus:
    enabled = settings.llm_configured
    return ChatStatus(
        enabled=enabled,
        provider=settings.llm_provider,
        model=settings.llm_model if enabled else "—",
        message=None if enabled else "AI-консультант не настроен: не задан ключ LLM.",
    )


@router.post("/stream", summary="Потоковый ответ AI-консультанта")
async def chat_stream(payload: ChatRequest, request: Request) -> StreamingResponse:
    provider = get_provider()
    if provider is None:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="AI-консультант не настроен. Оставьте заявку через форму.",
        )

    ip = client_ip(request)
    allowed, retry_after = await chat_limiter.check(f"chat:{ip}")
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Слишком много сообщений. Подождите немного.",
            headers={"Retry-After": str(retry_after)},
        )

    messages = [{"role": message.role, "content": message.content} for message in payload.messages]

    async def event_stream() -> AsyncIterator[str]:
        parser = LeadMarkerParser()
        try:
            async for chunk in provider.stream(messages, payload.page):
                visible, marker_payloads = parser.feed(chunk)
                if visible:
                    yield sse("delta", {"type": "delta", "content": visible})
                for raw in marker_payloads:
                    yield await handle_marker(raw, payload.page, ip, request)
        except LLMError:
            logger.warning("chat_llm_error", extra={"event": "chat"})
            yield sse(
                "error",
                {
                    "type": "error",
                    "message": "Модель временно недоступна. Попробуйте ещё раз или оставьте заявку.",
                },
            )
        except Exception:  # noqa: BLE001 - поток не должен рвать соединение без события
            logger.exception("chat_stream_failed", extra={"event": "chat"})
            yield sse(
                "error",
                {"type": "error", "message": "Ошибка при генерации ответа. Попробуйте ещё раз."},
            )
        else:
            tail = parser.flush()
            if tail:
                yield sse("delta", {"type": "delta", "content": tail})
        yield sse("done", {"type": "done"})

    return StreamingResponse(
        event_stream(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-store",
            "X-Accel-Buffering": "no",
            "Connection": "keep-alive",
        },
    )


async def handle_marker(raw: str, page: str | None, ip: str, request: Request) -> str:
    """Создаёт заявку из служебного блока модели."""
    try:
        data = json.loads(raw.strip())
    except json.JSONDecodeError:
        logger.warning("lead_marker_invalid_json", extra={"event": "chat"})
        return sse(
            "error",
            {"type": "error", "message": "Не удалось передать заявку: некорректные данные."},
        )

    try:
        payload = LeadCreate(
            name=str(data.get("name", "")),
            contact=str(data.get("contact", "")),
            email=str(data.get("email") or "").strip(),
            direction=str(data.get("direction", "other")),
            description=str(data.get("description", "")),
            budget=data.get("budget") or None,
            deadline=data.get("deadline") or None,
            consent=True,
            source="ai_consultant",
            page=page,
        )
    except ValidationError:
        logger.warning("lead_marker_invalid", extra={"event": "chat"})
        return sse(
            "error",
            {
                "type": "error",
                "message": "Для заявки не хватает корректных данных. Уточните email, контакт и описание задачи.",
            },
        )

    async with SessionLocal() as session:
        try:
            lead = await leads_service.create_lead(
                session,
                payload,
                ip=ip,
                user_agent=request.headers.get("user-agent"),
            )
        except leads_service.DuplicateLeadError:
            return sse(
                "error",
                {"type": "error", "message": "Похожая заявка уже отправлена. Мы свяжемся с вами."},
            )

    return sse("lead", {"type": "lead", "public_id": lead.public_id, "status": lead.status})


@router.get("/rate-limit", include_in_schema=False)
async def rate_limit_info() -> dict[str, int]:
    return {"limit": settings.rate_limit_chat, "window_seconds": settings.rate_limit_window_seconds}
