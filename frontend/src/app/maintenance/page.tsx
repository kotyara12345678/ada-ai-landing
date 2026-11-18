import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Info, Minus } from "lucide-react";
import {
  buildMetadata,
  jsonLdFaq,
  jsonLdService,
  jsonLdBreadcrumbs,
} from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LinkButton } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { LeadForm } from "@/components/forms/LeadForm";
import { DirectionIcon } from "@/components/services/DirectionIcon";
import { MaintenancePlans } from "@/components/maintenance/MaintenancePlans";
import { Reveal } from "@/components/ui/Reveal";
import { maintenanceDirections } from "@/config/services";
import {
  controlItems,
  maintenanceFaq,
  maintenanceInfrastructureNote,
  maintenancePlans,
  maintenanceProcess,
  maintenanceSupportNote,
} from "@/config/maintenance";

export const metadata: Metadata = buildMetadata({
  title: "Обслуживание IT-продуктов и Managed IT Services — от 1 490 ₽/мес. | ADA",
  description:
    "Техническая эксплуатация сайтов, серверов, баз данных и программных систем: мониторинг доступности, резервное копирование, обновления и контроль SSL. Тарифы Basic, Business и Advanced.",
  path: "/maintenance",
  keywords: [
    "обслуживание сайтов",
    "техническое обслуживание IT",
    "managed IT services",
    "администрирование серверов",
    "обслуживание баз данных",
    "техническая поддержка сайта",
  ],
});

const includedWorks = [
  "Контроль доступности сайта и API",
  "Мониторинг сервера и базы данных",
  "Обновления систем и зависимостей",
  "Резервное копирование по расписанию",
  "Проверка восстановления из копии",
  "Контроль SSL и сроков домена",
  "Уведомления о критических ошибках",
  "Часы технических работ по тарифу",
];

const separateCosts = [
  "VPS или выделенный сервер",
  "Домены и их продление",
  "Платные SSL-сертификаты",
  "Внешнее хранилище резервных копий",
  "Платные API и сервисы",
  "Лицензии и подписки",
];

const beyondTariff = [
  "Разработка новой функциональности",
  "Редизайн и переверстка",
  "Переезд на другую платформу",
  "Круглосуточное дежурство",
  "Работы сверх лимита часов",
];

export default function MaintenancePage() {
  return (
    <>
      <JsonLd
        data={[
          jsonLdService({
            name: "Обслуживание IT-продуктов",
            description:
              "Техническая эксплуатация сайтов, серверов, баз данных и программных систем: мониторинг, обновления, резервное копирование и контроль SSL.",
            path: "/maintenance",
            priceFrom: 1490,
          }),
          jsonLdFaq(maintenanceFaq),
          jsonLdBreadcrumbs([
            { name: "Главная", path: "/" },
            { name: "Обслуживание", path: "/maintenance" },
          ]),
        ]}
        id="maintenance-jsonld"
      />

      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs items={[{ name: "Обслуживание", path: "/maintenance" }]} />

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            <div>
              <p className="eyebrow">Managed IT Services</p>
              <h1 className="mt-3 max-w-3xl text-h2 text-ink">
                Ваш IT-продукт под постоянным техническим контролем
              </h1>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted">
                Берём на себя техническую эксплуатацию сайтов, серверов, баз данных и программных
                систем. Следим за доступностью, обновлениями, резервным копированием и
                безопасностью — по понятному регламенту и фиксированному тарифу.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <LinkButton href="#plans" withArrow>
                  Смотреть тарифы
                </LinkButton>
                <LinkButton href="#form" variant="secondary">
                  Обсудить обслуживание
                </LinkButton>
              </div>

              <p className="mt-5 text-[0.8rem] text-ink-muted">
                От 1 490 ₽ в месяц · работы в рабочие часы · без обещаний 24/7
              </p>
            </div>

            <div className="rounded-xl border border-line bg-surface-muted p-5">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ink-muted">
                Что закрывает обслуживание
              </p>
              <ul className="mt-3 grid gap-2">
                {[
                  "Сайт открывается и принимает заявки",
                  "Сервер не падает из-за переполненного диска",
                  "Резервная копия существует и проверена",
                  "SSL продлён до истечения срока",
                  "Обновления безопасности установлены",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-[0.84rem] leading-snug text-ink">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-3 border-t border-line pt-3 text-[0.76rem] leading-snug text-ink-muted">
                Это описание услуги. Конкретный состав работ фиксируется в тарифе и регламенте.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Направления обслуживания"
            title="Что берём на сопровождение"
            description="Четыре направления закрывают техническую эксплуатацию продукта. Можно подключить одно или сразу весь контур."
            align="between"
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {maintenanceDirections.map((direction) => (
              <Link
                key={direction.slug}
                href={`/${direction.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-line bg-surface p-5 transition-all hover:border-brand/40 hover:shadow-card"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <DirectionIcon name={direction.icon} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[0.98rem] font-semibold text-ink group-hover:text-brand">
                    {direction.name}
                  </h3>
                  <p className="mt-1 text-[0.84rem] leading-relaxed text-ink-muted">{direction.short}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-[0.79rem] font-medium text-brand">
                    Подробнее
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-muted py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Контур контроля"
            title="Что именно проверяется"
            description="Ниже — возможности, которые настраиваются при подключении. Это не отчёт о текущей инфраструктуре, а состав работ по обслуживанию."
            align="between"
          />

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {controlItems.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.02}>
                <div className="h-full rounded-xl border border-line bg-surface p-4">
                  <h3 className="text-[0.9rem] font-medium text-ink">{item.title}</h3>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-muted">{item.text}</p>
                  <p className="mt-2 border-t border-line pt-2 text-[0.75rem] leading-snug text-ink-muted">
                    {item.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="scroll-mt-20 border-b border-line bg-surface py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Тарифы"
            title="Стоимость технического обслуживания"
            description="Тариф — это работы команды: контроль, обновления, резервное копирование и техническая поддержка. Инфраструктура оплачивается отдельно."
            align="between"
          />
          <div className="mt-8">
            <MaintenancePlans />
          </div>

          <div className="mt-5 flex flex-col gap-2 rounded-xl border border-line bg-surface-muted p-4 sm:flex-row sm:items-start sm:gap-3">
            <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
            <div className="grid gap-1 text-[0.8rem] leading-relaxed text-ink-muted sm:grid-cols-2 sm:gap-4">
              <p>{maintenanceInfrastructureNote}</p>
              <p>{maintenanceSupportNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-muted py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Разграничение"
            title="Что входит и что оплачивается отдельно"
            description="Прозрачные границы помогают избежать неожиданных счетов и недопонимания по объёму работ."
          />

          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            <div className="rounded-xl border border-line bg-surface p-5">
              <h3 className="text-[0.92rem] font-semibold text-ink">Входит в тариф</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {includedWorks.map((item) => (
                  <li key={item} className="flex gap-2 text-[0.82rem] leading-snug text-ink">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5">
              <h3 className="text-[0.92rem] font-semibold text-ink">Оплачивается отдельно</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {separateCosts.map((item) => (
                  <li key={item} className="flex gap-2 text-[0.82rem] leading-snug text-ink-muted">
                    <Minus className="mt-1 size-3 shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-line bg-surface p-5">
              <h3 className="text-[0.92rem] font-semibold text-ink">Не входит в тариф</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {beyondTariff.map((item) => (
                  <li key={item} className="flex gap-2 text-[0.82rem] leading-snug text-ink-muted">
                    <Minus className="mt-1 size-3 shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-12 md:py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Как начинаем" title="Порядок подключения" />
          <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {maintenanceProcess.map((step) => (
              <li key={step.step} className="rounded-xl border border-line p-4">
                <span className="text-[0.78rem] font-semibold text-brand">{step.step}</span>
                <h3 className="mt-1.5 text-[0.92rem] font-medium text-ink">{step.title}</h3>
                <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-muted">{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-[0.8rem] leading-relaxed text-ink-muted">
            Тарифы: {maintenancePlans.map((plan) => `${plan.name} — от ${plan.price.toLocaleString("ru-RU")} ₽`).join(", ")} в месяц.
          </p>
        </div>
      </section>

      <section className="border-b border-line bg-surface-muted py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <SectionHeading eyebrow="FAQ" title="Вопросы об обслуживании" />
          <FaqAccordion items={maintenanceFaq} />
        </div>
      </section>

      <section id="form" className="scroll-mt-24 bg-surface py-12 md:py-16">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div>
            <SectionHeading
              eyebrow="Подключение"
              title="Возьмём ваш продукт на сопровождение"
              description="Опишите, что уже работает и что вызывает беспокойство: сервер, база, обновления или отсутствие резервных копий. Начнём с аудита."
            />
            <div className="mt-5 space-y-2 border-t border-line pt-4">
              {[
                "Что за проект и на чём он работает",
                "Где размещён и кто имеет доступ",
                "Что нужно контролировать в первую очередь",
              ].map((hint) => (
                <p key={hint} className="flex gap-2 text-[0.83rem] text-ink-muted">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-line-strong" aria-hidden />
                  {hint}
                </p>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-line bg-surface p-5 sm:p-7">
            <LeadForm defaultDirection="website-maintenance" />
          </div>
        </div>
      </section>
    </>
  );
}
