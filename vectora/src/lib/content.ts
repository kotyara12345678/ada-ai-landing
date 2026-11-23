export type Solution = {
  id: string;
  index: string;
  name: string;
  subtitle: string;
  summary: string;
  tech: string[];
  items: string[];
};

export const solutions: Solution[] = [
  {
    id: "ai",
    index: "01",
    name: "AI & Intelligent Systems",
    subtitle: "Интеллектуальные системы",
    summary:
      "AI-агенты, ассистенты и RAG-системы, которые работают с вашими данными, а не с общими ответами из интернета.",
    tech: ["LLM", "RAG", "Embeddings", "AI Agents"],
    items: [
      "Агенты и ассистенты под конкретный процесс",
      "Поиск по документам и базе знаний (RAG)",
      "Обработка и разметка неструктурированных данных",
      "Интеграции с LLM-провайдерами и локальными моделями",
    ],
  },
  {
    id: "software",
    index: "02",
    name: "Software Development",
    subtitle: "Разработка продуктов",
    summary:
      "Веб-приложения, сервисы и внутренние продукты, которые заменяют ручные процессы и таблицы.",
    tech: ["Next.js", "TypeScript", "Python", "Node.js"],
    items: [
      "Продуктовые веб-приложения и SaaS-интерфейсы",
      "Внутренние инструменты и админ-панели",
      "Сервисы с сложной доменной логикой",
      "MVP с готовностью к дальнейшему развитию",
    ],
  },
  {
    id: "infrastructure",
    index: "03",
    name: "Digital Infrastructure",
    subtitle: "Инфраструктура",
    summary:
      "Архитектура, API и серверные системы, на которых продукт живёт стабильно и предсказуемо масштабируется.",
    tech: ["Docker", "PostgreSQL", "Redis", "Linux"],
    items: [
      "Проектирование архитектуры и границ сервисов",
      "API и интеграции между системами",
      "Схемы данных, миграции и очереди",
      "Развёртывание, мониторинг и резервные копии",
    ],
  },
  {
    id: "automation",
    index: "04",
    name: "Business Automation",
    subtitle: "Автоматизация",
    summary:
      "Автоматизация процессов и интеграции с CRM, мессенджерами и учётными системами без ручной рутины.",
    tech: ["Python", "Telegram", "Webhooks", "CRM"],
    items: [
      "Интеграции с CRM и учётными системами",
      "Telegram-боты и внутренние ассистенты",
      "Обработка заявок, документов и событий",
      "Аналитические сводки и отчётность",
    ],
  },
  {
    id: "web",
    index: "05",
    name: "Web Engineering",
    subtitle: "Frontend-инженерия",
    summary:
      "Корпоративные сайты и интерфейсы, где важны скорость, доступность и аккуратная типографика.",
    tech: ["React", "Next.js", "Tailwind", "Motion"],
    items: [
      "Корпоративные сайты и продуктовые лендинги",
      "Личные кабинеты и интерфейсы данных",
      "Дизайн-системы и переиспользуемые компоненты",
      "Производительность, SEO и доступность",
    ],
  },
  {
    id: "product",
    index: "06",
    name: "Product Development",
    subtitle: "Продукт целиком",
    summary:
      "Путь от гипотезы и прототипа до работающего MVP, который можно показать пользователям и инвесторам.",
    tech: ["Discovery", "Prototype", "MVP", "Analytics"],
    items: [
      "Формализация гипотезы и сценариев",
      "Прототип и проверка интерфейсных решений",
      "MVP под реальные процессы бизнеса",
      "Аналитика, обратная связь и развитие",
    ],
  },
];

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  tech: string[];
  facts: { label: string; value: string }[];
  /** Обложка карточки в /public/images. */
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "ai-sales-assistant",
    index: "P-01",
    name: "AI-ассистент отдела продаж",
    category: "AI · Интеграции",
    summary:
      "Ассистент, который ищет ответы в регламентах и истории сделок, готовит черновики писем и передаёт заявки в CRM.",
    tech: ["RAG", "LLM", "FastAPI", "PostgreSQL"],
    facts: [
      { label: "Архитектура", value: "RAG + tool calling" },
      { label: "Данные", value: "pgvector, 12 источников" },
      { label: "Интеграции", value: "CRM, почта, Telegram" },
    ],
    image: "/images/project-ai-sales.jpg",
    imageAlt: "Ноутбук с тёмной панелью ассистента и графиком продаж в тёмном офисе",
  },
  {
    slug: "production-analytics",
    index: "P-02",
    name: "Платформа аналитики производства",
    category: "Software · Data",
    summary:
      "Real-time панели по загрузке линий, браку и простоям: поток событий с оборудования, агрегаты и роли доступа.",
    tech: ["Next.js", "Python", "Redis", "Docker"],
    facts: [
      { label: "Архитектура", value: "Event-driven" },
      { label: "Поток", value: "События в near real-time" },
      { label: "Хранение", value: "Postgres + агрегаты" },
    ],
    image: "/images/project-production-analytics.jpg",
    imageAlt: "Производственный цех с роботизированными линиями и данными мониторинга",
  },
  {
    slug: "b2b-marketplace",
    index: "P-03",
    name: "B2B-маркетплейс закупок",
    category: "Product · Web",
    summary:
      "Каталог, корзина-заявка, согласование и кабинет поставщика с прайсами, статусами и историей закупок.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    facts: [
      { label: "Архитектура", value: "Модульный монолит" },
      { label: "Роли", value: "Закупщик, поставщик, админ" },
      { label: "Интеграции", value: "1С, почтовые уведомления" },
    ],
    image: "/images/project-marketplace.jpg",
    imageAlt: "Проход между стеллажами склада с паллетами и подсветкой",
  },
  {
    slug: "logistics-automation",
    index: "P-04",
    name: "Автоматизация логистики",
    category: "Automation · AI",
    summary:
      "Обработка заявок и документов: распознавание накладных, маршрутизация задач и статусы в мессенджере.",
    tech: ["Python", "OCR", "Telegram", "Webhooks"],
    facts: [
      { label: "Архитектура", value: "Очереди + воркеры" },
      { label: "Документы", value: "OCR с проверкой правил" },
      { label: "Уведомления", value: "Telegram, e-mail" },
    ],
    image: "/images/project-logistics.jpg",
    imageAlt: "Погрузчик с коробками и фургон у рампы логистического хаба",
  },
];

export type StackGroup = {
  id: string;
  index: string;
  name: string;
  items: string[];
  note: string;
};

export const stack: StackGroup[] = [
  {
    id: "frontend",
    index: "01",
    name: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    note: "Интерфейсы, дизайн-системы, скорость",
  },
  {
    id: "backend",
    index: "02",
    name: "Backend",
    items: ["Python", "FastAPI", "Rust", "Node.js"],
    note: "API, доменная логика, обработка данных",
  },
  {
    id: "infrastructure",
    index: "03",
    name: "Infrastructure",
    items: ["Docker", "PostgreSQL", "Redis", "Linux"],
    note: "Развёртывание, данные, надёжность",
  },
  {
    id: "ai",
    index: "04",
    name: "AI",
    items: ["LLM", "RAG", "Embeddings", "AI Agents", "Computer Vision"],
    note: "Модели, поиск, агентные сценарии",
  },
];

export const processSteps = [
  {
    index: "1",
    name: "Анализ",
    text: "Понимаем задачу, бизнес-процесс и требования. Фиксируем ограничения и критерии результата.",
    output: "Карта процесса и объём работ",
  },
  {
    index: "2",
    name: "Архитектура",
    text: "Определяем структуру решения, технологии и взаимодействие компонентов до первой строки кода.",
    output: "Архитектурная схема и план",
  },
  {
    index: "3",
    name: "Разработка",
    text: "Реализуем функциональность, интерфейс и инфраструктуру короткими итерациями.",
    output: "Работающие инкременты",
  },
  {
    index: "4",
    name: "Тестирование",
    text: "Проверяем стабильность, производительность и корректность работы на реальных сценариях.",
    output: "Отчёт и исправления",
  },
  {
    index: "5",
    name: "Запуск",
    text: "Развёртываем продукт, настраиваем мониторинг и готовим систему к реальной эксплуатации.",
    output: "Работающий продукт",
  },
];

export const principles = [
  {
    code: "AR-01",
    name: "Architecture first",
    text: "Сначала границы систем и данные, потом код. Решения, которые дорого менять, принимаются в начале.",
  },
  {
    code: "AP-02",
    name: "API driven",
    text: "Интерфейсы между компонентами описываются явно: сервисы и клиенты не знают лишнего друг о друге.",
  },
  {
    code: "AI-03",
    name: "AI native",
    text: "Модели встроены в процесс с проверками и логами, а не добавлены в интерфейс как декоративный чат.",
  },
  {
    code: "MD-04",
    name: "Modular systems",
    text: "Модули можно менять и заменять по отдельности — без переписывания продукта целиком.",
  },
  {
    code: "SC-05",
    name: "Scalable infrastructure",
    text: "Нагрузка растёт по понятным правилам: горизонтально, с метриками и предсказуемой стоимостью.",
  },
];

export const companyFacts = [
  { label: "Формат", value: "Инженерная команда под задачу" },
  { label: "Роль", value: "Архитектура, разработка, запуск" },
  { label: "География", value: "Россия, удалённо" },
  { label: "Модель", value: "Проект или выделенная команда" },
];

export const projectTypes = [
  "AI-продукт / ассистент",
  "Веб-приложение",
  "Backend / API",
  "Автоматизация процессов",
  "Корпоративный сайт",
  "Другое",
] as const;
