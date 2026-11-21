import re
import uuid
from datetime import datetime
from typing import Literal

from pydantic import (
    AliasChoices,
    BaseModel,
    ConfigDict,
    EmailStr,
    Field,
    field_validator,
    model_validator,
)

DIRECTIONS = (
    "web-development",
    "backend",
    "ai-development",
    "automation",
    "chatbots",
    "website-maintenance",
    "server-administration",
    "database-management",
    "technical-support",
    "other",
)

LeadStatus = Literal["new", "in_progress", "contacted", "won", "lost", "spam"]

PHONE_RE = re.compile(r"^[\d\s()+\-]{7,20}$")


class LeadCreate(BaseModel):
    # Фронтенд присылает startedAt, API-документация использует started_at
    model_config = ConfigDict(populate_by_name=True)

    name: str = Field(min_length=2, max_length=120)
    contact: str = Field(min_length=2, max_length=160)
    # Почта обязательна: на неё уходит оценка и по ней проще вернуться к диалогу
    email: EmailStr
    direction: str = Field(default="other", max_length=60)
    description: str = Field(min_length=15, max_length=4000)
    budget: str | None = Field(default=None, max_length=80)
    deadline: str | None = Field(default=None, max_length=80)
    consent: bool
    source: str = Field(default="website_form", max_length=40)
    page: str | None = Field(default=None, max_length=200)
    # Honeypot: люди это поле не видят и не заполняют
    company: str | None = Field(default=None, max_length=200)
    started_at: int | None = Field(
        default=None,
        ge=0,
        validation_alias=AliasChoices("started_at", "startedAt"),
    )

    @field_validator("email", mode="before")
    @classmethod
    def email_required(cls, value: object) -> object:
        if value is None or (isinstance(value, str) and not value.strip()):
            raise ValueError("Укажите email — на него отправим оценку и план работ")
        return value.strip() if isinstance(value, str) else value

    @field_validator("budget", "deadline", "page", "company", mode="before")
    @classmethod
    def empty_string_to_none(cls, value: object) -> object:
        if isinstance(value, str) and not value.strip():
            return None
        return value

    @field_validator("name", "description")
    @classmethod
    def strip_text(cls, value: str) -> str:
        return value.strip()

    @field_validator("contact")
    @classmethod
    def validate_contact(cls, value: str) -> str:
        cleaned = value.strip()
        if not cleaned:
            raise ValueError("Укажите Telegram, телефон или другой контакт")
        if cleaned.startswith("@"):
            if len(cleaned) < 4:
                raise ValueError("Слишком короткий Telegram-username")
        elif PHONE_RE.match(cleaned):
            digits = re.sub(r"\D", "", cleaned)
            if len(digits) < 10:
                raise ValueError("Проверьте номер телефона")
        elif len(cleaned) < 4:
            raise ValueError("Укажите корректный контакт для связи")
        return cleaned

    @field_validator("direction")
    @classmethod
    def validate_direction(cls, value: str) -> str:
        return value if value in DIRECTIONS else "other"

    @model_validator(mode="after")
    def validate_consent(self) -> "LeadCreate":
        if not self.consent:
            raise ValueError("Необходимо согласие на обработку персональных данных")
        return self


class LeadResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    public_id: str
    status: str
    created_at: datetime


class LeadAdminItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: uuid.UUID
    public_id: str
    name: str
    contact: str
    email: str | None
    direction: str
    description: str
    budget: str | None
    deadline: str | None
    source: str
    page: str | None
    status: str
    telegram_sent: bool
    created_at: datetime


class LeadStatusUpdate(BaseModel):
    status: LeadStatus


class LeadListResponse(BaseModel):
    items: list[LeadAdminItem]
    total: int
    limit: int
    offset: int
