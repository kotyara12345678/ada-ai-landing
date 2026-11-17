from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.db.session import get_session

router = APIRouter(tags=["system"])


@router.get("/health", summary="Проверка живости")
async def health() -> dict[str, str]:
    return {"status": "ok", "service": settings.app_name}


@router.get("/health/ready", summary="Проверка готовности (БД)")
async def ready(session: AsyncSession = Depends(get_session)) -> dict[str, str]:
    await session.execute(text("SELECT 1"))
    return {
        "status": "ok",
        "database": "up",
        "llm": "configured" if settings.llm_configured else "not_configured",
        "telegram": "configured" if settings.telegram_configured else "not_configured",
    }
