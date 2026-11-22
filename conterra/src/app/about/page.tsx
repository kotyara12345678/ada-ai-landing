import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/ui/page-header";
import { Principles } from "@/components/about/principles";
import { SystemMap } from "@/components/about/system-map";
import { Quality } from "@/components/about/quality";
import { FinalCta } from "@/components/sections/final-cta";
import { site } from "@/lib/site";
import { canonical } from "@/lib/seo";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "О компании",
  description:
    "CONTERRA — инженерно-строительная компания: системный подход, техническая проработка, контроль качества и координация этапов от концепции до эксплуатации.",
  alternates: { canonical: canonical("/about") },
};

const facts = [
  { label: "Профиль", value: "Инженерное проектирование и строительство" },
  { label: "География", value: "Российская Федерация" },
  { label: "Формат", value: "Отдельный этап или полный цикл" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="О компании"
        title="Инженерный подход к бизнес-задачам"
        lead={
          <>
            CONTERRA создаёт инфраструктуру для развития бизнеса — от первого расчёта до объекта
            в эксплуатации. Мы соединяем проектирование, строительство и инженерию в одну
            управляемую систему.
          </>
        }
        crumbs={[{ label: "Главная", href: "/" }, { label: "О компании" }]}
        aside={
          <dl className="grid gap-3">
            {facts.map((fact) => (
              <div key={fact.label} className="flex items-baseline justify-between gap-4 border-b border-line pb-2">
                <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-muted">{fact.label}</dt>
                <dd className="text-right text-[0.8125rem] text-graphite/80">{fact.value}</dd>
              </div>
            ))}
          </dl>
        }
      />

      <section className="border-b border-line bg-paper py-14 md:py-20" aria-labelledby="philosophy-title">
        <div className="shell grid gap-10 md:grid-cols-12 md:gap-10">
          <figure className="md:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-line sm:aspect-[4/3] md:aspect-[4/5]">
              <Image
                src={asset("/images/blueprint-desk.jpg")}
                alt="Чертежи и техническая документация на светлом столе"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.6875rem] leading-relaxed text-muted">
              Концептуальная иллюстрация: работа с документацией и техническими решениями
            </figcaption>
          </figure>

          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-teal">Философия</p>
            <h2 id="philosophy-title" className="h2 mt-4 max-w-[18ch]">
              Объект оценивается по стоимости владения, а не по цене входа
            </h2>

            <div className="mt-6 space-y-4 text-[0.9375rem] leading-relaxed text-graphite/75">
              <p>
                Инженерное решение почти всегда компромисс: между капитальными затратами,
                сроками, технологией и будущей эксплуатацией. Наша задача — сделать этот
                компромисс осознанным. Заказчик должен понимать, что он получает сейчас и что
                будет обслуживать через десять лет.
              </p>
              <p>
                Поэтому мы начинаем с вопросов: как устроен процесс, какие нагрузки и режимы
                предстоят объекту, что будет меняться через несколько лет. Только после этого
                появляются планировки, конструкции и спецификации.
              </p>
              <p>
                Проект, стройка и инженерные системы у нас связаны одной ответственностью. Это
                снимает главную проблему типового подряда — когда каждый участник выполняет свой
                раздел формально, а стыки остаются заказчику.
              </p>
            </div>

            <blockquote className="mt-8 border-l-2 border-teal pl-5">
              <p className="font-display text-[1.125rem] leading-snug tracking-tight text-graphite">
                «Создаём инфраструктуру для развития бизнеса»
              </p>
              <footer className="mt-2 text-[0.75rem] text-muted">
                Позиционирование {site.name} · демонстрационный концепт
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <Principles />
      <SystemMap />
      <Quality />
      <FinalCta
        title="Обсудим подход к вашему объекту"
        description="Пришлите вводные: назначение объекта, участок, ориентиры по срокам и бюджету. Предложим последовательность этапов и формат работы."
      />
    </>
  );
}
