/**
 * ЕДИНЫЙ источник цен на разработку. Меняйте значения здесь — они используются
 * на главной, на страницах услуг, на /pricing и в контексте AI-консультанта.
 *
 * Тарифы технического обслуживания живут в `frontend/src/config/maintenance.ts`.
 *
 * Цены указаны как «от» и не являются публичной офертой.
 */
export type PriceItem = {
  id: string;
  title: string;
  price: number;
  /** Единица измерения для подписи */
  unit?: string;
  summary: string;
  details: string[];
  category: "Разработка" | "AI" | "Интеграции";
  direction: DirectionSlug;
  /** Популярная позиция — выводится на главной */
  featured?: boolean;
};

export type DirectionSlug =
  | "web-development"
  | "backend"
  | "ai-development"
  | "automation"
  | "chatbots"
  | "voice-ai"
  | "website-maintenance"
  | "server-administration"
  | "database-management"
  | "technical-support";

export const currency = {
  code: "RUB",
  symbol: "₽",
  format: (value: number) => `${new Intl.NumberFormat("ru-RU").format(value)} ₽`,
} as const;

export const priceItems: PriceItem[] = [
  {
    id: "landing",
    title: "Лендинг",
    price: 7000,
    summary: "Одностраничный сайт под конкретную услугу или запуск.",
    details: [
      "Адаптивная вёрстка под мобильные и десктоп",
      "Форма заявки и подключение аналитики",
      "Базовая SEO-разметка и метаданные",
    ],
    category: "Разработка",
    direction: "web-development",
    featured: true,
  },
  {
    id: "corporate-site",
    title: "Корпоративный сайт",
    price: 15000,
    summary: "Многостраничный сайт компании с каталогом услуг.",
    details: [
      "Структура разделов и навигация",
      "Управление контентом через конфигурацию или CMS",
      "Скоростная оптимизация и техническое SEO",
    ],
    category: "Разработка",
    direction: "web-development",
    featured: true,
  },
  {
    id: "telegram-bot",
    title: "Telegram-бот",
    price: 5000,
    summary: "Бот для заявок, консультаций или внутренних процессов.",
    details: [
      "Сценарии диалога и меню",
      "Сохранение данных и уведомления",
      "Интеграция с API и CRM",
    ],
    category: "AI",
    direction: "chatbots",
    featured: true,
  },
  {
    id: "ai-agent",
    title: "AI-агент",
    price: 12000,
    summary: "Ассистент на LLM с доступом к вашим данным и действиям.",
    details: [
      "Системный промпт под ваши регламенты",
      "Работа с базой знаний (RAG)",
      "Сбор структурированных данных в диалоге",
    ],
    category: "AI",
    direction: "ai-development",
    featured: true,
  },
  {
    id: "backend-api",
    title: "Backend / API",
    price: 5000,
    summary: "Серверная логика, база данных и документированный API.",
    details: [
      "Проектирование схемы данных",
      "Аутентификация и разграничение доступа",
      "Документация OpenAPI и тесты",
    ],
    category: "Разработка",
    direction: "backend",
    featured: true,
  },
  {
    id: "automation",
    title: "Автоматизация",
    price: 8000,
    summary: "Связка сервисов и устранение ручных операций.",
    details: [
      "Аудит текущего процесса",
      "Интеграция CRM, почты, таблиц и мессенджеров",
      "Логирование и обработка ошибок",
    ],
    category: "Интеграции",
    direction: "automation",
    featured: true,
  },
  {
    id: "voice-agent",
    title: "Голосовой AI-агент",
    price: 15000,
    summary: "Приём входящих звонков и квалификация обращений.",
    details: [
      "Телефония и STT/TTS-пайплайн",
      "Сценарий квалификации клиента",
      "Передача данных в CRM",
    ],
    category: "AI",
    direction: "voice-ai",
    featured: true,
  },
  {
    id: "api-integration",
    title: "Интеграция API",
    price: 5000,
    summary: "Подключение внешнего сервиса к вашему продукту.",
    details: [
      "Разбор документации провайдера",
      "Обработка ошибок и повторов",
      "Мониторинг стабильности обменов",
    ],
    category: "Интеграции",
    direction: "automation",
    featured: true,
  },
  {
    id: "web-app",
    title: "Веб-приложение / SaaS",
    price: 45000,
    summary: "Приложение с личными кабинетами и подписочной логикой.",
    details: [
      "Роли, доступы и личные кабинеты",
      "Платёжная логика и подписки",
      "Административная часть",
    ],
    category: "Разработка",
    direction: "web-development",
  },
  {
    id: "rag-system",
    title: "RAG-система",
    price: 25000,
    summary: "Поиск по вашим документам с ответами на естественном языке.",
    details: [
      "Индексация документов и разбиение на фрагменты",
      "Векторный поиск и цитирование источников",
      "Оценка качества ответов",
    ],
    category: "AI",
    direction: "ai-development",
  },
  {
    id: "voice-inbound",
    title: "Входящая телефония с AI",
    price: 25000,
    summary: "Маршрутизация звонков и автоматическая запись в CRM.",
    details: [
      "Сценарий приветствия и уточнений",
      "Запись и расшифровка разговоров",
      "Передача заявки ответственному",
    ],
    category: "AI",
    direction: "voice-ai",
  },
  {
    id: "custom-software",
    title: "Custom software",
    price: 60000,
    summary: "Внутренняя система под нестандартный процесс.",
    details: [
      "Техническое проектирование",
      "Модульная архитектура и миграции",
      "Передача кода и документации",
    ],
    category: "Разработка",
    direction: "backend",
  },
];

export function formatPrice(price: number): string {
  return `от ${currency.format(price)}`;
}

export function featuredPrices(): PriceItem[] {
  return priceItems.filter((item) => item.featured);
}

export function pricesByDirection(direction: DirectionSlug): PriceItem[] {
  return priceItems.filter((item) => item.direction === direction);
}

export function findPrice(id: string): PriceItem | undefined {
  return priceItems.find((item) => item.id === id);
}

export const pricingNotes = [
  "Цены «от» — это стартовая стоимость типового объёма работ, а не фиксированная цена любого проекта.",
  "Итоговая стоимость зависит от количества экранов, интеграций, требований к безопасности и сроков.",
  "VPS, домены, платные сервисы и внешняя инфраструктура оплачиваются отдельно.",
  "Оценка бесплатна и не обязывает начинать работы.",
] as const;
