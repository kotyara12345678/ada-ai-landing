import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { buildMetadata, jsonLdBreadcrumbs, jsonLdFaq } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { MaintenancePlans } from "@/components/maintenance/MaintenancePlans";
import { priceItems, pricingNotes, formatPrice } from "@/config/pricing";
import { directions } from "@/config/services";
import {
  maintenanceInfrastructureNote,
  maintenanceSupportNote,
} from "@/config/maintenance";

export const metadata: Metadata = buildMetadata({
  title: "Цены на разработку и обслуживание — от 1 490 ₽/мес. | ADA",
  description:
    "Прайс-лист разработки: лендинг от 7 000 ₽, корпоративный сайт от 15 000 ₽, Telegram-бот от 5 000 ₽, AI-агент от 12 000 ₽. Тарифы обслуживания: Basic 1 490 ₽, Business 2 990 ₽, Advanced 5 990 ₽.",
  path: "/pricing",
  keywords: [
    "стоимость разработки сайта",
    "цены на обслуживание сайта",
    "тарифы поддержки",
    "прайс разработка ПО",
  ],
});

const priceFaq = [
  {
    question: "Цены финальные?",
    answer:
      "Нет. Это стартовая стоимость типового объёма работ. Итоговая цена фиксируется в смете после разбора задачи: она зависит от количества экранов, интеграций, требований к безопасности и сроков.",
  },
  {
    question: "Чем тариф обслуживания отличается от разработки?",
    answer:
      "Разработка — проект с результатом и завершением, стоимость считается по объёму работ. Обслуживание — ежемесячная оплата за постоянный контроль, обновления, резервное копирование и поддержку. Доработки функциональности в тариф не входят.",
  },
  {
    question: "Что оплачивается отдельно?",
    answer:
      "VPS или выделенный сервер, домены, платные SSL-сертификаты, внешнее хранилище резервных копий, платные API и лицензии. Мы не включаем эти расходы в тариф, чтобы вы видели реальную стоимость инфраструктуры.",
  },
  {
    question: "Можно уложиться в минимальный бюджет?",
    answer:
      "Да, если сократить объём до первой версии: один сценарий, один канал, без сложных интеграций. Мы предложим такой вариант, если полный проект пока не окупается.",
  },
  {
    question: "Как происходит оплата?",
    answer:
      "Разработка — по этапам: вы платите за результат конкретного этапа. Обслуживание — ежемесячно по выбранному тарифу. Перед стартом фиксируем объём, стоимость и сроки.",
  },
  {
    question: "Что входит в стоимость разработки?",
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

      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs items={[{ name: "Цены", path: "/pricing" }]} />
          <h1 className="mt-6 max-w-3xl text-h2 text-ink">Сколько стоит разработка и обслуживание</h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted">
            Ниже — стартовые цены по направлениям и тарифы технического обслуживания. Это не
            фиксированная стоимость любого проекта: реальная смета зависит от объёма работ,
            интеграций и требований к надёжности.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.8rem] text-ink-muted">
            <span>Цены в рублях</span>
            <span>Оценка бесплатно</span>
            <span>Оплата разработки по этапам</span>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Разработка"
            title="Стоимость проектов"
            description="Стартовые цены для типового объёма. Точная смета — после разбора задачи."
          />

          <div className="mt-8 space-y-8">
            {categories.map((category) => {
              const items = priceItems.filter((item) => item.category === category);
              if (items.length === 0) return null;
              return (
                <div key={category}>
                  <div className="mb-3 flex items-baseline justify-between gap-4 border-b border-line pb-2">
                    <h2 className="font-display text-[1.1rem] font-semibold text-ink">{category}</h2>
                    <span className="text-[0.76rem] text-ink-muted">{items.length} позиций</span>
                  </div>
                  <div>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="grid gap-x-5 gap-y-1.5 border-b border-line py-4 md:grid-cols-[1.1fr_1.7fr_auto] md:items-start"
                      >
                        <div>
                          <h3 className="text-[0.92rem] font-medium text-ink">{item.title}</h3>
                          <Link
                            href={`/${item.direction}`}
                            className="mt-1 inline-flex items-center gap-1 text-[0.75rem] text-ink-muted transition-colors hover:text-brand"
                          >
                            {directions.find((direction) => direction.slug === item.direction)?.name}
                            <ArrowRight className="size-3" aria-hidden />
                          </Link>
                        </div>
                        <div>
                          <p className="text-[0.84rem] leading-relaxed text-ink-muted">{item.summary}</p>
                          <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
                            {item.details.map((detail) => (
                              <li key={detail} className="text-[0.76rem] text-ink-muted/90">
                                — {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="md:text-right">
                          <span className="whitespace-nowrap text-[0.88rem] font-semibold text-ink">
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
        </div>
      </section>

      <section className="border-b border-line bg-surface-muted py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Обслуживание"
            title="Тарифы технического обслуживания"
            description="Ежемесячная оплата за техническую эксплуатацию: контроль доступности, обновления, резервное копирование и поддержку в рабочие часы."
            align="between"
          />
          <div className="mt-8">
            <MaintenancePlans />
          </div>
          <ul className="mt-5 grid gap-1.5 sm:grid-cols-2">
            {[maintenanceInfrastructureNote, maintenanceSupportNote].map((note) => (
              <li key={note} className="flex gap-2 text-[0.79rem] leading-snug text-ink-muted">
                <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-10 md:py-14">
        <div className="container-page grid gap-6 md:grid-cols-2 md:gap-12">
          <div>
            <h2 className="font-display text-[1.25rem] font-semibold text-ink">
              Что важно знать о ценах
            </h2>
            <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-muted">
              Мы сознательно указываем «от»: честная фиксированная цена на все проекты невозможна.
              Зато можно заранее понять порядок сумм и не тратить время на нерелевантные предложения.
            </p>
          </div>
          <ul className="space-y-2.5">
            {pricingNotes.map((note) => (
              <li key={note} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-ink-muted">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-line-strong" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Оценка"
              title="Посчитаем стоимость вашей задачи"
              description="Заполните форму — уточним детали и пришлём смету с этапами. Если проект не нужен целиком, предложим минимальный первый шаг."
            />
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-7">
            <LeadForm compact />
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface-muted py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading eyebrow="FAQ" title="Вопросы о стоимости" />
          <FaqAccordion items={priceFaq} />
        </div>
      </section>
    </>
  );
}
