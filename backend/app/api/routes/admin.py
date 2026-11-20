"""API админ-панели: вход по почте и паролю и работа с заявками.

Сессия — подписанная HttpOnly-cookie (см. app.services.admin_auth). Серверные
интеграции по-прежнему могут ходить с заголовком Authorization: Bearer ADMIN_TOKEN.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import admin_login_limiter, client_ip, require_admin
from app.core.config import settings
from app.db.session import get_session
from app.models.lead import LEAD_STATUSES, Lead
from app.schemas.admin import AdminLogin, AdminSession
from app.schemas.lead import LeadAdminItem, LeadListResponse, LeadStatusUpdate
from app.services import admin_auth

# Вход и выход доступны без сессии, остальные маршруты — только администратору.
public_router = APIRouter(prefix="/admin", tags=["admin"])
router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_admin)])


@public_router.post("/login", response_model=AdminSession, summary="Вход в админ-панель")
async def login(payload: AdminLogin, request: Request, response: Response) -> AdminSession:
    if not admin_auth.configured():
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail="Вход в админ-панель не настроен (ADMIN_EMAIL/ADMIN_PASSWORD)",
        )

    allowed, retry_after = await admin_login_limiter.check(f"admin-login:{client_ip(request)}")
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Слишком много попыток входа. Попробуйте через несколько минут.",
            headers={"Retry-After": str(retry_after)},
        )

    if not admin_auth.verify_credentials(payload.email, payload.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Неверная почта или пароль"
        )

    ttl = settings.admin_session_ttl_hours * 3600
    response.set_cookie(
        admin_auth.COOKIE_NAME,
        admin_auth.create_session(str(payload.email)),
        max_age=ttl,
        httponly=True,
        secure=settings.is_production,
        samesite="lax",
        path="/",
    )
    return AdminSession(email=str(payload.email), expires_in=ttl)


@public_router.post("/logout", status_code=204, summary="Выход из админ-панели")
async def logout(response: Response) -> None:
    # Заголовки удаления cookie пишем в тот же ответ, иначе браузер её сохранит.
    response.delete_cookie(admin_auth.COOKIE_NAME, path="/")
    response.status_code = status.HTTP_204_NO_CONTENT


@router.get("/me", response_model=AdminSession, summary="Текущая сессия")
async def current_admin(email: str = Depends(require_admin)) -> AdminSession:
    return AdminSession(email=email, expires_in=settings.admin_session_ttl_hours * 3600)


@router.get("/leads", response_model=LeadListResponse, summary="Список заявок")
async def list_leads(
    session: AsyncSession = Depends(get_session),
    status_filter: str | None = Query(default=None, alias="status"),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
) -> LeadListResponse:
    if status_filter and status_filter not in LEAD_STATUSES:
        raise HTTPException(status_code=422, detail="Неизвестный статус")

    base = select(Lead)
    count_query = select(func.count()).select_from(Lead)
    if status_filter:
        base = base.where(Lead.status == status_filter)
        count_query = count_query.where(Lead.status == status_filter)

    total = int(await session.scalar(count_query) or 0)
    result = await session.scalars(
        base.order_by(Lead.created_at.desc()).limit(limit).offset(offset)
    )
    items = [LeadAdminItem.model_validate(lead) for lead in result.all()]
    return LeadListResponse(items=items, total=total, limit=limit, offset=offset)


@router.patch(
    "/leads/{public_id}",
    response_model=LeadAdminItem,
    summary="Изменить статус заявки",
)
async def update_lead_status(
    public_id: str,
    payload: LeadStatusUpdate,
    session: AsyncSession = Depends(get_session),
) -> LeadAdminItem:
    lead = await session.scalar(select(Lead).where(Lead.public_id == public_id))
    if lead is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Заявка не найдена")

    lead.status = payload.status
    await session.commit()
    await session.refresh(lead)
    return LeadAdminItem.model_validate(lead)


@router.get("/stats", summary="Сводка по заявкам")
async def lead_stats(session: AsyncSession = Depends(get_session)) -> dict[str, int]:
    rows = await session.execute(select(Lead.status, func.count()).group_by(Lead.status))
    stats = {row[0]: int(row[1]) for row in rows.all()}
    stats["total"] = sum(stats.values())
    return stats
