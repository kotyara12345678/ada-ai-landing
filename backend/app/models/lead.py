import uuid
from datetime import datetime

from sqlalchemy import Boolean, DateTime, Index, String, Text
from sqlalchemy.dialects.postgresql import UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import Uuid

from app.db.base import Base, TimestampMixin, utcnow

LEAD_STATUSES = ("new", "in_progress", "contacted", "won", "lost", "spam")


class Lead(Base, TimestampMixin):
    __tablename__ = "leads"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True).with_variant(PGUUID(as_uuid=True), "postgresql"),
        primary_key=True,
        default=uuid.uuid4,
    )
    public_id: Mapped[str] = mapped_column(String(20), unique=True, index=True, nullable=False)

    name: Mapped[str] = mapped_column(String(120), nullable=False)
    contact: Mapped[str] = mapped_column(String(160), nullable=False)
    email: Mapped[str | None] = mapped_column(String(200), nullable=True)

    direction: Mapped[str] = mapped_column(String(60), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    budget: Mapped[str | None] = mapped_column(String(80), nullable=True)
    deadline: Mapped[str | None] = mapped_column(String(80), nullable=True)

    source: Mapped[str] = mapped_column(String(40), default="website_form", nullable=False)
    page: Mapped[str | None] = mapped_column(String(200), nullable=True)

    status: Mapped[str] = mapped_column(String(20), default="new", nullable=False, index=True)
    telegram_sent: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    telegram_error: Mapped[str | None] = mapped_column(String(300), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=utcnow, nullable=False, index=True
    )

    # Хэш IP используется только для антиспама и аудита. Исходный адрес не хранится.
    ip_hash: Mapped[str | None] = mapped_column(String(64), nullable=True)
    user_agent: Mapped[str | None] = mapped_column(String(300), nullable=True)
    fingerprint: Mapped[str | None] = mapped_column(String(64), nullable=True, index=True)

    __table_args__ = (Index("ix_leads_contact_created", "contact", "created_at"),)

    def __repr__(self) -> str:  # pragma: no cover - отладочное
        return f"<Lead {self.public_id} status={self.status}>"
