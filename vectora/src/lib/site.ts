/**
 * Бренд VECTORA. Компания вымышленная: почта и контакты — демонстрационные,
 * домен example зарезервирован и письма никуда не уходят.
 */
export const site = {
  name: "VECTORA",
  tagline: "Создаём технологии, которые превращают сложные задачи в работающие решения",
  description:
    "Инженерная команда, которая разрабатывает AI-продукты, веб-приложения, backend-системы и автоматизацию для российского бизнеса.",
  demoEmail: "hello@vectora.example",
  label: "Digital engineering studio",
  nav: [
    { label: "Решения", href: "#solutions" },
    { label: "Проекты", href: "#projects" },
    { label: "Технологии", href: "#stack" },
    { label: "Компания", href: "#company" },
  ],
  disclaimer:
    "VECTORA — вымышленная компания. Сайт создан как демонстрационный концепт студии ADA: проекты, технологии и контакты здесь концептуальные.",
} as const;

export const primaryCta = { label: "Обсудить проект", href: "#contact" } as const;

export const heroSignals = [
  { label: "01 / Digital engineering", value: "System status: active" },
  { label: "Stack", value: "AI / Software / Infrastructure" },
] as const;
