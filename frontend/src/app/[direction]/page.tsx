import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { directions, getDirection, relatedDirections } from "@/config/services";
import { pricesByDirection, formatPrice, pricingNotes } from "@/config/pricing";
import { buildMetadata, jsonLdBreadcrumbs, jsonLdFaq, jsonLdService } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { LeadForm } from "@/components/forms/LeadForm";
import { DirectionIcon } from "@/components/services/DirectionIcon";
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
          jsonLdBreadcrumbs([
            { name: "Главная", path: "/" },
            { name: direction.name, path: `/${direction.slug}` },
          ]),
        ]}
        id={`direction-jsonld-${direction.slug}`}
      />

      <section className="relative overflow-hidden border-b border-muted/15 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-35" aria-hidden />
        <div className="container-page relative pb-14 md:pb-20">
          <Breadcrumbs items={[{ name: direction.name, path: `/${direction.slug}` }]} />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg border border-emerald/25 bg-emerald/5 text-emerald">
                  <DirectionIcon name={direction.icon} />
                </span>
                <span className="eyebrow text-muted">{direction.name}</span>
              </div>
              <h1 className="mt-6 max-w-3xl text-h2 text-bone">{direction.h1}</h1>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-muted md:text-[1.05rem]">
                {direction.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <LinkButton href="#form" withArrow>
                  Обсудить задачу
                </LinkButton>
                <LinkButton href="/pricing" variant="secondary">
                  Смотреть цены
                </LinkButton>
              </div>
            </div>

            <div className="flex flex-col gap-5 lg:pt-2">
              <div className="rounded-xl border border-muted/20 bg-forest/40 p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/70">
                  Стартовая стоимость
                </p>
                <p className="mt-2 font-display text-[1.9rem] font-semibold text-bone">
                  {formatPrice(direction.priceFrom)}
                </p>
                <p className="mt-2 text-[0.78rem] leading-relaxed text-muted">
                  Итоговая цена зависит от объёма работ. Оценка бесплатна.
                </p>
              </div>

              <div className="rounded-xl border border-muted/15 p-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/70">
                  Технологии
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {direction.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-muted/15 px-2 py-1 font-mono text-[0.64rem] text-bone/65"
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

      <section className="border-b border-muted/15 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading index="01" eyebrow="Услуги" title="Что входит в направление" />
          <div className="mt-8 grid gap-x-10 border-t border-muted/15 sm:grid-cols-2 lg:grid-cols-3">
            {direction.services.map((service, index) => (
              <Reveal key={service.title} delay={index * 0.03}>
                <div className="border-b border-muted/15 py-5">
                  <div className="flex items-center gap-2.5">
                    <Check className="size-3.5 text-emerald" aria-hidden />
                    <h3 className="font-display text-[0.98rem] font-medium text-bone">{service.title}</h3>
                  </div>
                  <p className="mt-1.5 pl-6 text-[0.84rem] leading-relaxed text-muted">{service.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-muted/15 bg-forest/20 py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading index="02" eyebrow="Когда нужно" title="Задача, которую это решает" />
            <p className="mt-5 max-w-md text-[0.9rem] leading-relaxed text-muted">
              Направление имеет смысл, когда появляется конкретная проблема в процессе. Ниже — типичные
              ситуации, с которыми к нам приходят.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:gap-6">
            {direction.fit.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05}>
                <div className="flex h-full flex-col gap-2 rounded-xl border border-muted/15 p-5">
                  <span className="font-mono text-[0.62rem] text-muted/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[0.92rem] font-medium text-bone">{item.title}</h3>
                  <p className="text-[0.82rem] leading-relaxed text-muted">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {prices.length > 0 ? (
        <section className="border-b border-muted/15 py-14 md:py-20">
          <div className="container-page">
            <SectionHeading
              index="03"
              eyebrow="Стоимость"
              title="Ориентиры по цене"
              description="Стартовые цены для типового объёма. Точная смета — после разбора задачи."
            />
            <div className="mt-8 border-t border-muted/15">
              {prices.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-muted/15 py-4 md:grid-cols-[1.4fr_2fr_auto] md:items-center"
                >
                  <h3 className="text-[0.94rem] text-bone">{item.title}</h3>
                  <p className="col-span-2 text-[0.82rem] leading-relaxed text-muted md:col-span-1">
                    {item.summary}
                  </p>
                  <span className="whitespace-nowrap font-mono text-[0.78rem] text-bone/80">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ))}
            </div>
            <ul className="mt-6 space-y-1.5">
              {pricingNotes.slice(0, 3).map((note) => (
                <li key={note} className="flex gap-2.5 text-[0.78rem] leading-relaxed text-muted/70">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-emerald/60" aria-hidden />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-b border-muted/15 bg-forest/20 py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading index="04" eyebrow="FAQ" title="Вопросы по направлению" />
          <FaqAccordion items={direction.faq} />
        </div>
      </section>

      <section id="form" className="scroll-mt-24 py-14 md:py-20">
        <div className="container-page grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <SectionHeading
              index="05"
              eyebrow="Заявка"
              title="Опишите задачу"
              description="Ответим, предложим вариант решения и назовём стоимость. Не нужно готовить техническое задание — достаточно описать процесс."
            />
            <div className="mt-6 space-y-2 border-t border-muted/15 pt-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/50">
                Что полезно указать
              </p>
              {["Какую задачу нужно решить", "Какие сервисы уже используются", "Желаемый срок запуска"].map(
                (hint) => (
                  <p key={hint} className="flex gap-2 text-[0.82rem] text-muted">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full bg-emerald/60" aria-hidden />
                    {hint}
                  </p>
                ),
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-muted/15 bg-bone p-6 md:p-8">
            <LeadForm defaultDirection={direction.slug} />
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="border-t border-muted/15 py-12">
          <div className="container-page">
            <p className="eyebrow mb-5 text-muted/60">Смежные направления</p>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/${item.slug}`}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-muted/15 p-5 transition-colors hover:border-emerald/40"
                >
                  <div>
                    <p className="font-display text-[0.95rem] font-medium text-bone">{item.name}</p>
                    <p className="mt-1 text-[0.78rem] leading-relaxed text-muted">{item.short}</p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
