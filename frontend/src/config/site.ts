/**
 * Единая конфигурация бренда и контактов.
 * Все данные ниже должны соответствовать действительности — не добавляйте
 * вымышленные офисы, сотрудников, годы работы и показатели.
 */
export const site = {
  name: "ADA",
  legalName: "ADA — студия веб-разработки и AI-автоматизации",
  tagline: "Студия веб-разработки и AI-автоматизации для бизнеса",
  description:
    "Студия веб-разработки и AI-автоматизации для бизнеса: лендинги, корпоративные и многостраничные сайты, веб-приложения и личные кабинеты, AI-ассистенты, автоматизация процессов, интеграции, поддержка и серверная инфраструктура.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://ada-ai.ru",
  locale: "ru_RU",
  lang: "ru",

  contacts: {
    // Замените на реальный аккаунт перед публикацией
    telegram: "https://t.me/Savvachca",
    telegramHandle: "@Savvachca",
    email: "savva.toch@gmail.com",
    /** Город/регион для Schema.org. Формат: "Ru" или "Moscow, RU" */
    areaServed: "RU",
    country: "RU",
  },

  /** ID аналитики подключаются через переменные окружения */
  analytics: {
    yandexMetrikaId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? "",
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    googleSiteVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
    yandexWebmaster: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "2ca6b3e6677fc127",
  },

  nav: [
    { label: "Услуги", href: "/web-development" },
    { label: "Обслуживание", href: "/maintenance" },
    { label: "Цены", href: "/pricing" },
    { label: "Блог", href: "/blog" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contacts" },
  ],

  /** Направления разработки для меню и подвала */
  footerServices: [
    { label: "Web-разработка", href: "/web-development" },
    { label: "Backend и API", href: "/backend" },
    { label: "AI-разработка", href: "/ai-development" },
    { label: "Автоматизация", href: "/automation" },
    { label: "Чат-боты", href: "/chatbots" },
  ],

  /** Направления технического обслуживания */
  footerMaintenance: [
    { label: "Обслуживание IT-продуктов", href: "/maintenance" },
    { label: "Поддержка сайтов", href: "/website-maintenance" },
    { label: "Администрирование серверов", href: "/server-administration" },
    { label: "Управление базами данных", href: "/database-management" },
    { label: "Техническая поддержка", href: "/technical-support" },
  ],
} as const;

export const legal = {
  privacyPath: "/privacy",
  termsPath: "/terms",
  consentText:
    "Согласен на обработку персональных данных в соответствии с политикой конфиденциальности",
} as const;

export type SiteConfig = typeof site;
