"""Создание таблицы заявок

Revision ID: 0001_create_leads
Revises:
Create Date: 2025-11-01
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects.postgresql import UUID as PGUUID

revision: str = "0001_create_leads"
down_revision: str | None = None
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None


def upgrade() -> None:
    op.create_table(
        "leads",
        sa.Column("id", sa.Uuid(as_uuid=True).with_variant(PGUUID(as_uuid=True), "postgresql"), primary_key=True),
        sa.Column("public_id", sa.String(length=20), nullable=False),
        sa.Column("name", sa.String(length=120), nullable=False),
        sa.Column("contact", sa.String(length=160), nullable=False),
        sa.Column("email", sa.String(length=200), nullable=True),
        sa.Column("direction", sa.String(length=60), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("budget", sa.String(length=80), nullable=True),
        sa.Column("deadline", sa.String(length=80), nullable=True),
        sa.Column("source", sa.String(length=40), nullable=False),
        sa.Column("page", sa.String(length=200), nullable=True),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="new"),
        sa.Column("telegram_sent", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("telegram_error", sa.String(length=300), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("ip_hash", sa.String(length=64), nullable=True),
        sa.Column("user_agent", sa.String(length=300), nullable=True),
        sa.Column("fingerprint", sa.String(length=64), nullable=True),
    )
    op.create_index("ix_leads_public_id", "leads", ["public_id"], unique=True)
    op.create_index("ix_leads_status", "leads", ["status"], unique=False)
    op.create_index("ix_leads_created_at", "leads", ["created_at"], unique=False)
    op.create_index("ix_leads_fingerprint", "leads", ["fingerprint"], unique=False)
    op.create_index("ix_leads_contact_created", "leads", ["contact", "created_at"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_leads_contact_created", table_name="leads")
    op.drop_index("ix_leads_fingerprint", table_name="leads")
    op.drop_index("ix_leads_created_at", table_name="leads")
    op.drop_index("ix_leads_status", table_name="leads")
    op.drop_index("ix_leads_public_id", table_name="leads")
    op.drop_table("leads")
