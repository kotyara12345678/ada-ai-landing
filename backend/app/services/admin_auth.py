"""Простая аутентификация админ-панели: почта + пароль и подписанная cookie-сессия.

Пароль и почта берутся из окружения (ADMIN_EMAIL / ADMIN_PASSWORD), в коде и в
базе ничего не хранится. Сессия — HMAC-подписанный токен с временем истечения,
поэтому серверу не нужна таблица сессий, а данные не могут быть подделаны без
ADMIN_SESSION_SECRET (при его отсутствии используется ADMIN_TOKEN/пароль).
"""

from __future__ import annotations

import base64
import hashlib
import hmac
import secrets
import time

from app.core.config import settings

COOKIE_NAME = "ada_admin"


def _secret() -> bytes:
    raw = settings.admin_session_secret or settings.admin_token or settings.admin_password
    return f"ada-admin:{raw}".encode()


def _sign(value: str) -> str:
    return hmac.new(_secret(), value.encode(), hashlib.sha256).hexdigest()


def configured() -> bool:
    """Вход по паролю доступен, только если заданы почта и пароль администратора."""
    return bool(settings.admin_email.strip() and settings.admin_password)


def create_session(email: str) -> str:
    expires_at = int(time.time()) + settings.admin_session_ttl_hours * 3600
    payload = base64.urlsafe_b64encode(f"{email}|{expires_at}".encode()).decode().rstrip("=")
    return f"{payload}.{_sign(payload)}"


def verify_session(token: str | None) -> str | None:
    """Возвращает почту администратора, если cookie валидна и не истекла."""
    if not token or "." not in token:
        return None

    payload, signature = token.rsplit(".", 1)
    if not secrets.compare_digest(signature.encode(), _sign(payload).encode()):
        return None

    try:
        decoded = base64.urlsafe_b64decode(payload + "=" * (-len(payload) % 4)).decode()
        email, expires_at = decoded.rsplit("|", 1)
        if int(expires_at) < int(time.time()):
            return None
    except (ValueError, UnicodeDecodeError):
        return None

    if email.strip().lower() != settings.admin_email.strip().lower():
        return None
    return email


def verify_credentials(email: str, password: str) -> bool:
    if not configured():
        return False
    email_ok = secrets.compare_digest(
        email.strip().lower().encode(), settings.admin_email.strip().lower().encode()
    )
    password_ok = secrets.compare_digest(password.encode(), settings.admin_password.encode())
    return email_ok and password_ok
