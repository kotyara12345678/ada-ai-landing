"""Проверка, что серверный каталог цен совпадает с конфигурацией frontend.

Цены должны меняться в `frontend/src/config/pricing.ts`; этот тест не позволит
серверному контексту AI-консультанта разойтись с интерфейсом.
"""

from __future__ import annotations

import re
from pathlib import Path

from app.content.catalog import PRICES

FRONTEND_PRICING = Path(__file__).resolve().parents[2] / "frontend" / "src" / "config" / "pricing.ts"

ITEM_RE = re.compile(
    r'id:\s*"(?P<id>[a-z0-9-]+)",.*?title:\s*"(?P<title>[^"]+)",\s*price:\s*(?P<price>\d+)',
    re.DOTALL,
)


def parse_frontend_prices() -> dict[str, int]:
    source = FRONTEND_PRICING.read_text(encoding="utf-8")
    return {match.group("id"): int(match.group("price")) for match in ITEM_RE.finditer(source)}


def test_catalog_matches_frontend_pricing() -> None:
    if not FRONTEND_PRICING.exists():  # backend может собираться отдельным контекстом
        return

    frontend = parse_frontend_prices()
    backend = {item.id: item.price for item in PRICES}

    missing_in_backend = set(frontend) - set(backend)
    missing_in_frontend = set(backend) - set(frontend)

    assert not missing_in_backend, f"Нет в backend-каталоге: {missing_in_backend}"
    assert not missing_in_frontend, f"Нет во frontend-конфиге: {missing_in_frontend}"

    for item_id, price in frontend.items():
        assert backend[item_id] == price, (
            f"Цена {item_id} расходится: frontend={price}, backend={backend[item_id]}"
        )
