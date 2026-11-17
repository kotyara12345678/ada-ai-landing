from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.deps import client_ip, lead_limiter
from app.db.session import get_session
from app.schemas.lead import LeadCreate, LeadResponse
from app.services.leads import DuplicateLeadError, create_lead

router = APIRouter(prefix="/leads", tags=["leads"])


@router.post(
    "",
    response_model=LeadResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Создать заявку",
)
async def create_lead_endpoint(
    payload: LeadCreate,
    request: Request,
    session: AsyncSession = Depends(get_session),
) -> LeadResponse:
    ip = client_ip(request)
    allowed, retry_after = await lead_limiter.check(f"leads:{ip}")
    if not allowed:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Слишком много заявок. Попробуйте позже.",
            headers={"Retry-After": str(retry_after)},
        )

    try:
        lead = await create_lead(
            session,
            payload,
            ip=ip,
            user_agent=request.headers.get("user-agent"),
        )
    except DuplicateLeadError:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Похожая заявка уже отправлена. Мы свяжемся с вами.",
        ) from None

    return LeadResponse.model_validate(lead)
