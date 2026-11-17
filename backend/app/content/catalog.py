"""
База знаний AI-консультанта.

Единственный источник цен для frontend — `frontend/src/config/pricing.ts`.
Этот файл повторяет те же позиции для серверного контекста модели.
Синхронность проверяется тестом `tests/test_catalog_sync.py`.
Если меняете цены — обновите оба файла.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class PriceItem:
    id: str
    title: str
    price: int
    direction: str
    summary: str


PRICES: tuple[PriceItem, ...] = (
    PriceItem("landing", "Лендинг", 7000, "web-development", "Одностраничный сайт под услугу или запуск"),
    PriceItem("corporate-site", "Корпоративный сайт", 15000, "web-development", "Многостраничный сайт компании"),
    PriceItem("telegram-bot", "Telegram-бот", 5000, "chatbots", "Бот для заявок и консультаций"),
    PriceItem("ai-agent", "AI-агент", 12000, "ai-development", "Ассистент на LLM со сценарием и данными"),
    PriceItem("backend-api", "Backend / API", 5000, "backend", "Серверная логика и документированный API"),
    PriceItem("automation", "Автоматизация", 8000, "automation", "Связка сервисов и устранение ручных операций"),
    PriceItem("voice-agent", "Голосовой AI-агент", 15000, "voice-ai", "Приём звонков и квалификация обращений"),
    PriceItem("api-integration", "Интеграция API", 5000, "automation", "Подключение внешнего сервиса"),
    PriceItem("web-app", "Веб-приложение / SaaS", 45000, "web-development", "Приложение с кабинетами и подписками"),
    PriceItem("rag-system", "RAG-система", 25000, "ai-development", "Поиск по документам с ответами и источниками"),
    PriceItem("voice-inbound", "Входящая телефония с AI", 25000, "voice-ai", "Маршрутизация звонков и запись в CRM"),
    PriceItem("custom-software", "Custom software", 60000, "backend", "Внутренняя система под процесс"),
)

DIRECTIONS: dict[str, str] = {
    "web-development": "Лендинги, корпоративные сайты, интернет-сервисы, SaaS, личные кабинеты, веб-приложения. От 7 000 ₽.",
    "backend": "REST API, backend-системы, PostgreSQL, интеграции, архитектура, оптимизация. От 5 000 ₽.",
    "ai-development": "AI-агенты, RAG-системы, LLM-интеграции, ассистенты, обработка документов, поиск. От 12 000 ₽.",
    "automation": "Автоматизация процессов, CRM-интеграции, Telegram, обработка заявок, API, документооборот. От 8 000 ₽.",
    "chatbots": "Telegram-боты, AI-чат-боты, консультанты, внутренние боты, CRM-интеграции. От 5 000 ₽.",
    "voice-ai": "Голосовые агенты, AI-телефония, квалификация, CRM, STT/TTS. От 15 000 ₽.",
}

PORTFOLIO: tuple[dict[str, str], ...] = (
    {
        "name": "ADA — AI Document Assistant",
        "status": "в разработке",
        "task": "Ответы по содержимому загруженных документов с указанием источника.",
        "stack": "Python, FastAPI, PostgreSQL, pgvector, LLM API, Next.js",
    },
    {
        "name": "Kotyara VPN",
        "status": "в разработке",
        "task": "VPN-инфраструктура, управление подключениями и клиентский веб-кабинет.",
        "stack": "Python, FastAPI, PostgreSQL, Docker, Nginx, WireGuard",
    },
    {
        "name": "MCA Voice Agent",
        "status": "пилот",
        "task": "Голосовой агент для входящих обращений и квалификации клиентов.",
        "stack": "Python, FastAPI, STT, TTS, LLM API, SIP",
    },
)

RULES = (
    "Цены — только стартовые, «от». Итоговая стоимость зависит от объёма работ и без анализа задачи не называется.",
    "Не обещай конкретные сроки. Можно сказать, что срок фиксируется после согласования объёма.",
    "Не придумывай кейсы, клиентов, метрики, количество сотрудников и опыта компании.",
    "Предварительная оценка не является коммерческим предложением.",
)


def render_context() -> str:
    """Текстовая выжимка каталога для системного промпта."""
    price_lines = "\n".join(
        f"- {item.title}: от {item.price:,} ₽ ({item.summary})".replace(",", " ")
        for item in PRICES
    )
    direction_lines = "\n".join(f"- {name}: {text}" for name, text in DIRECTIONS.items())
    portfolio_lines = "\n".join(
        f"- {project['name']} ({project['status']}): {project['task']} Стек: {project['stack']}."
        for project in PORTFOLIO
    )
    rules = "\n".join(f"- {rule}" for rule in RULES)

    return (
        "НАПРАВЛЕНИЯ И СТАРТОВЫЕ ЦЕНЫ:\n"
        f"{direction_lines}\n\n"
        "ПРАЙС-ЛИСТ (стоимость «от», рубли РФ):\n"
        f"{price_lines}\n\n"
        "ПОРТФОЛИО (реальные проекты, статус указан фактически):\n"
        f"{portfolio_lines}\n\n"
        "ОГРАНИЧЕНИЯ:\n"
        f"{rules}"
    )
