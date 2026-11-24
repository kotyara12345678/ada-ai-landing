/**
 * DATUM — вымышленный SaaS-продукт. Почта, цифры и тарифы демонстрационные:
 * домен example зарезервирован, письма никуда не уходят.
 */
export const site = {
  name: "DATUM",
  label: "Операционная аналитика",
  tagline: "Одна картина вместо десяти отчётов",
  description:
    "DATUM собирает данные из продуктов, продаж и финансов в один живой дашборд: метрики, сегменты, алерты и отчёты для команд без отдельного аналитика.",
  demoEmail: "team@datum.example",
  nav: [
    { label: "Продукт", href: "#product" },
    { label: "Как работает", href: "#how" },
    { label: "Интеграции", href: "#integrations" },
    { label: "Тарифы", href: "#pricing" },
    { label: "Вопросы", href: "#faq" },
  ],
  disclaimer:
    "DATUM — вымышленный продукт. Сайт создан как демонстрационный концепт студии ADA: метрики, тарифы и отзывы здесь концептуальные.",
} as const;

export const primaryCta = { label: "Попробовать 14 дней", href: "#demo" } as const;
