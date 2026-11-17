"""Отправка уведомлений о заявках в Telegram."""

from __future__ import annotations

import html

import httpx

from app.core.config import settings
from app.core.logging import get_logger
from app.models.lead import Lead

logger = get_logger(__name__)

DIRECTION_LABELS = {
    "web-development": "Web-разработка",
    "backend": "Backend / API",
    "ai-development": "AI-разработка",
    "automation": "Автоматизация",
    "chatbots": "Чат-боты",
    "voice-ai": "Голосовой AI",
    "other": "Другое",
}


def format_lead_message(lead: Lead) -> str:
    lines = [
        "<b>Новая заявка</b>",
        f"<b>{html.escape(lead.public_id)}</b>",
        "",
        f"Имя: {html.escape(lead.name)}",
        f"Контакт: {html.escape(lead.contact)}",
    ]
    if lead.email:
        lines.append(f"Email: {html.escape(lead.email)}")
    lines += [
        f"Направление: {html.escape(DIRECTION_LABELS.get(lead.direction, lead.direction))}",
        "",
        f"Задача: {html.escape(lead.description)}",
    ]
    if lead.budget:
        lines.append(f"Бюджет: {html.escape(lead.budget)}")
    if lead.deadline:
        lines.append(f"Сроки: {html.escape(lead.deadline)}")
    if lead.page:
        lines.append(f"Страница: {html.escape(lead.page)}")
    lines.append(f"Источник: {html.escape(lead.source)}")
    lines.append(f"Создана: {lead.created_at:%d.%m.%Y %H:%M} UTC")
    return "\n".join(lines)


async def send_lead_notification(lead: Lead) -> tuple[bool, str | None]:
    """Возвращает (отправлено, текст_ошибки)."""
    if not settings.telegram_configured:
        logger.info("telegram_skipped", extra={"event": "telegram", "lead_id": lead.public_id})
        return False, "telegram_not_configured"

    url = f"https://api.telegram.org/bot{settings.telegram_bot_token}/sendMessage"
    payload = {
        "chat_id": settings.telegram_chat_id,
        "text": format_lead_message(lead),
        "parse_mode": "HTML",
        "disable_web_page_preview": True,
    }

    try:
        async with httpx.AsyncClient(timeout=settings.telegram_timeout_seconds) as client:
            response = await client.post(url, json=payload)
    except httpx.HTTPError as exc:  # сеть, таймауты
        logger.warning("telegram_unreachable", extra={"event": "telegram", "lead_id": lead.public_id})
        return False, f"network: {exc.__class__.__name__}"

    if response.status_code >= 400:
        logger.warning(
            "telegram_rejected",
            extra={"event": "telegram", "lead_id": lead.public_id, "status": response.status_code},
        )
        return False, f"http_{response.status_code}"

    logger.info("telegram_sent", extra={"event": "telegram", "lead_id": lead.public_id})
    return True, None
