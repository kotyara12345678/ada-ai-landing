"""Минимальное API для будущей админ-панели.

Доступ защищён статическим bearer-токеном (ADMIN_TOKEN). Это осознанно простая
схема первого этапа: панель не входит в публичный интерфейс, а структура
позволяет позже заменить токен на полноценную аутентификацию.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import require_admin
from app.db.session import get_session
from app.models.lead import LEAD_STATUSES, Lead
from app.schemas.lead import LeadAdminItem, LeadListResponse, LeadStatusUpdate

router = APIRouter(prefix="/admin", tags=["admin"], dependencies=[Depends(require_admin)])


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
