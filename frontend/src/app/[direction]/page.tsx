import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { directions, getDirection, relatedDirections } from "@/config/services";
import { pricesByDirection, formatPrice, pricingNotes } from "@/config/pricing";
import {
  maintenanceInfrastructureNote,
  maintenanceSupportNote,
} from "@/config/maintenance";
import { buildMetadata, jsonLdBreadcrumbs, jsonLdFaq, jsonLdService } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { LeadForm } from "@/components/forms/LeadForm";
import { DirectionIcon } from "@/components/services/DirectionIcon";
import { MaintenancePlans } from "@/components/maintenance/MaintenancePlans";
import { Reveal } from "@/components/ui/Reveal";

export const dynamicParams = false;

export function generateStaticParams() {
  return directions.map((direction) => ({ direction: direction.slug }));
}

type PageProps = { params: Promise<{ direction: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { direction: slug } = await params;
  const direction = getDirection(slug);
  if (!direction) return {};
  return buildMetadata({
    title: direction.seo.title,
    description: direction.seo.description,
    path: `/${direction.slug}`,
  });
}

export default async function DirectionPage({ params }: PageProps) {
  const { direction: slug } = await params;
  const direction = getDirection(slug);
  if (!direction) notFound();

  const related = relatedDirections(direction.slug);
  const prices = pricesByDirection(direction.slug);
  const isMaintenance = direction.group === "maintenance";

  return (
    <>
      <JsonLd
        data={[
          jsonLdService({
            name: direction.name,
            description: direction.description,
            path: `/${direction.slug}`,
            priceFrom: direction.priceFrom,
          }),
          jsonLdFaq(direction.faq),
          jsonLdBreadcrumbs(
            isMaintenance
              ? [
                  { name: "Главная", path: "/" },
                  { name: "Обслуживание", path: "/maintenance" },
                  { name: direction.name, path: `/${direction.slug}` },
                ]
              : [
                  { name: "Главная", path: "/" },
                  { name: direction.name, path: `/${direction.slug}` },
                ],
          ),
        ]}
        id={`direction-jsonld-${direction.slug}`}
      />

      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs
            items={
              isMaintenance
                ? [
                    { name: "Обслуживание", path: "/maintenance" },
                    { name: direction.name, path: `/${direction.slug}` },
                  ]
                : [{ name: direction.name, path: `/${direction.slug}` }]
            }
          />

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:gap-12">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <DirectionIcon name={direction.icon} />
                </span>
                <span className="text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-ink-muted">
                  {isMaintenance ? "техническое обслуживание" : direction.name}
                </span>
              </div>
              <h1 className="mt-5 max-w-3xl text-h2 text-ink">{direction.h1}</h1>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted">
                {direction.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <LinkButton href="#form" withArrow>
                  Оставить заявку
                </LinkButton>
                <LinkButton href={isMaintenance ? "/maintenance" : "/pricing"} variant="secondary">
                  {isMaintenance ? "Тарифы обслуживания" : "Смотреть цены"}
                </LinkButton>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="rounded-xl border border-line bg-surface-muted p-5">
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ink-muted">
                  {isMaintenance ? "Стоимость" : "Стартовая стоимость"}
                </p>
                <p className="mt-1.5 font-display text-[1.7rem] font-semibold text-ink">
                  {formatPrice(direction.priceFrom)}
                  {isMaintenance ? (
                    <span className="ml-1 text-[0.85rem] font-normal text-ink-muted">/ мес.</span>
                  ) : null}
                </p>
                <p className="mt-1.5 text-[0.8rem] leading-relaxed text-ink-muted">
                  {isMaintenance
                    ? "Зависит от тарифа и количества систем. Инфраструктура оплачивается отдельно."
                    : "Итоговая цена зависит от объёма работ. Оценка бесплатна."}
                </p>
              </div>

              <div className="rounded-xl border border-line p-5">
                <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ink-muted">
                  {isMaintenance ? "Инструменты" : "Технологии"}
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-1.5">
                  {direction.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-line px-2 py-1 text-[0.76rem] text-ink-muted"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-12 md:py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Состав услуги" title="Что входит" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {direction.services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.02}>
                <div className="h-full rounded-xl border border-line p-4">
                  <div className="flex items-center gap-2">
                    <Check className="size-4 shrink-0 text-success" aria-hidden />
                    <h3 className="text-[0.92rem] font-medium text-ink">{service.title}</h3>
                  </div>
                  <p className="mt-1.5 text-[0.83rem] leading-relaxed text-ink-muted">{service.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-muted py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading eyebrow="Когда нужно" title="Задача, которую это решает" />
            <p className="mt-4 max-w-md text-[0.88rem] leading-relaxed text-ink-muted">
              Направление имеет смысл, когда появляется конкретная проблема в процессе. Ниже —
              типичные ситуации, с которыми к нам приходят.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {direction.fit.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="flex h-full flex-col gap-1.5 rounded-xl border border-line bg-surface p-4">
                  <span className="text-[0.72rem] font-semibold text-brand">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[0.9rem] font-medium text-ink">{item.title}</h3>
                  <p className="text-[0.81rem] leading-relaxed text-ink-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {prices.length > 0 ? (
        <section className="border-b border-line bg-surface py-12 md:py-16">
          <div className="container-page">
            <SectionHeading
              eyebrow="Стоимость"
              title="Ориентиры по цене"
              description="Стартовые цены для типового объёма. Точная смета — после разбора задачи."
            />
            <div className="mt-8 overflow-hidden rounded-xl border border-line">
              {prices.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-x-4 gap-y-1 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[1.4fr_2fr_auto] md:items-center"
                >
                  <h3 className="text-[0.92rem] font-medium text-ink">{item.title}</h3>
                  <p className="text-[0.82rem] leading-relaxed text-ink-muted">{item.summary}</p>
                  <span className="whitespace-nowrap text-[0.86rem] font-semibold text-ink md:text-right">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
            <ul className="mt-5 space-y-1.5">
              {pricingNotes.slice(0, 3).map((note) => (
                <li key={note} className="flex gap-2 text-[0.8rem] leading-relaxed text-ink-muted">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-line-strong" aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {isMaintenance ? (
        <section className="border-b border-line bg-surface py-12 md:py-16">
          <div className="container-page">
            <SectionHeading
              eyebrow="Форматы обслуживания"
              title="Тарифы технического обслуживания"
              description="Работы выполняются командой. VPS, домены, платные сервисы и внешняя инфраструктура оплачиваются отдельно."
              align="between"
            />
            <div className="mt-8">
              <MaintenancePlans compact />
            </div>
            <ul className="mt-5 grid gap-1.5 sm:grid-cols-2">
              {[maintenanceInfrastructureNote, maintenanceSupportNote].map((note) => (
                <li key={note} className="flex gap-2 text-[0.78rem] leading-snug text-ink-muted">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
            <Link
              href="/maintenance"
              className="mt-5 inline-flex items-center gap-1 text-[0.85rem] font-medium text-brand hover:text-brand-dark"
            >
              Подробно о тарифах и составе работ
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </section>
      ) : null}

      <section className="border-b border-line bg-surface-muted py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading eyebrow="FAQ" title="Вопросы по направлению" />
          <FaqAccordion items={direction.faq} />
        </div>
      </section>

      <section id="form" className="scroll-mt-24 bg-surface py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Заявка"
              title="Опишите задачу"
              description="Ответим, предложим вариант решения и назовём стоимость. Не нужно готовить техническое задание — достаточно описать процесс."
            />
            <div className="mt-5 space-y-2 border-t border-line pt-4">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ink-muted">
                Что полезно указать
              </p>
              {[
                "Какую задачу нужно решить",
                "Какие сервисы и технологии уже используются",
                "Желаемый срок запуска или начала работ",
              ].map((hint) => (
                <p key={hint} className="flex gap-2 text-[0.83rem] text-ink-muted">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-line-strong" aria-hidden />
                  {hint}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-7">
            <LeadForm defaultDirection={direction.slug} />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-line bg-surface py-10">
          <div className="container-page">
            <p className="eyebrow mb-4">Смежные услуги</p>
            <div className="grid gap-3 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-line p-4 transition-colors hover:border-brand/40"
                >
                  <div>
                    <p className="text-[0.92rem] font-medium text-ink group-hover:text-brand">
                      {item.name}
                    </p>
                    <p className="mt-1 text-[0.8rem] leading-relaxed text-ink-muted">{item.short}</p>
                  </div>
                  <ArrowRight
                    className="size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
