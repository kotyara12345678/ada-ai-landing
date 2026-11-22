import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="relative border-b border-line py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="06"
          label="Процесс"
          title="Системный подход к разработке"
          description="Пять этапов, где каждый следующий опирается на результат предыдущего. Никакой разработки «по ощущениям»."
          aside={<span className="mono text-[0.5625rem] text-muted">Pipeline / 05 stages</span>}
        />

        <div className="relative mt-12 md:mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[7px] hidden h-px bg-[linear-gradient(90deg,rgba(0,184,121,0.5)_0%,rgba(163,255,112,0.35)_45%,rgba(255,255,255,0.08)_100%)] lg:block"
          />

          <ol className="grid gap-8 lg:grid-cols-5 lg:gap-0">
          {processSteps.map((step, index) => (
            <Reveal
              as="li"
              key={step.index}
              delay={index * 0.06}
              className="group relative border-t border-line pt-6 lg:border-t-0 lg:pr-6 lg:pt-8 lg:last:pr-0"
            >
              <span
                aria-hidden="true"
                className="absolute -top-[3px] left-0 hidden size-1.5 rounded-full bg-lime lg:block"
              />

              <div className="flex items-baseline gap-3">
                <span className="mono text-[0.5625rem] text-emerald">0{step.index}</span>
                <span className="mono text-[0.5rem] text-muted/60">stage</span>
              </div>

              <h3 className="mt-4 font-display text-[1.25rem] font-medium tracking-tight text-text">
                {step.name}
              </h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{step.text}</p>

              <p className="mono mt-5 border-t border-line pt-3 text-[0.5rem] leading-relaxed tracking-[0.16em] text-muted/70">
                → {step.output}
              </p>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
