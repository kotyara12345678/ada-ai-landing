"""Сервис КП: нумерация, шаблон по умолчанию, создание из заявки, снимок отправки."""

from __future__ import annotations

from copy import deepcopy
from datetime import UTC, datetime

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.content import proposal_templates as templates
from app.content.catalog import PRICES
from app.db.base import utcnow
from app.models.lead import Lead
from app.models.proposal import Proposal
from app.schemas.proposal import (
    CatalogSnapshotItem,
    ProposalContent,
    ProposalScopeItem,
    ProposalStage,
    ProposalUpdate,
    compute_total,
)


def catalog_snapshot() -> list[dict]:
    return [
        {"id": item.id, "title": item.title, "price": item.price, "direction": item.direction}
        for item in PRICES
    ]


def default_content() -> ProposalContent:
    return ProposalContent(
        template=templates.TEMPLATE_GROWTH,
        problem=templates.DEFAULT_PROBLEM,
        solution=templates.DEFAULT_SOLUTION,
        deliverables=list(templates.DEFAULT_DELIVERABLES),
        stages=[ProposalStage(**stage) for stage in templates.DEFAULT_STAGES],
        payment_terms=templates.DEFAULT_PAYMENT_TERMS,
        notes=templates.DEFAULT_NOTES,
        catalog_snapshot=[CatalogSnapshotItem(**item) for item in catalog_snapshot()],
    )


async def allocate_number(session: AsyncSession, year: int) -> int:
    """Атомарно выдаёт следующий номер года.

    Одна upsert-инструкция: PostgreSQL и SQLite блокируют строку счётчика до
    коммита транзакции, поэтому параллельные создания получают разные номера.
    Пропуски номеров при откате транзакции допустимы — уникальность важнее.
    """
    bind = session.bind
    dialect = bind.dialect.name if bind is not None else ""

    if dialect == "postgresql":
        statement = text(
            """
            INSERT INTO proposal_counters (year, last_number)
            VALUES (:year, 1)
            ON CONFLICT (year)
            DO UPDATE SET last_number = proposal_counters.last_number + 1
            RETURNING last_number
            """
        )
    else:
        statement = text(
            """
            INSERT INTO proposal_counters (year, last_number)
            VALUES (:year, 1)
            ON CONFLICT (year)
            DO UPDATE SET last_number = last_number + 1
            RETURNING last_number
            """
        )

    number = await session.scalar(statement, {"year": year})
    if number is None:  # pragma: no cover - защита от неожиданного драйвера
        raise RuntimeError("Не удалось получить номер коммерческого предложения")
    return int(number)


async def create_proposal(
    session: AsyncSession,
    *,
    title: str | None = None,
    client_company: str = "",
    client_name: str = "",
    client_contact: str = "",
    client_email: str = "",
    lead_public_id: str | None = None,
    content: ProposalContent | None = None,
) -> Proposal:
    year = datetime.now(UTC).year
    number = await allocate_number(session, year)
    document = content or default_content()

    proposal = Proposal(
        public_id=f"КП-{year}-{number:03d}",
        year=year,
        number=number,
        title=(title or templates.DEFAULT_TITLE).strip() or templates.DEFAULT_TITLE,
        client_company=client_company.strip(),
        client_name=client_name.strip(),
        client_contact=client_contact.strip(),
        client_email=client_email.strip(),
        lead_public_id=lead_public_id,
        status="draft",
        total=compute_total(document),
        content=document.model_dump(),
    )
    session.add(proposal)
    await session.commit()
    await session.refresh(proposal)
    return proposal


def content_from_lead(lead: Lead) -> ProposalContent:
    """Черновик КП по заявке: описание становится проблемой, каталог — составом работ."""
    content = default_content()

    problem = lead.description.strip()
    if lead.budget:
        problem += f"\n\nОриентир по бюджету: {lead.budget}."
    if lead.deadline:
        problem += f"\n\nЖелаемый срок: {lead.deadline}."
    content.problem = problem[:4000]

    matching = [item for item in PRICES if item.direction == lead.direction]
    content.scope = [
        ProposalScopeItem(
            id=f"catalog-{item.id}",
            catalog_id=item.id,
            title=item.title,
            description=item.summary,
            unit_price=item.price,
        )
        for item in matching[:4]
    ]
    return content


def apply_update(proposal: Proposal, payload: ProposalUpdate) -> None:
    data = payload.model_dump(exclude_unset=True, exclude={"revision"})

    content = data.pop("content", None)
    if content is not None:
        parsed = ProposalContent.model_validate(content)
        proposal.content = parsed.model_dump()
        proposal.total = compute_total(parsed)

    for field, value in data.items():
        if value is None:
            continue
        setattr(proposal, field, value.strip() if isinstance(value, str) else value)

    proposal.revision += 1


def build_sent_snapshot(proposal: Proposal) -> dict:
    """Копия документа, которую получил клиент. Дальнейшие правки её не меняют."""
    return {
        "captured_at": utcnow().isoformat(),
        "public_id": proposal.public_id,
        "title": proposal.title,
        "client": {
            "company": proposal.client_company,
            "name": proposal.client_name,
            "contact": proposal.client_contact,
            "email": proposal.client_email,
        },
        "total": proposal.total,
        "revision": proposal.revision,
        "content": deepcopy(proposal.content),
    }


def duplicate_proposal(source: Proposal, *, number: int, year: int) -> Proposal:
    """Копия КП с новым номером. Клиентские данные очищаются — документ для другого заказчика."""
    return Proposal(
        public_id=f"КП-{year}-{number:03d}",
        year=year,
        number=number,
        title=source.title,
        client_company="",
        client_name="",
        client_contact="",
        client_email="",
        lead_public_id=None,
        status="draft",
        total=source.total,
        content=deepcopy(source.content),
    )
