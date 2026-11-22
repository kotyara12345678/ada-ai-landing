import { ArrowRight } from "lucide-react";
import { systemFlow } from "@/lib/content";

/** Схема: объект проходит пять состояний, от задачи бизнеса до эксплуатации. */
export function SystemMap() {
  return (
    <section className="bg-navy py-14 text-white md:py-20" aria-labelledby="system-map-title">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow text-teal">Схема работы</p>
            <h2 id="system-map-title" className="h2 mt-4 max-w-[16ch] text-white">
              Один объект — пять состояний
            </h2>
          </div>
          <p className="max-w-xl text-[0.9375rem] leading-relaxed text-white/60 md:col-span-6 md:col-start-7 md:pt-3">
            Каждое следующее состояние опирается на предыдущее: изменения в проекте видны в
            стройке, а решения по эксплуатации закладываются ещё на этапе концепции.
          </p>
        </div>

        <ol className="mt-12 grid gap-0 border-t border-white/20 md:grid-cols-5">
          {systemFlow.map((node, index) => {
            const last = index === systemFlow.length - 1;
            return (
              <li
                key={node.index}
                className="relative border-b border-white/12 py-6 pr-6 md:border-b-0 md:border-r md:border-white/12 md:py-8 md:last:border-r-0"
              >
                <span
                  aria-hidden="true"
                  className={`absolute -top-[3px] left-0 hidden size-1.5 md:block ${last ? "bg-teal" : "bg-white/60"}`}
                />
                <div className="flex items-center justify-between gap-2">
                  <span className={`eyebrow ${last ? "text-teal" : "text-white/45"}`}>{node.index}</span>
                  {!last ? (
                    <ArrowRight className="hidden size-3.5 text-white/25 md:block" aria-hidden="true" />
                  ) : null}
                </div>
                <h3 className="mt-4 font-display text-[1.0625rem] font-medium leading-snug tracking-tight text-white">
                  {node.label}
                </h3>
                <p className="mt-1.5 text-[0.8125rem] leading-snug text-white/50">{node.note}</p>
              </li>
            );
          })}
        </ol>

        <p className="mt-8 max-w-2xl text-[0.75rem] leading-relaxed text-white/40">
          Схема описывает подход компании в демонстрационном концепте: конкретный состав этапов
          определяется задачей, объектом и объёмом работ.
        </p>
      </div>
    </section>
  );
}
