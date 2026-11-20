from __future__ import annotations

import secrets

from fastapi import Cookie, Header, HTTPException, Request, status

from app.core.config import settings
from app.services import admin_auth
from app.services.ratelimit import SlidingWindowLimiter

lead_limiter = SlidingWindowLimiter(settings.rate_limit_leads, settings.rate_limit_window_seconds)
chat_limiter = SlidingWindowLimiter(settings.rate_limit_chat, settings.rate_limit_window_seconds)
admin_login_limiter = SlidingWindowLimiter(5, 300)


def client_ip(request: Request) -> str:
    if settings.trust_proxy_headers:
        forwarded = request.headers.get("x-forwarded-for")
        if forwarded:
            return forwarded.split(",")[0].strip()
        real = request.headers.get("x-real-ip")
        if real:
            return real.strip()
    return request.client.host if request.client else "unknown"


async def require_admin(
    request: Request,
    authorization: str | None = Header(default=None),
    session: str | None = Cookie(default=None, alias=admin_auth.COOKIE_NAME),
) -> str:
    """Доступ в админку: cookie-сессия панели или серверный bearer-токен."""
    if authorization and authorization.startswith("Bearer "):
        token = authorization.removeprefix("Bearer ").strip()
        if settings.admin_token and secrets.compare_digest(token, settings.admin_token):
            return "token"

    email = admin_auth.verify_session(session or request.cookies.get(admin_auth.COOKIE_NAME))
    if email:
        return email

    if not settings.admin_token and not admin_auth.configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Админ-доступ не настроен (ADMIN_EMAIL/ADMIN_PASSWORD)",
        )

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Требуется авторизация")
