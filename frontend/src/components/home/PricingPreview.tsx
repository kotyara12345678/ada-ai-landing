import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { featuredPrices, formatPrice, pricingNotes } from "@/config/pricing";
import { Reveal } from "@/components/ui/Reveal";

export function PricingPreview() {
  const items = featuredPrices();

  return (
    <section className="bg-bone py-16 text-graphite md:py-24">
      <div className="container-page">
        <SectionHeading
          tone="light"
          index="04"
          eyebrow="Услуги и цены"
          title="Понятные стартовые цены"
          description="Ниже — минимальная стоимость типового объёма. Итог зависит от задачи: количества экранов, интеграций и требований к надёжности."
          align="between"
        />

        <div className="mt-10 grid border-t border-graphite/15 md:mt-14">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.03}>
              <div className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-b border-graphite/15 py-4 transition-colors hover:bg-graphite/[0.025] md:grid-cols-[2.2fr_3fr_auto] md:items-center md:px-2">
                <div className="flex items-baseline gap-3">
                  <span className="hidden font-mono text-[0.62rem] text-graphite/30 md:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[0.98rem] font-medium text-graphite">{item.title}</h3>
                </div>
                <p className="col-span-2 text-[0.82rem] leading-relaxed text-graphite/55 md:col-span-1 md:pr-6">
                  {item.summary}
                </p>
                <div className="text-right">
                  <span className="whitespace-nowrap font-mono text-[0.8rem] text-graphite">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <ul className="max-w-2xl space-y-1.5">
            {pricingNotes.slice(0, 2).map((note) => (
              <li key={note} className="flex gap-2.5 text-[0.78rem] leading-relaxed text-graphite/50">
                <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#0c8a58]" aria-hidden />
                {note}
              </li>
            ))}
          </ul>
          <div className="flex shrink-0 items-center gap-3">
            <LinkButton href="/pricing" variant="light" withArrow>
              Полный прайс-лист
            </LinkButton>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-t border-graphite/15 pt-4">
          {["Смета до старта", "Оплата по этапам", "Оценка бесплатно"].map((item) => (
            <span key={item} className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-graphite/40">
              {item}
            </span>
          ))}
          <Link
            href="/contacts"
            className="ml-auto inline-flex items-center gap-1 font-mono text-[0.66rem] uppercase tracking-[0.12em] text-[#0c8a58] hover:underline"
          >
            Получить оценку
            <ArrowUpRight className="size-3" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
