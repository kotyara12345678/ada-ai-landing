import { ArrowUpRight, Plus } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { integrations } from "@/lib/content";

export function Integrations() {
  return (
    <section id="integrations" className="border-b border-line bg-paper">
      <div className="shell grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
        <div className="md:col-span-4">
          <p className="label flex items-baseline gap-2.5 text-muted">
            <span className="text-cobalt">03</span>
            Интеграции
          </p>
          <h2 className="h2 mt-4">
            Данные уже
            <br />
            где-то лежат
          </h2>
          <p className="lead mt-4 max-w-sm text-[0.875rem]">
            Подключите базу, платежи и рекламу — DATUM сам приведёт события к общему виду и
            посчитает метрики.
          </p>
          <a
            href="#demo"
            className="mt-6 inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-cobalt transition-colors hover:text-cobalt-deep"
          >
            Обсудить свой источник
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="md:col-span-8">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {integrations.map((integration, index) => (
              <Reveal
                key={integration.name}
                delay={index * 0.03}
                className="card flex min-h-[96px] flex-col justify-between p-3.5 transition-colors hover:border-cobalt/40"
              >
                <span className="grid size-7 place-items-center rounded-md border border-line bg-paper font-display text-[0.625rem] font-bold uppercase text-ink/70">
                  {integration.name.slice(0, 2)}
                </span>
                <div>
                  <p className="text-[0.8125rem] font-medium leading-tight text-ink">{integration.name}</p>
                  <p className="mt-0.5 text-[0.625rem] text-muted">{integration.kind}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-2.5 flex items-center justify-between gap-4 rounded-xl border border-dashed border-line-strong px-4 py-3">
            <p className="text-[0.75rem] text-muted">
              Нет нужного коннектора? Подключите любой источник через REST API.
            </p>
            <span className="flex shrink-0 items-center gap-1 text-[0.6875rem] font-medium text-cobalt">
              <Plus className="size-3.5" aria-hidden="true" />
              40+
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
