from collections.abc import AsyncIterator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.config import settings
from app.db.base import Base

engine = create_async_engine(
    settings.database_url,
    echo=settings.database_echo,
    pool_pre_ping=True,
    # SQLite не поддерживает pool_size/max_overflow
    **({} if settings.database_url.startswith("sqlite") else {"pool_size": 5, "max_overflow": 5}),
)

SessionLocal = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)


async def get_session() -> AsyncIterator[AsyncSession]:
    async with SessionLocal() as session:
        yield session


async def create_all() -> None:
    """Используется только в тестах и при явном AUTO_CREATE_SCHEMA=true."""
    async with engine.begin() as connection:
        await connection.run_sync(Base.metadata.create_all)
