"""Схемы КП: содержимое документа, создание, сохранение и ответы API."""

from __future__ import annotations

import uuid
from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

ProposalStatus = Literal["draft", "sent", "accepted", "rejected"]
ProposalTemplateId = Literal["growth-automation"]

MAX_SCOPE_ITEMS = 50
MAX_STAGES = 20
MAX_DELIVERABLES = 20


class CatalogSnapshotItem(BaseModel):
    """Снимок позиции каталога на момент создания КП."""

    model_config = ConfigDict(extra="forbid")

    id: str = Field(min_length=1, max_length=64)
    title: str = Field(min_length=1, max_length=200)
    price: int = Field(ge=0, le=100_000_000)
    direction: str = Field(default="", max_length=60)


class ProposalScopeItem(BaseModel):
    """Позиция состава работ. unit_price — зафиксированная цена, не ссылка на каталог."""

    model_config = ConfigDict(extra="forbid")

    id: str = Field(min_length=1, max_length=64)
    catalog_id: str | None = Field(default=None, max_length=64)
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(default="", max_length=1000)
    quantity: int = Field(default=1, ge=1, le=1000)
    unit: str = Field(default="шт.", max_length=20)
    unit_price: int = Field(default=0, ge=0, le=100_000_000)

    @field_validator("title")
    @classmethod
    def strip_title(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Название позиции не может быть пустым")
        return cleaned


class ProposalStage(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str = Field(min_length=1, max_length=160)
    duration: str = Field(default="", max_length=80)
    description: str = Field(default="", max_length=1000)


class ProposalContent(BaseModel):
    """Редактируемое содержимое КП. Хранится в JSONB как есть."""

    model_config = ConfigDict(extra="forbid")

    template: ProposalTemplateId = "growth-automation"
    problem: str = Field(default="", max_length=4000)
    solution: str = Field(default="", max_length=4000)
    deliverables: list[str] = Field(default_factory=list, max_length=MAX_DELIVERABLES)
    scope: list[ProposalScopeItem] = Field(default_factory=list, max_length=MAX_SCOPE_ITEMS)
    stages: list[ProposalStage] = Field(default_factory=list, max_length=MAX_STAGES)
    payment_terms: str = Field(default="", max_length=2000)
    notes: str = Field(default="", max_length=2000)
    catalog_snapshot: list[CatalogSnapshotItem] = Field(default_factory=list, max_length=100)

    @field_validator("deliverables")
    @classmethod
    def validate_deliverables(cls, value: list[str]) -> list[str]:
        cleaned = [item.strip() for item in value if item.strip()]
        if len(cleaned) > MAX_DELIVERABLES:
            raise ValueError("Слишком много пунктов результата")
        if any(len(item) > 300 for item in cleaned):
            raise ValueError("Пункт результата длиннее 300 символов")
        return cleaned


class ProposalCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    title: str | None = Field(default=None, max_length=200)
    client_company: str = Field(default="", max_length=200)
    client_name: str = Field(default="", max_length=160)
    client_contact: str = Field(default="", max_length=200)
    client_email: str = Field(default="", max_length=200)
    lead_public_id: str | None = Field(default=None, max_length=24)


class ProposalUpdate(BaseModel):
    """PATCH-сохранение. revision обязательна: устаревшая запись не перезапишет данные."""

    model_config = ConfigDict(extra="forbid")

    revision: int = Field(ge=1)
    title: str | None = Field(default=None, max_length=200)
    client_company: str | None = Field(default=None, max_length=200)
    client_name: str | None = Field(default=None, max_length=160)
    client_contact: str | None = Field(default=None, max_length=200)
    client_email: str | None = Field(default=None, max_length=200)
    content: ProposalContent | None = None
    # "sent" ставится только через /send, чтобы версия клиента была сохранена.
    status: Literal["draft", "accepted", "rejected"] | None = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value: str | None) -> str | None:
        if value is None:
            return None
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Название КП не может быть пустым")
        return cleaned


class ProposalItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    public_id: str
    title: str
    client_company: str
    client_name: str
    status: str
    total: int
    revision: int
    lead_public_id: str | None
    sent_at: datetime | None
    created_at: datetime
    updated_at: datetime


class ProposalDetail(ProposalItem):
    client_contact: str
    client_email: str
    content: ProposalContent
    sent_snapshot: dict | None


class ProposalListResponse(BaseModel):
    items: list[ProposalItem]
    total: int
    limit: int
    offset: int


class ProposalStatusUpdate(BaseModel):
    status: ProposalStatus


def compute_total(content: ProposalContent | dict) -> int:
    """Итог считается только на сервере: клиентское значение игнорируется."""
    if isinstance(content, ProposalContent):
        items = content.scope
        return sum(item.quantity * item.unit_price for item in items)
    total = 0
    for raw in content.get("scope") or []:
        try:
            total += int(raw.get("quantity", 0)) * int(raw.get("unit_price", 0))
        except (TypeError, ValueError):
            continue
    return total
