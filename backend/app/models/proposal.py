"""Коммерческие предложения (КП).

Содержимое КП хранится в JSONB-поле `content` (редактируемые разделы, позиции
состава работ с зафиксированной ценой на момент добавления), а поля для списка
и фильтров вынесены в колонки. Отправленная клиенту версия сохраняется отдельно
в `sent_snapshot` и не меняется при дальнейшем редактировании.
"""

from __future__ import annotations

import uuid
from datetime import datetime

from sqlalchemy import JSON, DateTime, Index, Integer, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import JSONB, UUID as PGUUID
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.types import Uuid

from app.db.base import Base, TimestampMixin

PROPOSAL_STATUSES = ("draft", "sent", "accepted", "rejected")

# JSON на SQLite (тесты и локальная разработка), JSONB на PostgreSQL.
JSONType = JSON().with_variant(JSONB, "postgresql")


class ProposalCounter(Base):
    """Счётчик номеров КП по годам.

    Номер выдаётся атомарным upsert-запросом (см. app.services.proposals),
    поэтому параллельные создания не могут получить один и тот же номер.
    """

    __tablename__ = "proposal_counters"

    year: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=False)
    last_number: Mapped[int] = mapped_column(Integer, nullable=False, default=0)


class Proposal(Base, TimestampMixin):
    __tablename__ = "proposals"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid(as_uuid=True).with_variant(PGUUID(as_uuid=True), "postgresql"),
        primary_key=True,
        default=uuid.uuid4,
    )

    # Человекочитаемый номер: КП-2026-001. year/number нужны для уникальности.
    public_id: Mapped[str] = mapped_column(String(24), unique=True, index=True, nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    number: Mapped[int] = mapped_column(Integer, nullable=False)

    title: Mapped[str] = mapped_column(String(200), default="Коммерческое предложение", nullable=False)
    client_company: Mapped[str] = mapped_column(String(200), default="", nullable=False)
    client_name: Mapped[str] = mapped_column(String(160), default="", nullable=False)
    client_contact: Mapped[str] = mapped_column(String(200), default="", nullable=False)
    client_email: Mapped[str] = mapped_column(String(200), default="", nullable=False)

    # Заявка, из которой создано КП (для быстрого перехода в админке).
    lead_public_id: Mapped[str | None] = mapped_column(String(24), nullable=True, index=True)

    status: Mapped[str] = mapped_column(String(20), default="draft", nullable=False, index=True)
    total: Mapped[int] = mapped_column(Integer, default=0, nullable=False)

    # Оптимистическая блокировка автосохранения: клиент присылает известную
    # ревизию, сервер увеличивает её и отклоняет устаревшие записи (409).
    revision: Mapped[int] = mapped_column(Integer, default=1, nullable=False)

    content: Mapped[dict] = mapped_column(JSONType, default=dict, nullable=False)

    # Неизменяемая копия документа в момент отправки клиенту.
    sent_snapshot: Mapped[dict | None] = mapped_column(JSONType, nullable=True)
    sent_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    __table_args__ = (
        UniqueConstraint("year", "number", name="uq_proposals_year_number"),
        Index("ix_proposals_status_created", "status", "created_at"),
    )

    def __repr__(self) -> str:  # pragma: no cover - отладочное
        return f"<Proposal {self.public_id} status={self.status}>"
