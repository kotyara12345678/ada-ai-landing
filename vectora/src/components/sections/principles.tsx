import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { principles } from "@/lib/content";

export function Principles() {
  return (
    <section className="relative border-b border-line bg-deep/30 py-16 md:py-24" aria-labelledby="principles-title">
      <div className="shell">
        <SectionHead
          index="07"
          label="Принципы"
          title="Технические характеристики подхода"
          description="Не обещания в цифрах, а свойства системы, которые можно проверить в архитектуре и коде."
          aside={<span className="mono text-[0.5625rem] text-muted">Telemetry / 05 signals</span>}
        />

        <h2 id="principles-title" className="sr-only">
          Технические принципы
        </h2>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-14 lg:grid-cols-5">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.code}
              delay={index * 0.05}
              className="group relative overflow-hidden rounded-xl border border-line bg-surface/45 p-5 transition-colors hover:border-lime/35 hover:bg-surface/70"
            >
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 size-1.5 rounded-full bg-white/15 transition-colors group-hover:bg-lime"
              />
              <p className="mono text-[0.5rem] tracking-[0.22em] text-emerald/75">{principle.code}</p>
              <h3 className="mt-4 font-display text-[1.0625rem] font-medium tracking-tight text-text">
                {principle.name}
              </h3>
              <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{principle.text}</p>

              <span
                aria-hidden="true"
                className="mono mt-5 block border-t border-line pt-3 text-[0.5rem] tracking-[0.2em] text-muted/45"
              >
                signal / {String(index + 1).padStart(2, "0")}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
