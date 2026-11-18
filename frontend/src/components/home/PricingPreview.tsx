import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { formatPrice, priceItems, pricingNotes } from "@/config/pricing";
import { cn } from "@/lib/utils";

const planIds = ["landing", "corporate-site", "web-app"];

export function PricingPreview() {
  const plans = planIds.flatMap((id) => priceItems.filter((item) => item.id === id));

  return (
    <section id="prices" className="scroll-mt-24 bg-surface-muted py-14 md:py-28">
      <div className="container-page">
        <SectionHeading
          eyebrow="Пакеты разработки"
          title="Понятные пакеты. Без скрытых строк."
          description="Стартовая стоимость типового объёма. Точную смету фиксируем после брифа — бесплатно и без обязательств."
          align="between"
        />

        <div className="hide-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory scroll-px-5 gap-3 overflow-x-auto overscroll-x-contain px-5 pb-1 pt-4 md:mx-0 md:mt-10 md:grid md:gap-4 md:overflow-visible md:px-0 md:pt-0 lg:grid-cols-3">
          {plans.map((plan, index) => {
            const featured = index === 1;
            return (
              <div
                key={plan.id}
                className={cn(
                  "relative flex w-[86%] shrink-0 snap-start flex-col rounded-2xl border p-5 md:w-auto md:p-7",
                  plan.id === "landing" && "border-lime/70 ring-1 ring-lime/40",
                  featured
                    ? "border-ink-deep bg-ink-deep text-white shadow-panel"
                    : "border-line bg-surface",
                )}
              >
                {plan.id === "landing" ? (
                  <span className="absolute -top-3 right-5 -rotate-3 rounded-full bg-lime px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.06em] text-ink shadow-[0_8px_20px_-10px_rgba(0,0,0,0.7)]">
                    −30% на лендинг
                  </span>
                ) : null}
                <div className="flex items-center justify-between gap-3">
                  <p
                    className={cn(
                      "text-[0.72rem] font-semibold uppercase tracking-[0.14em]",
                      featured ? "text-lime" : "text-ink-muted",
                    )}
                  >
                    {plan.title}
                  </p>
                  {featured ? (
                    <span className="rounded-full bg-lime px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.08em] text-ink">
                      Чаще всего
                    </span>
                  ) : (
                    <span className="text-[0.72rem] text-ink-muted">0{index + 1}</span>
                  )}
                </div>

                <p
                  className={cn(
                    "mt-4 font-display text-[1.85rem] font-semibold tracking-tight md:mt-5 md:text-[2rem]",
                    featured ? "text-white" : "text-ink",
                  )}
                >
                  {formatPrice(plan.price)}
                </p>
                <p className={cn("mt-2 text-[0.9rem] leading-relaxed", featured ? "text-white/55" : "text-ink-muted")}>
                  {plan.summary}
                </p>

                {plan.id === "landing" ? (
                  <p className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-md bg-lime/15 px-2.5 py-1 text-[0.76rem] font-semibold text-ink">
                    Скидку 30% применяем в смете на этот пакет
                  </p>
                ) : null}

                <ul className={cn("mt-5 flex flex-col gap-2 border-t pt-5 md:mt-6 md:gap-2.5 md:pt-6", featured ? "border-white/10" : "border-line")}>
                  {plan.details.map((detail) => (
                    <li key={detail} className="flex gap-2.5">
                      <Check
                        className={cn("mt-0.5 size-4 shrink-0", featured ? "text-lime" : "text-brand")}
                        aria-hidden
                      />
                      <span className={cn("text-[0.85rem] leading-snug", featured ? "text-white/70" : "text-ink-muted")}>
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-5 md:pt-7">
                  <LinkButton
                    href="/contacts"
                    variant={featured ? "lime" : "secondary"}
                    withArrow
                    className="w-full"
                  >
                    Обсудить проект
                  </LinkButton>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4 rounded-xl border border-line bg-surface p-5 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="text-[0.9rem] font-semibold text-ink">
              Нужен другой объём: веб-приложение, AI, интеграции?
            </p>
            <p className="mt-1 text-[0.82rem] text-ink-muted">
              {pricingNotes[0]} {pricingNotes[2]}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-ink hover:text-brand"
            >
              Полный прайс-лист
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
            <Link
              href="/maintenance"
              className="inline-flex items-center gap-1 text-[0.85rem] font-semibold text-brand hover:text-brand-dark"
            >
              Поддержка от 1 490 ₽/мес
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
