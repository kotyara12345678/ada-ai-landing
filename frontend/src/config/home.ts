import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Braces,
  Cable,
  CircleDollarSign,
  Clock,
  Code2,
  Database,
  Fingerprint,
  Gauge,
  Layers,
  MessageSquare,
  MessagesSquare,
  Rocket,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
  Workflow,
} from "lucide-react";

export type Advantage = {
  icon: LucideIcon;
  title: string;
  text: string;
};

export const advantages: Advantage[] = [
  {
    icon: Sparkles,
    title: "AI там, где он полезен",
    text: "Не добавляем модели ради модного слова. Сначала проверяем, где автоматизация действительно экономит время и деньги.",
  },
  {
    icon: CircleDollarSign,
    title: "Прозрачная стоимость",
    text: "Цена складывается из объёма работ и фиксируется до старта. Без скрытых доплат по ходу проекта.",
  },
  {
    icon: Users,
    title: "Прямая коммуникация",
    text: "Вы обсуждаете задачу с теми, кто её делает. Без цепочки менеджеров и потерянных формулировок.",
  },
  {
    icon: Layers,
    title: "Современный стек",
    text: "TypeScript, Python, PostgreSQL, контейнеризация. Технологии, которые легко поддерживать и развивать.",
  },
  {
    icon: Blocks,
    title: "От задачи до системы",
    text: "Берём как отдельную форму, так и комплексный продукт с backend, интеграциями и админ-частью.",
  },
  {
    icon: Fingerprint,
    title: "Индивидуальные решения",
    text: "Не натягиваем бизнес-процесс на готовый шаблон. Архитектура строится под вашу логику.",
  },
];

export type Stage = { step: string; title: string; text: string; duration: string };

export const stages: Stage[] = [
  {
    step: "01",
    title: "Разбираем задачу",
    text: "Обсуждаем процесс, участников и ограничения. Отделяем то, что действительно нужно, от того, что кажется нужным.",
    duration: "1–2 дня",
  },
  {
    step: "02",
    title: "Выбираем архитектуру",
    text: "Определяем структуру данных, стек и границы модулей. Фиксируем, что входит в первую версию.",
    duration: "1–3 дня",
  },
  {
    step: "03",
    title: "Согласуем цену и сроки",
    text: "Разбиваем работу на этапы с понятным результатом. Вы видите, за что платите на каждом шаге.",
    duration: "1 день",
  },
  {
    step: "04",
    title: "Разрабатываем",
    text: "Идём итерациями и показываем промежуточный результат. Изменения обсуждаем до кода, а не после.",
    duration: "от 1 недели",
  },
  {
    step: "05",
    title: "Тестируем",
    text: "Проверяем сценарии, ошибки, валидацию и поведение на мобильных. Критичные места покрываем автотестами.",
    duration: "2–5 дней",
  },
  {
    step: "06",
    title: "Передаём результат",
    text: "Разворачиваем, передаём доступы, код и документацию. Остаёмся на связи по вопросам развития.",
    duration: "1–2 дня",
  },
];

export type TechGroup = { group: string; items: string[] };

export const techStack: TechGroup[] = [
  { group: "Frontend", items: ["TypeScript", "React", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { group: "Backend", items: ["Python", "FastAPI", "SQLAlchemy 2", "Pydantic", "Alembic"] },
  { group: "Данные", items: ["PostgreSQL", "pgvector", "Redis", "S3-совместимое хранилище"] },
  { group: "AI", items: ["LLM API", "RAG", "Streaming (SSE)", "Function calling", "STT / TTS"] },
  { group: "Инфраструктура", items: ["Docker", "Docker Compose", "Nginx", "Linux", "CI/CD"] },
  { group: "Интеграции", items: ["Telegram Bot API", "REST", "Webhooks", "CRM API", "SIP"] },
];

export type HomeFaq = { question: string; answer: string };

export const homeFaq: HomeFaq[] = [
  {
    question: "Сколько стоит разработка сайта?",
    answer:
      "Лендинг стартует от 7 000 ₽, корпоративный сайт — от 15 000 ₽, веб-приложение — от 45 000 ₽. Это цены «от» для типового объёма: итог зависит от количества экранов, интеграций и требований. Точную стоимость называем после разбора задачи.",
  },
  {
    question: "Сколько занимает разработка?",
    answer:
      "Лендинг — обычно от нескольких дней до двух недель. Корпоративный сайт — от двух до четырёх недель. Проекты с AI, интеграциями и личными кабинетами оцениваются отдельно: срок зависит от объёма и готовности ваших материалов.",
  },
  {
    question: "Вы работаете по договору?",
    answer:
      "Да. Перед стартом фиксируем объём работ, стоимость и сроки. Оплата поэтапная: вы платите за результат конкретного этапа, а не всю сумму вперёд.",
  },
  {
    question: "Можно начать с небольшой задачи?",
    answer:
      "Да, и часто это правильный вариант. Небольшой модуль или бот позволяет проверить гипотезу с минимальными вложениями и уже потом расширять систему.",
  },
  {
    question: "Кому принадлежат права на код?",
    answer:
      "Заказчику. После закрытия проекта вы получаете исходный код, доступы и документацию. Мы не удерживаем проект технически.",
  },
  {
    question: "Что если после запуска нужны доработки?",
    answer:
      "Доработки обсуждаются отдельно и оцениваются по объёму. Если проект передан полностью, вы можете развивать его своей командой — код и схема данных документированы.",
  },
  {
    question: "Вы делаете AI-решения без готовой инфраструктуры?",
    answer:
      "Да. Начинаем с прототипа: проверяем качество на ваших данных и только потом встраиваем в продукт. Если AI не даёт выигрыша в вашей задаче, скажем об этом до начала работ.",
  },
  {
    question: "Как проходит работа с регионами?",
    answer:
      "Удалённо, в удобном для вас канале: Telegram, почта, видеозвонки. Часовой пояс и формат созвонов согласуем на старте.",
  },
];

export type TrustPoint = { icon: LucideIcon; label: string; text: string };

export const trustPoints: TrustPoint[] = [
  { icon: Code2, label: "Код", text: "TypeScript и Python, типизация и тесты" },
  { icon: Database, label: "Данные", text: "PostgreSQL, миграции, резервные копии" },
  { icon: ShieldCheck, label: "Безопасность", text: "Валидация, rate limiting, защита секретов" },
  { icon: Gauge, label: "Скорость", text: "Core Web Vitals и оптимизация бандла" },
  { icon: Workflow, label: "Процессы", text: "Итерации и понятные этапы" },
  { icon: ScrollText, label: "Документация", text: "OpenAPI, README, инструкции деплоя" },
];

export const heroMetrics = [
  { icon: Rocket, label: "MVP", text: "от 1 недели" },
  { icon: Braces, label: "Стек", text: "TypeScript / Python" },
  { icon: Cable, label: "Интеграции", text: "CRM, API, Telegram" },
  { icon: Clock, label: "Оценка", text: "бесплатно" },
];

export const contactChannels = [
  { icon: MessagesSquare, label: "Telegram", key: "telegram" },
  { icon: MessageSquare, label: "Email", key: "email" },
] as const;
