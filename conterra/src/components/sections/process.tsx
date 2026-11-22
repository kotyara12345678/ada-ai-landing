import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { processSteps } from "@/lib/content";

/** Этапы — последовательность с общей линией, а не набор карточек. */
export function ProcessSection() {
  return (
    <section
      id="process"
      className="border-b border-line bg-canvas py-14 md:py-20"
      aria-labelledby="process-title"
    >
      <div className="shell">
        <SectionHead
          index="03"
          eyebrow="Этапы работы"
          title="Понятный процесс вместо переговоров «по ходу»"
          description="На каждом этапе есть результат, который можно проверить, и решение, которое нужно согласовать до перехода дальше."
        />

        <h2 id="process-title" className="sr-only">
          Этапы работы
        </h2>

        <ol className="mt-10 grid gap-0 border-t border-line md:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.index}
              delay={index * 0.06}
              className="relative border-b border-line py-6 md:border-b-0 md:border-r md:py-8 md:pr-6 md:last:border-r-0 lg:pr-8"
            >
              <span
                aria-hidden="true"
                className="absolute -top-[3px] left-0 hidden size-1.5 bg-teal md:block"
              />
              <div className="flex items-baseline justify-between gap-3">
                <span className="eyebrow text-teal">{step.index}</span>
                <span className="text-[0.6875rem] text-muted md:hidden">Этап</span>
              </div>

              <h3 className="mt-4 font-display text-[1.125rem] font-medium leading-snug tracking-tight text-graphite lg:text-[1.25rem]">
                {step.name}
              </h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-graphite/70">{step.summary}</p>

              <ul className="mt-4 space-y-1.5">
                {step.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-[0.8125rem] leading-snug text-graphite/60">
                    <span className="mt-1.5 size-1 shrink-0 bg-line" aria-hidden="true" />
                    {detail}
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-line pt-3 text-[0.75rem] leading-snug text-navy/80">
                <span className="text-muted">Результат: </span>
                {step.output}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
