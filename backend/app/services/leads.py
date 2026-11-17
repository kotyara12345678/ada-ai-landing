"""Создание и обработка заявок."""

from __future__ import annotations

import secrets
from datetime import UTC, datetime, timedelta

from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.logging import get_logger
from app.models.lead import Lead
from app.schemas.lead import LeadCreate
from app.services import telegram
from app.services.spam import fingerprint, hash_ip, is_spam

logger = get_logger(__name__)

ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"


class DuplicateLeadError(Exception):
    """Такая заявка уже отправлялась недавно."""


def generate_public_id() -> str:
    suffix = "".join(secrets.choice(ALPHABET) for _ in range(6))
    return f"ADA-{suffix}"


async def _unique_public_id(session: AsyncSession) -> str:
    for _ in range(6):
        candidate = generate_public_id()
        exists = await session.scalar(select(Lead.id).where(Lead.public_id == candidate))
        if not exists:
            return candidate
    raise RuntimeError("Не удалось сгенерировать уникальный номер заявки")


async def find_recent_duplicate(session: AsyncSession, fp: str) -> Lead | None:
    threshold = datetime.now(UTC) - timedelta(seconds=settings.duplicate_window_seconds)
    return await session.scalar(
        select(Lead)
        .where(Lead.fingerprint == fp, Lead.created_at >= threshold)
        .order_by(Lead.created_at.desc())
        .limit(1)
    )


async def create_lead(
    session: AsyncSession,
    payload: LeadCreate,
    *,
    ip: str | None = None,
    user_agent: str | None = None,
    notify: bool = True,
) -> Lead:
    """Сохраняет заявку, проверяет дубли и отправляет уведомление."""
    fp = fingerprint(payload)
    duplicate = await find_recent_duplicate(session, fp)
    if duplicate is not None and duplicate.status != "spam":
        raise DuplicateLeadError

    spam, spam_reason = is_spam(payload)

    lead = Lead(
        public_id=await _unique_public_id(session),
        name=payload.name,
        contact=payload.contact,
        email=str(payload.email) if payload.email else None,
        direction=payload.direction,
        description=payload.description,
        budget=payload.budget,
        deadline=payload.deadline,
        source=payload.source,
        page=payload.page,
        status="spam" if spam else "new",
        ip_hash=hash_ip(ip),
        user_agent=(user_agent or "")[:300] or None,
        fingerprint=fp,
    )

    session.add(lead)
    try:
        await session.commit()
    except IntegrityError:
        await session.rollback()
        raise DuplicateLeadError from None

    if spam:
        logger.info(
            "lead_marked_spam",
            extra={"event": "lead", "lead_id": lead.public_id, "status": spam_reason},
        )
        return lead

    if notify:
        sent, error = await telegram.send_lead_notification(lead)
        lead.telegram_sent = sent
        lead.telegram_error = error
        await session.commit()

    logger.info("lead_created", extra={"event": "lead", "lead_id": lead.public_id})
    return lead
