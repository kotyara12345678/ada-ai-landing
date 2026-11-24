import { Reveal } from "@/components/ui/reveal";
import { steps } from "@/lib/content";

export function Workflow() {
  return (
    <section id="how" className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-[460px] rounded-full bg-[radial-gradient(circle,rgba(43,65,234,0.55),transparent_65%)] blur-2xl"
      />

      <div className="shell relative py-16 md:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="label flex items-baseline gap-2.5 text-paper/50">
              <span className="text-acid">02</span>
              Как это работает
            </p>
            <h2 className="h2 mt-4 text-paper">
              От подключения
              <br />
              до первого инсайта
            </h2>
          </div>
          <p className="max-w-xs text-[0.875rem] leading-relaxed text-paper/55">
            Один вечер, три шага и никакого отдельного хранилища, которое нужно поддерживать.
          </p>
        </div>

        <div className="mt-12 grid gap-px border-t border-paper/15 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal
              key={step.index}
              delay={index * 0.08}
              className="border-b border-paper/15 py-7 md:border-b-0 md:border-r md:px-8 md:py-9 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-[2rem] font-semibold leading-none text-acid">
                  {step.index}
                </span>
                <span className="label rounded-full border border-paper/20 px-2.5 py-1 text-[0.5rem] tracking-[0.06em] text-paper/55">
                  {step.meta}
                </span>
              </div>
              <h3 className="mt-6 font-display text-[1.25rem] font-semibold tracking-[-0.02em] text-paper">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-[0.875rem] leading-relaxed text-paper/55">{step.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-10 flex flex-col gap-4 rounded-xl border border-paper/15 bg-paper/[0.04] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-acid font-display text-[0.8125rem] font-bold text-ink">
              40′
            </span>
            <p className="text-[0.875rem] text-paper/80">
              Средний срок до первого рабочего дашборда — 40 минут.
            </p>
          </div>
          <p className="text-[0.75rem] text-paper/45">По данным онбординга демо-клиентов</p>
        </Reveal>
      </div>
    </section>
  );
}
