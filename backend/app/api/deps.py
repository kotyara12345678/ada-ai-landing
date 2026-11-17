from __future__ import annotations

import secrets

from fastapi import Header, HTTPException, Request, status

from app.core.config import settings
from app.services.ratelimit import SlidingWindowLimiter

lead_limiter = SlidingWindowLimiter(settings.rate_limit_leads, settings.rate_limit_window_seconds)
chat_limiter = SlidingWindowLimiter(settings.rate_limit_chat, settings.rate_limit_window_seconds)


def client_ip(request: Request) -> str:
    if settings.trust_proxy_headers:
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
        real = request.headers.get("x-real-ip")
        if real:
            return real.strip()
    return request.client.host if request.client else "unknown"


async def require_admin(authorization: str | None = Header(default=None)) -> None:
    if not settings.admin_token:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Админ-доступ не настроен (ADMIN_TOKEN)",
        )
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Требуется токен")

    token = authorization.removeprefix("Bearer ").strip()
    if not secrets.compare_digest(token, settings.admin_token):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверный токен")
