"""Создание таблиц коммерческих предложений и счётчика номеров

Revision ID: 0002_create_proposals
Revises: 0001_create_leads
Create Date: 2026-11-21
"""

from __future__ import annotations

from collections.abc import Sequence

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.dialects.postgresql import UUID as PGUUID

revision: str = "0002_create_proposals"
down_revision: str | None = "0001_create_leads"
branch_labels: str | Sequence[str] | None = None
depends_on: str | Sequence[str] | None = None

JSONType = sa.JSON().with_variant(JSONB, "postgresql")


def upgrade() -> None:
    op.create_table(
        "proposal_counters",
        sa.Column("year", sa.Integer(), primary_key=True, autoincrement=False),
        sa.Column("last_number", sa.Integer(), nullable=False, server_default="0"),
    )

    op.create_table(
        "proposals",
        sa.Column(
            "id",
            sa.Uuid(as_uuid=True).with_variant(PGUUID(as_uuid=True), "postgresql"),
            primary_key=True,
        ),
        sa.Column("public_id", sa.String(length=24), nullable=False),
        sa.Column("year", sa.Integer(), nullable=False),
        sa.Column("number", sa.Integer(), nullable=False),
        sa.Column("title", sa.String(length=200), nullable=False),
        sa.Column("client_company", sa.String(length=200), nullable=False, server_default=""),
        sa.Column("client_name", sa.String(length=160), nullable=False, server_default=""),
        sa.Column("client_contact", sa.String(length=200), nullable=False, server_default=""),
        sa.Column("client_email", sa.String(length=200), nullable=False, server_default=""),
        sa.Column("lead_public_id", sa.String(length=24), nullable=True),
        sa.Column("status", sa.String(length=20), nullable=False, server_default="draft"),
        sa.Column("total", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("revision", sa.Integer(), nullable=False, server_default="1"),
        sa.Column("content", JSONType, nullable=False),
        sa.Column("sent_snapshot", JSONType, nullable=True),
        sa.Column("sent_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.UniqueConstraint("year", "number", name="uq_proposals_year_number"),
    )
    op.create_index("ix_proposals_public_id", "proposals", ["public_id"], unique=True)
    op.create_index("ix_proposals_status", "proposals", ["status"], unique=False)
    op.create_index("ix_proposals_lead_public_id", "proposals", ["lead_public_id"], unique=False)
    op.create_index(
        "ix_proposals_status_created", "proposals", ["status", "created_at"], unique=False
    )


def downgrade() -> None:
    op.drop_index("ix_proposals_status_created", table_name="proposals")
    op.drop_index("ix_proposals_lead_public_id", table_name="proposals")
    op.drop_index("ix_proposals_status", table_name="proposals")
    op.drop_index("ix_proposals_public_id", table_name="proposals")
    op.drop_table("proposals")
    op.drop_table("proposal_counters")
