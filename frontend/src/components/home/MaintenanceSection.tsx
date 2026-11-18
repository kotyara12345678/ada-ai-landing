import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, DatabaseBackup, Headset } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import {
  formatPlanPrice,
  maintenanceInfrastructureNote,
  maintenancePlans,
  maintenanceSupportNote,
} from "@/config/maintenance";
import { cn } from "@/lib/utils";

export function MaintenanceSection() {
  return (
    <section id="maintenance" className="scroll-mt-24 bg-surface py-14 md:py-28">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-brand" aria-hidden />
              <p className="eyebrow">Обслуживание</p>
            </div>
            <h2 className="mt-4 max-w-xl text-h2 text-ink">
              Сайт уже работает? Пусть работает стабильно
            </h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-muted">
              Контроль доступности, обновления, резервные копии и SSL. Реагируем в рабочие часы —
              без обещаний круглосуточного дежурства.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <LinkButton href="/maintenance" variant="dark" withArrow>
              Все тарифы
            </LinkButton>
            <LinkButton href="/contacts" variant="secondary">
              Нужен аудит
            </LinkButton>
          </div>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-2xl md:mt-10">
          <Image
            src="/visuals/server-room.jpg"
            alt="Серверные стойки с оборудованием"
            width={1400}
            height={1000}
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="h-36 w-full object-cover md:h-64"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/80 to-ink-deep/10" />
          <div className="absolute inset-0 flex flex-col justify-center gap-2 p-5 md:gap-3 md:p-10">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-lime">
              Под контролем
            </p>
            <p className="max-w-md font-display text-[1.2rem] font-semibold leading-tight text-white md:text-[1.9rem]">
              Доступность · Бэкапы · Обновления · SSL
            </p>
            <p className="max-w-sm text-[0.82rem] leading-relaxed text-white/55">
              Настраиваем контур один раз и ведём его по регламенту тарифа.
            </p>
          </div>
        </div>

        <div className="hide-scrollbar -mx-5 mt-3 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pb-1 md:mx-0 md:mt-4 md:grid md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-3">
          {maintenancePlans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border p-5 md:w-auto md:p-6",
                plan.popular
                  ? "border-ink-deep bg-ink-deep text-white"
                  : "border-line bg-surface",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className={cn("font-display text-[1.15rem] font-semibold", plan.popular ? "text-white" : "text-ink")}>
                  {plan.name}
                </h3>
                {plan.popular ? (
                  <span className="rounded-full bg-lime px-2.5 py-1 text-[0.64rem] font-bold uppercase tracking-[0.08em] text-ink">
                    Выбирают
                  </span>
                ) : (
                  <span className={cn("text-[0.72rem]", plan.popular ? "text-white/50" : "text-ink-muted")}>
                    тариф
                  </span>
                )}
              </div>

              <p className={cn("mt-1.5 text-[0.84rem] leading-snug md:mt-2 md:min-h-10", plan.popular ? "text-white/55" : "text-ink-muted")}>
                {plan.tagline}
              </p>

              <p className={cn("mt-3 font-display text-[1.85rem] font-semibold tracking-tight md:mt-4 md:text-[2rem]", plan.popular ? "text-lime" : "text-ink")}>
                {formatPlanPrice(plan.price)}
                <span className={cn("ml-1 text-[0.8rem] font-medium", plan.popular ? "text-white/50" : "text-ink-muted")}>
                  /мес
                </span>
              </p>

              <ul className={cn("mt-4 flex flex-col gap-2 border-t pt-4 md:mt-5 md:gap-2.5 md:pt-5", plan.popular ? "border-white/10" : "border-line")}>
                {[
                  { icon: Clock, text: plan.hours },
                  { icon: DatabaseBackup, text: plan.backups },
                  { icon: Headset, text: plan.support },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex gap-2.5">
                    <Icon className={cn("mt-0.5 size-3.5 shrink-0", plan.popular ? "text-lime" : "text-brand")} aria-hidden />
                    <span className={cn("text-[0.8rem] leading-snug", plan.popular ? "text-white/65" : "text-ink-muted")}>
                      {text}
                    </span>
                  </li>
                ))}
              </ul>

              <ul className={cn("mt-3 flex flex-col gap-1.5 border-t pt-3 md:mt-4 md:gap-2 md:pt-4", plan.popular ? "border-white/10" : "border-line")}>
                {plan.includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className={cn("mt-0.5 size-3.5 shrink-0", plan.popular ? "text-lime" : "text-success")} aria-hidden />
                    <span className={cn("text-[0.8rem] leading-snug", plan.popular ? "text-white/70" : "text-ink-muted")}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-4 md:pt-5">
                <Link
                  href="/maintenance"
                  className={cn(
                    "inline-flex items-center gap-1 text-[0.84rem] font-semibold",
                    plan.popular ? "text-lime hover:text-white" : "text-brand hover:text-brand-dark",
                  )}
                >
                  Что входит в тариф
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-2 text-[0.76rem] leading-relaxed text-ink-muted md:grid-cols-2">
          <p>{maintenanceInfrastructureNote}</p>
          <p>{maintenanceSupportNote}</p>
        </div>
      </div>
    </section>
  );
}
