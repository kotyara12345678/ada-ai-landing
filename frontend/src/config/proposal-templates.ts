/**
 * Единственный шаблон КП в MVP. Тексты по умолчанию создаёт сервер
 * (`backend/app/content/proposal_templates.py`), здесь — подпись для интерфейса
 * и помощники для состава работ из каталога цен.
 */
import { priceItems, type PriceItem } from "@/config/pricing";
import type { ProposalScopeItem } from "@/lib/proposals-api";

export const PROPOSAL_TEMPLATE = {
  id: "growth-automation",
  name: "Рост и автоматизация",
  description:
    "Универсальное предложение: сайт, автоматизация ручных операций или AI-инструмент.",
} as const;

export const proposalCatalog: PriceItem[] = priceItems;

export function newScopeItemFromCatalog(item: PriceItem): ProposalScopeItem {
  return {
    id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    catalog_id: item.id,
    title: item.title,
    description: item.summary,
    quantity: 1,
    unit: "шт.",
    unit_price: item.price,
  };
}

export function newCustomScopeItem(): ProposalScopeItem {
  return {
    id: `row-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    catalog_id: null,
    title: "Дополнительная работа",
    description: "",
    quantity: 1,
    unit: "шт.",
    unit_price: 0,
  };
}

export function scopeTotal(items: ProposalScopeItem[]): number {
  return items.reduce(
    (total, item) => total + Math.max(0, item.quantity) * Math.max(0, item.unit_price),
    0,
  );
}
