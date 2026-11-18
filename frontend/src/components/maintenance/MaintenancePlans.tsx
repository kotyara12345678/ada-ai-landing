import Link from "next/link";
import { Check, Minus } from "lucide-react";
import {
  formatPlanPrice,
  maintenancePlans,
  type MaintenancePlan,
} from "@/config/maintenance";
import { cn } from "@/lib/utils";

type Props = {
  plans?: MaintenancePlan[];
  /** Скрыть длинные списки ограничений (для главной) */
  compact?: boolean;
  className?: string;
};

export function MaintenancePlans({ plans = maintenancePlans, compact = false, className }: Props) {
  return (
    <div className={cn("grid gap-4 lg:grid-cols-3", className)}>
      {plans.map((plan) => (
        <div
          key={plan.id}
          className={cn(
            "flex flex-col rounded-xl border bg-surface p-5 sm:p-6",
            plan.popular ? "border-brand shadow-card" : "border-line",
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display text-[1.1rem] font-semibold text-ink">{plan.name}</h3>
            {plan.popular ? (
              <span className="rounded-md bg-brand-soft px-2 py-1 text-[0.68rem] font-medium text-brand">
                Популярный
              </span>
            ) : null}
          </div>

          <p className="mt-2 min-h-[2.6rem] text-[0.83rem] leading-relaxed text-ink-muted">
            {plan.tagline}
          </p>

          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="font-display text-[1.9rem] font-semibold tracking-tight text-ink">
              {formatPlanPrice(plan.price)}
            </span>
            <span className="text-[0.82rem] text-ink-muted">/ месяц</span>
          </div>

          <dl className="mt-4 grid gap-2 rounded-lg bg-surface-muted p-3 text-[0.79rem]">
            <div className="flex justify-between gap-3">
              <dt className="text-ink-muted">Работы</dt>
              <dd className="text-right font-medium text-ink">{plan.hours}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-ink-muted">Бэкапы</dt>
              <dd className="text-right font-medium text-ink">{plan.backups}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="shrink-0 text-ink-muted">Поддержка</dt>
              <dd className="text-right font-medium text-ink">{plan.support}</dd>
            </div>
          </dl>

          <ul className="mt-4 flex flex-col gap-2">
            {plan.includes.map((item) => (
              <li key={item} className="flex gap-2 text-[0.82rem] leading-snug text-ink">
                <Check className="mt-0.5 size-3.5 shrink-0 text-success" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          {!compact ? (
            <div className="mt-4 border-t border-line pt-3">
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.08em] text-ink-muted">
                Ограничения
              </p>
              <ul className="mt-2 flex flex-col gap-1.5">
                {plan.limits.map((item) => (
                  <li key={item} className="flex gap-2 text-[0.79rem] leading-snug text-ink-muted">
                    <Minus className="mt-1 size-3 shrink-0" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="mt-5 flex-1" />
          <Link
            href={`/contacts?direction=${plan.id === "basic" ? "website-maintenance" : "server-administration"}`}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-lg text-[0.86rem] font-medium transition-colors",
              plan.popular
                ? "bg-brand text-white hover:bg-brand-dark"
                : "border border-line-strong text-ink hover:border-brand hover:text-brand",
            )}
          >
            Подключить {plan.name}
          </Link>
        </div>
      ))}
    </div>
  );
}
