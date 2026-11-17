/**
 * Единая конфигурация бренда и контактов.
 * Все данные ниже должны соответствовать действительности — не добавляйте
 * вымышленные офисы, сотрудников, годы работы и показатели.
 */
export const site = {
  name: "ADA",
  legalName: "ADA — команда разработки",
  tagline: "Разработка ПО, AI-решения и автоматизация бизнеса",
  description:
    "Разрабатываем сайты, программное обеспечение и AI-решения, которые автоматизируют процессы, упрощают работу и помогают бизнесу расти.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://ada-ai.ru",
  locale: "ru_RU",
  lang: "ru",

  contacts: {
    // Замените на реальный аккаунт перед публикацией
    telegram: "https://t.me/savva_toch",
    telegramHandle: "@savva_toch",
    email: "savva.toch@gmail.com",
    phone: "",
    /** Город/регион для Schema.org. Формат: "Ru" или "Moscow, RU" */
    areaServed: "RU",
    country: "RU",
  },

  /** ID аналитики подключаются через переменные окружения */
  analytics: {
    yandexMetrikaId: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? "",
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID ?? "",
    googleSiteVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
    yandexWebmaster: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION ?? "",
  },

  nav: [
    { label: "Услуги", href: "/web-development" },
    { label: "Проекты", href: "/portfolio" },
    { label: "Цены", href: "/pricing" },
    { label: "Блог", href: "/blog" },
    { label: "О нас", href: "/about" },
    { label: "Контакты", href: "/contacts" },
  ],

  footerServices: [
    { label: "Web-разработка", href: "/web-development" },
    { label: "Backend и API", href: "/backend" },
    { label: "AI-разработка", href: "/ai-development" },
    { label: "Автоматизация", href: "/automation" },
    { label: "Чат-боты", href: "/chatbots" },
    { label: "Голосовые AI-агенты", href: "/voice-ai" },
  ],
} as const;

export const legal = {
  privacyPath: "/privacy",
  termsPath: "/terms",
  consentText:
    "Согласен на обработку персональных данных в соответствии с политикой конфиденциальности",
} as const;

export type SiteConfig = typeof site;
