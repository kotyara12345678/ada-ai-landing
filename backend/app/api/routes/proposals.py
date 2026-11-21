"""API коммерческих предложений.

Все маршруты требуют администратора: cookie-сессия панели или Bearer ADMIN_TOKEN.
Для методов записи дополнительно проверяется Origin — чужая страница не сможет
отправить запрос от имени открытой админки.
"""

from __future__ import annotations

from datetime import UTC, datetime
from urllib.parse import urlsplit

from fastapi import APIRouter, Depends, HTTPException, Query, Request, Response, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import require_admin
from app.db.session import get_session
from app.models.lead import Lead
from app.models.proposal import PROPOSAL_STATUSES, Proposal
from app.schemas.proposal import (
    ProposalCreate,
    ProposalDetail,
    ProposalItem,
    ProposalListResponse,
    ProposalUpdate,
)
from app.services import proposals as service

SAFE_METHODS = {"GET", "HEAD", "OPTIONS"}


def require_same_origin(request: Request) -> None:
    if request.method in SAFE_METHODS:
        return
    origin = request.headers.get("origin")
    if not origin:
        # Не браузерный запрос (скрипт, серверная интеграция) — сессию он не подделает.
        return
    if urlsplit(origin).netloc != request.headers.get("host", ""):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Запрос с чужого источника отклонён",
        )


router = APIRouter(
    prefix="/admin/proposals",
    tags=["proposals"],
    dependencies=[Depends(require_admin), Depends(require_same_origin)],
)


async def _get_proposal(session: AsyncSession, public_id: str) -> Proposal:
    proposal = await session.scalar(select(Proposal).where(Proposal.public_id == public_id))
    if proposal is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="КП не найдено")
    return proposal


@router.get("", response_model=ProposalListResponse, summary="Список КП")
async def list_proposals(
    session: AsyncSession = Depends(get_session),
    status_filter: str | None = Query(default=None, alias="status"),
    limit: int = Query(default=50, ge=1, le=200),
    offset: int = Query(default=0, ge=0),
) -> ProposalListResponse:
    if status_filter and status_filter not in PROPOSAL_STATUSES:
        raise HTTPException(status_code=422, detail="Неизвестный статус КП")

    base = select(Proposal)
    count_query = select(func.count()).select_from(Proposal)
    if status_filter:
        base = base.where(Proposal.status == status_filter)
        count_query = count_query.where(Proposal.status == status_filter)

    total = int(await session.scalar(count_query) or 0)
    rows = await session.scalars(
        base.order_by(Proposal.created_at.desc()).limit(limit).offset(offset)
    )
    return ProposalListResponse(
        items=[ProposalItem.model_validate(item) for item in rows.all()],
        total=total,
        limit=limit,
        offset=offset,
    )


@router.post(
    "", response_model=ProposalDetail, status_code=status.HTTP_201_CREATED, summary="Создать КП"
)
async def create_proposal(
    payload: ProposalCreate,
    session: AsyncSession = Depends(get_session),
) -> ProposalDetail:
    if payload.lead_public_id:
        lead = await session.scalar(
            select(Lead).where(Lead.public_id == payload.lead_public_id)
        )
        if lead is None:
            raise HTTPException(status_code=404, detail="Заявка не найдена")

    proposal = await service.create_proposal(
        session,
        title=payload.title,
        client_company=payload.client_company,
        client_name=payload.client_name,
        client_contact=payload.client_contact,
        client_email=payload.client_email,
        lead_public_id=payload.lead_public_id,
    )
    return ProposalDetail.model_validate(proposal)


@router.post(
    "/from-lead/{lead_public_id}",
    response_model=ProposalDetail,
    status_code=status.HTTP_201_CREATED,
    summary="Создать КП из заявки",
)
async def create_proposal_from_lead(
    lead_public_id: str,
    response: Response,
    session: AsyncSession = Depends(get_session),
) -> ProposalDetail:
    lead = await session.scalar(select(Lead).where(Lead.public_id == lead_public_id))
    if lead is None:
        raise HTTPException(status_code=404, detail="Заявка не найдена")

    # Повторный клик не должен плодить дубли: открываем уже созданное КП.
    existing = await session.scalar(
        select(Proposal)
        .where(Proposal.lead_public_id == lead_public_id)
        .order_by(Proposal.created_at.desc())
        .limit(1)
    )
    if existing is not None:
        response.status_code = status.HTTP_200_OK
        return ProposalDetail.model_validate(existing)

    proposal = await service.create_proposal(
        session,
        title=f"Коммерческое предложение для {lead.name}",
        client_company="",
        client_name=lead.name,
        client_contact=lead.contact,
        client_email=lead.email or "",
        lead_public_id=lead.public_id,
        content=service.content_from_lead(lead),
    )
    return ProposalDetail.model_validate(proposal)


@router.get("/{public_id}", response_model=ProposalDetail, summary="КП по номеру")
async def get_proposal(
    public_id: str, session: AsyncSession = Depends(get_session)
) -> ProposalDetail:
    proposal = await _get_proposal(session, public_id)
    return ProposalDetail.model_validate(proposal)


@router.patch("/{public_id}", response_model=ProposalDetail, summary="Сохранить КП")
async def update_proposal(
    public_id: str,
    payload: ProposalUpdate,
    session: AsyncSession = Depends(get_session),
) -> ProposalDetail:
    proposal = await _get_proposal(session, public_id)

    if payload.revision != proposal.revision:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=(
                "Документ уже изменён в другой вкладке или сессии. "
                "Обновите страницу, чтобы не потерять чужие правки."
            ),
        )

    service.apply_update(proposal, payload)
    await session.commit()
    await session.refresh(proposal)
    return ProposalDetail.model_validate(proposal)


@router.post("/{public_id}/duplicate", response_model=ProposalDetail, summary="Дублировать КП")
async def duplicate_proposal(
    public_id: str, session: AsyncSession = Depends(get_session)
) -> ProposalDetail:
    source = await _get_proposal(session, public_id)
    year = datetime.now(UTC).year
    number = await service.allocate_number(session, year)

    copy = service.duplicate_proposal(source, number=number, year=year)
    session.add(copy)
    await session.commit()
    await session.refresh(copy)
    return ProposalDetail.model_validate(copy)


@router.post("/{public_id}/send", response_model=ProposalDetail, summary="Зафиксировать отправку")
async def mark_sent(
    public_id: str, session: AsyncSession = Depends(get_session)
) -> ProposalDetail:
    proposal = await _get_proposal(session, public_id)

    proposal.sent_snapshot = service.build_sent_snapshot(proposal)
    proposal.sent_at = datetime.now(UTC)
    proposal.status = "sent"
    await session.commit()
    await session.refresh(proposal)
    return ProposalDetail.model_validate(proposal)


@router.delete("/{public_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Удалить КП")
async def delete_proposal(
    public_id: str, session: AsyncSession = Depends(get_session)
) -> Response:
    proposal = await _get_proposal(session, public_id)
    await session.delete(proposal)
    await session.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
