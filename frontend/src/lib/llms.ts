import { site } from "@/config/site";
import { directions } from "@/config/services";
import { formatPrice, priceItems, pricingNotes } from "@/config/pricing";
import {
  formatPlanPrice,
  maintenanceFaq,
  maintenanceInfrastructureNote,
  maintenancePlans,
  maintenanceSupportNote,
} from "@/config/maintenance";
import { homeFaq } from "@/config/home";
import { articles } from "@/content/blog";

/** Убирает переносы строк из описаний, чтобы markdown-список оставался списком. */
const oneLine = (value: string) => value.replace(/\s+/g, " ").trim();

const contactLines = [
  `- Telegram: ${site.contacts.telegram} (${site.contacts.telegramHandle})`,
  `- Email: ${site.contacts.email}`,
  `- Форма заявки: ${site.url}/contacts`,
].join("\n");

const priceLines = priceItems
  .map((item) => `- ${item.title} — ${formatPrice(item.price)}: ${oneLine(item.summary)}`)
  .join("\n");

const planLines = maintenancePlans
  .map(
    (plan) =>
      `- ${plan.name} — ${formatPlanPrice(plan.price)}/мес: ${oneLine(plan.tagline)} ${oneLine(plan.hours)}.`,
  )
  .join("\n");

const directionLines = directions
  .map(
    (direction) =>
      `- [${direction.name}](${site.url}/${direction.slug}) — ${oneLine(direction.short)} Старт: ${formatPrice(direction.priceFrom)}.`,
  )
  .join("\n");

const articleLines = articles
  .map(
    (article) =>
      `- [${article.title}](${site.url}/blog/${article.slug}) — ${oneLine(article.description)} (${article.publishedAt})`,
  )
  .join("\n");

const pageLines = [
  `- [Главная](${site.url}/) — разработка сайтов, сервисов и AI под ключ`,
  `- [Обслуживание и тарифы](${site.url}/maintenance) — поддержка сайтов, серверов и баз данных`,
  `- [Цены](${site.url}/pricing) — полный прайс-лист на разработку и AI`,
  `- [О нас](${site.url}/about) — как работает команда и что передаём клиенту`,
  `- [Блог](${site.url}/blog) — разборы по разработке, AI и обслуживанию`,
  `- [Контакты](${site.url}/contacts) — Telegram, email, форма заявки`,
].join("\n");

const faqBlock = (items: { question: string; answer: string }[]) =>
  items.map((item) => `### ${item.question}\n\n${oneLine(item.answer)}`).join("\n\n");

/**
 * /llms.txt — краткая карта сайта для языковых моделей и агентов
 * (формат из спецификации llmstxt.org: H1, цитата, разделы со ссылками).
 */
export function buildLlmsTxt(): string {
  return `# ${site.name} — ${site.tagline}

> ${site.description}

Сайт: ${site.url}
Язык: русский
Регион работы: Россия, удалённо
Формат работы: договор, поэтапная оплата, код и доступы остаются у клиента

## Контакты

${contactLines}

## Услуги

${directionLines}

## Пакеты разработки (стартовые цены, не публичная оферта)

${priceLines}

## Тарифы обслуживания

${planLines}

## Страницы

${pageLines}

## Статьи

${articleLines}

## Как использовать материалы

Тексты страниц можно цитировать со ссылкой на конкретный URL. Цены указаны как «от» и зависят от объёма работ. Стоимость VPS, доменов и внешних сервисов оплачивается отдельно.
`;
}

/** /llms-full.txt — расширенная версия: составы услуг, тарифы и ответы на частые вопросы. */
export function buildLlmsFullTxt(): string {
  const serviceSections = directions
    .map((direction) => {
      const includes = direction.services
        .map((service) => `- **${service.title}.** ${oneLine(service.text)}`)
        .join("\n");
      return `## ${direction.name}

URL: ${site.url}/${direction.slug}
Стартовая цена: ${formatPrice(direction.priceFrom)}

${oneLine(direction.description)}

Что входит:

${includes}

Стек: ${direction.stack.join(", ")}.
`;
    })
    .join("\n");

  const planSections = maintenancePlans
    .map(
      (plan) => `### ${plan.name} — ${formatPlanPrice(plan.price)}/мес

${oneLine(plan.tagline)}

- Часы работ: ${oneLine(plan.hours)}
- Резервное копирование: ${oneLine(plan.backups)}
- Поддержка: ${oneLine(plan.support)}
- Кому подходит: ${oneLine(plan.fitFor)}

Входит:

${plan.includes.map((item) => `- ${oneLine(item)}`).join("\n")}
`,
    )
    .join("\n");

  return `# ${site.name} — полное описание сайта для AI-ассистентов

> ${site.description}

Сайт: ${site.url}
Язык: русский
Регион: Россия, удалённо
Связаться: ${site.contacts.telegram} (${site.contacts.telegramHandle}), ${site.contacts.email}

## Контакты и каналы

${contactLines}

## Услуги и цены

${directionLines}

---

${serviceSections}

## Пакеты разработки

${priceLines}

${pricingNotes.map((note) => `- ${oneLine(note)}`).join("\n")}

## Тарифы технического обслуживания

${planSections}

${maintenanceInfrastructureNote} ${maintenanceSupportNote}

## Частые вопросы о разработке

${faqBlock(homeFaq)}

## Частые вопросы об обслуживании

${faqBlock(maintenanceFaq)}

## Статьи блога

${articleLines}

## Правила цитирования

Материалы можно использовать в ответах со ссылкой на исходный URL. Цены — стартовые («от») и не являются публичной офертой; итоговая стоимость зависит от объёма работ. Стоимость VPS, доменов, платных сервисов и внешней инфраструктуры оплачивается отдельно.
`;
}
