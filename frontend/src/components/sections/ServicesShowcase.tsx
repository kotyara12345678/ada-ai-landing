import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { developmentDirections } from "@/config/services";
import { formatRub, cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

const tones = [
  {
    card: "border-line bg-surface hover:border-brand/40",
    number: "text-brand",
    title: "text-ink",
    text: "text-ink-muted",
    price: "text-ink",
    arrow: "text-ink-muted",
  },
  {
    card: "border-ink-deep bg-ink-deep hover:border-ink-deep",
    number: "text-lime",
    title: "text-white",
    text: "text-white/55",
    price: "text-lime",
    arrow: "text-white/40",
  },
  {
    card: "border-lime bg-lime hover:border-lime",
    number: "text-ink/45",
    title: "text-ink",
    text: "text-ink/65",
    price: "text-ink",
    arrow: "text-ink/50",
  },
  {
    card: "border-tint-blue bg-tint-blue hover:border-brand/30",
    number: "text-brand",
    title: "text-ink",
    text: "text-ink-muted",
    price: "text-ink",
    arrow: "text-ink-muted",
  },
  {
    card: "border-line bg-surface hover:border-brand/40",
    number: "text-brand",
    title: "text-ink",
    text: "text-ink-muted",
    price: "text-ink",
    arrow: "text-ink-muted",
  },
  {
    card: "border-tint-teal bg-tint-teal hover:border-accent-teal/40",
    number: "text-accent-teal",
    title: "text-ink",
    text: "text-ink-muted",
    price: "text-ink",
    arrow: "text-ink-muted",
  },
];

export function ServicesShowcase() {
  return (
    <section id="services" className="scroll-mt-24 bg-surface py-14 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-brand" aria-hidden />
              <p className="eyebrow">Что мы делаем</p>
            </div>
            <h2 className="mt-4 text-h2 text-ink">
              Один подрядчик на весь цифровой продукт
            </h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-muted">
              От лендинга до AI-агента и серверов. Начните с одной задачи — остальное подключим,
              когда продукт будет готов к росту.
            </p>
          </div>
          <LinkButton href="/pricing" variant="secondary" withArrow className="shrink-0">
            Все услуги и цены
          </LinkButton>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {developmentDirections.map((direction, index) => {
            const tone = tones[index % tones.length];
            return (
              <Link
                key={direction.slug}
                href={`/${direction.slug}`}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card md:min-h-[15.5rem] md:p-7",
                  tone.card,
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={cn(
                      "font-display text-[0.82rem] font-semibold tracking-[0.18em]",
                      tone.number,
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    className={cn(
                      "size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      tone.arrow,
                    )}
                    aria-hidden
                  />
                </div>

                <div>
                  <h3 className={cn("text-h3 font-semibold", tone.title)}>{direction.name}</h3>
                  <p className={cn("mt-2 text-[0.88rem] leading-relaxed", tone.text)}>
                    {direction.short}
                  </p>
                  <p className={cn("mt-5 text-[0.8rem] font-semibold", tone.price)}>
                    {formatRub(direction.priceFrom)}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        <p className="mt-5 text-[0.8rem] text-ink-muted">
          Не знаете, какое направление нужно?{" "}
          <Link href="/contacts" className="font-semibold text-brand hover:text-brand-dark">
            Опишите задачу
          </Link>{" "}
          — предложим формат и назовём стоимость.
        </p>
      </div>
    </section>
  );
}
