"""Проверка, что серверные тарифы обслуживания совпадают с конфигурацией frontend.

Тарифы меняются в `frontend/src/config/maintenance.ts`; тест не позволит
контексту AI-консультанта разойтись с тем, что видит клиент на /maintenance.
"""

from __future__ import annotations

import re
from pathlib import Path

from app.content.catalog import MAINTENANCE_PLANS

FRONTEND_MAINTENANCE = (
    Path(__file__).resolve().parents[2] / "frontend" / "src" / "config" / "maintenance.ts"
)

PLAN_RE = re.compile(
    r'id:\s*"(?P<id>basic|business|advanced)",.*?price:\s*(?P<price>\d+)',
    re.DOTALL,
)


def parse_frontend_plans() -> dict[str, int]:
    source = FRONTEND_MAINTENANCE.read_text(encoding="utf-8")
    return {match.group("id"): int(match.group("price")) for match in PLAN_RE.finditer(source)}


def test_maintenance_plans_match_frontend() -> None:
    if not FRONTEND_MAINTENANCE.exists():  # backend может собираться отдельным контекстом
        return

    frontend = parse_frontend_plans()
    backend = {plan.id: plan.price for plan in MAINTENANCE_PLANS}

    assert frontend, "Не удалось прочитать тарифы из maintenance.ts"
    assert set(frontend) == set(backend), (
        f"Расхождение тарифов: frontend={sorted(frontend)}, backend={sorted(backend)}"
    )

    for plan_id, price in frontend.items():
        assert backend[plan_id] == price, (
            f"Цена тарифа {plan_id} расходится: frontend={price}, backend={backend[plan_id]}"
        )
