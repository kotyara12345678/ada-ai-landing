"""Проверки на спам и повторные отправки."""

from __future__ import annotations

import hashlib
import re
import time

from app.core.config import settings
from app.schemas.lead import LeadCreate

SPAM_PATTERNS = (
    re.compile(r"https?://\S+", re.IGNORECASE),
    re.compile(r"\b(viagra|casino|seo.?продвижение|купить.?базу)\b", re.IGNORECASE),
    re.compile(r"\[url=", re.IGNORECASE),
)


def hash_ip(ip: str | None) -> str | None:
    if not ip:
        return None
    return hashlib.sha256(f"ada-salt::{ip}".encode()).hexdigest()[:32]


def normalize(value: str) -> str:
    return re.sub(r"\s+", " ", value.strip().lower())


def fingerprint(payload: LeadCreate) -> str:
    raw = f"{normalize(payload.contact)}|{normalize(payload.description)[:200]}"
    return hashlib.sha256(raw.encode()).hexdigest()[:40]


def is_spam(payload: LeadCreate, now_ms: int | None = None) -> tuple[bool, str | None]:
    """Возвращает (спам, причина)."""
    if payload.company:
        return True, "honeypot"

    if payload.started_at:
        now_ms = now_ms or int(time.time() * 1000)
        elapsed = now_ms - payload.started_at
        # Форма, отправленная мгновенно, почти всегда бот
        if 0 <= elapsed < settings.min_form_fill_ms:
            return True, "too_fast"

    links = SPAM_PATTERNS[0].findall(payload.description)
    if len(links) > 2:
        return True, "too_many_links"

    if any(pattern.search(payload.description) for pattern in SPAM_PATTERNS[1:]):
        return True, "spam_keywords"

    if len(set(payload.description.lower())) <= 3:
        return True, "low_variety"

    return False, None
