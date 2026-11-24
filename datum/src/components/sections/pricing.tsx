"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { plans } from "@/lib/content";
import { cn } from "@/lib/utils";

type Billing = "monthly" | "yearly";

function formatPrice(value: number) {
  return `${value.toLocaleString("ru-RU")} ₽`;
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly");

  return (
    <section id="pricing" className="shell py-16 md:py-24">
      <SectionHead
        index="04"
        label="Тарифы"
        title="Платите за команду, а не за события"
        description="Все тарифы включают шаблоны дашбордов, экспорт и поддержку. Пробный период — 14 дней."
        aside={
          <div className="inline-flex rounded-lg border border-line-strong bg-white p-1">
            {(
              [
                { id: "monthly", label: "Ежемесячно" },
                { id: "yearly", label: "За год −20%" },
              ] as const
            ).map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setBilling(option.id)}
                aria-pressed={billing === option.id}
                className={cn(
                  "rounded-md px-3 py-1.5 text-[0.75rem] font-medium transition-colors",
                  billing === option.id ? "bg-ink text-white" : "text-muted hover:text-ink",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        }
      />

      <div className="mt-10 grid gap-3 md:mt-12 lg:grid-cols-3">
        {plans.map((plan, index) => {
          const price = billing === "monthly" ? plan.monthly : plan.yearly;
          const highlighted = Boolean(plan.highlighted);

          return (
            <Reveal
              key={plan.id}
              delay={index * 0.06}
              className={cn(
                "relative flex flex-col rounded-xl border p-6",
                highlighted
                  ? "border-ink bg-ink text-paper shadow-[0_30px_60px_-40px_rgba(15,18,16,0.9)]"
                  : "border-line bg-surface",
              )}
            >
              {highlighted ? (
                <span className="label absolute -top-2.5 left-6 rounded-full bg-acid px-2.5 py-1 text-[0.5rem] tracking-[0.08em] text-ink">
                  Популярный
                </span>
              ) : null}

              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-[1.1875rem] font-semibold">{plan.name}</h3>
                <span className={cn("text-[0.6875rem]", highlighted ? "text-paper/50" : "text-muted")}>
                  {plan.note}
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-1.5">
                {price === null ? (
                  <span className="font-display text-[2rem] font-semibold leading-none">По запросу</span>
                ) : (
                  <>
                    <span className="font-display text-[2.4rem] font-semibold leading-none tabular-nums">
                      {formatPrice(price)}
                    </span>
                    {price > 0 ? (
                      <span className={cn("text-[0.75rem]", highlighted ? "text-paper/50" : "text-muted")}>
                        / мес
                      </span>
                    ) : (
                      <span className={cn("text-[0.75rem]", highlighted ? "text-paper/50" : "text-muted")}>
                        навсегда
                      </span>
                    )}
                  </>
                )}
              </div>
              <p className={cn("mt-1.5 text-[0.6875rem]", highlighted ? "text-paper/45" : "text-muted")}>
                {price && price > 0
                  ? billing === "yearly"
                    ? "При оплате за год, списание раз в 12 месяцев"
                    : "Без ограничения по объёму событий"
                  : price === 0
                    ? "Без карты и срока"
                    : "Считаем по числу команд и источников"}
              </p>

              <ul className={cn("mt-7 space-y-2.5 border-t pt-6", highlighted ? "border-paper/15" : "border-line")}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-[0.8125rem] leading-snug">
                    <Check
                      className={cn("mt-0.5 size-3.5 shrink-0", highlighted ? "text-acid" : "text-cobalt")}
                      aria-hidden="true"
                    />
                    <span className={highlighted ? "text-paper/80" : "text-ink/80"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#demo"
                className={cn(
                  "btn mt-7 w-full",
                  highlighted ? "bg-white text-ink hover:bg-acid" : "btn-ghost",
                )}
              >
                {plan.cta}
              </a>
            </Reveal>
          );
        })}
      </div>

      <p className="mt-5 text-[0.75rem] text-muted">
        Цены демонстрационные. НДС включён, счёт для юрлиц — в личном кабинете.
      </p>
    </section>
  );
}
