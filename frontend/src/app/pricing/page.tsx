import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { buildMetadata, jsonLdBreadcrumbs, jsonLdFaq } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { priceItems, pricingNotes, formatPrice } from "@/config/pricing";
import { directions } from "@/config/services";

export const metadata: Metadata = buildMetadata({
  title: "Цены на разработку сайтов, ботов и AI-решений | ADA",
  description:
    "Прайс-лист: лендинг от 7 000 ₽, корпоративный сайт от 15 000 ₽, Telegram-бот от 5 000 ₽, AI-агент от 12 000 ₽, backend от 5 000 ₽, автоматизация от 8 000 ₽.",
  path: "/pricing",
});

const priceFaq = [
  {
    question: "Цены финальные?",
    answer:
      "Нет. Это стартовая стоимость типового объёма работ. Итоговая цена фиксируется в смете после разбора задачи: она зависит от количества экранов, интеграций, требований к безопасности и сроков.",
  },
  {
    question: "Почему разработка AI-агента дороже сайта?",
    answer:
      "Потому что объём работ другой: сценарии, подготовка базы знаний, интеграции, обработка ошибок модели и тестирование на реальных примерах. Это не одна страница с формой.",
  },
  {
    question: "Можно уложиться в минимальный бюджет?",
    answer:
      "Да, если сократить объём до первой версии: один сценарий, один канал, без сложных интеграций. Мы предложим такой вариант, если полный проект пока не окупается.",
  },
  {
    question: "Как происходит оплата?",
    answer:
      "По этапам: вы платите за результат конкретного этапа. Перед стартом фиксируем объём, стоимость и сроки. Предоплата обсуждается индивидуально.",
  },
  {
    question: "Что входит в стоимость?",
    answer:
      "Проектирование, разработка, тестирование основных сценариев, развёртывание и передача кода с документацией. Контент и сторонние подписки (домен, хостинг, API моделей) оплачиваются отдельно.",
  },
];

export default function PricingPage() {
  const categories = ["Разработка", "AI", "Интеграции"] as const;

  return (
    <>
      <JsonLd
        data={[
          jsonLdBreadcrumbs([
            { name: "Главная", path: "/" },
            { name: "Цены", path: "/pricing" },
          ]),
          jsonLdFaq(priceFaq),
        ]}
        id="pricing-jsonld"
      />

      <section className="border-b border-muted/15 pt-28 md:pt-32">
        <div className="container-page pb-12 md:pb-16">
          <Breadcrumbs items={[{ name: "Цены", path: "/pricing" }]} />
          <h1 className="mt-8 max-w-3xl text-h2 text-bone">
            Сколько стоит разработка
          </h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-muted">
            Ниже — стартовые цены по направлениям. Это не фиксированная стоимость любого проекта:
            реальная смета зависит от объёма работ, интеграций и требований к надёжности.
          </p>
          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted/60">
            <span>Цены в рублях</span>
            <span>Оценка бесплатно</span>
            <span>Оплата по этапам</span>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page space-y-12">
          {categories.map((category) => {
            const items = priceItems.filter((item) => item.category === category);
            if (items.length === 0) return null;
            return (
              <div key={category}>
                <div className="mb-4 flex items-baseline justify-between gap-4 border-b border-muted/20 pb-3">
                  <h2 className="font-display text-[1.2rem] font-medium text-bone">{category}</h2>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/50">
                    {items.length} позиций
                  </span>
                </div>
                <div>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="grid gap-x-6 gap-y-2 border-b border-muted/10 py-5 md:grid-cols-[1.1fr_1.6fr_auto] md:items-start"
                    >
                      <div>
                        <h3 className="text-[0.96rem] font-medium text-bone">{item.title}</h3>
                        <Link
                          href={`/${item.direction}`}
                          className="mt-1 inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted/50 transition-colors hover:text-emerald"
                        >
                          {directions.find((direction) => direction.slug === item.direction)?.name}
                          <ArrowUpRight className="size-2.5" aria-hidden />
                        </Link>
                      </div>
                      <div>
                        <p className="text-[0.85rem] leading-relaxed text-muted">{item.summary}</p>
                        <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                          {item.details.map((detail) => (
                            <li key={detail} className="text-[0.75rem] text-muted/60">
                              — {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:text-right">
                        <span className="whitespace-nowrap font-mono text-[0.85rem] text-emerald">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-muted/15 bg-forest/20 py-12 md:py-16">
        <div className="container-page grid gap-8 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="font-display text-[1.35rem] font-medium text-bone">Что важно знать о ценах</h2>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-muted">
              Мы сознательно указываем «от»: честная фиксированная цена на все проекты невозможна.
              Зато можно заранее понять порядок сумм и не тратить время на нерелевантные предложения.
            </p>
          </div>
          <ul className="space-y-3">
            {pricingNotes.map((note) => (
              <li key={note} className="flex gap-3 text-[0.85rem] leading-relaxed text-muted">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-emerald" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              index="01"
              eyebrow="Оценка"
              title="Посчитаем стоимость вашей задачи"
              description="Заполните форму — уточним детали и пришлём смету с этапами. Если проект не нужен целиком, предложим минимальный первый шаг."
            />
          </div>
          <div className="rounded-2xl border border-muted/15 bg-bone p-6 md:p-8">
            <LeadForm compact />
          </div>
        </div>
      </section>

      <section className="border-t border-muted/15 py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading index="02" eyebrow="FAQ" title="Вопросы о стоимости" />
          <FaqAccordion items={priceFaq} />
        </div>
      </section>
    </>
  );
}
