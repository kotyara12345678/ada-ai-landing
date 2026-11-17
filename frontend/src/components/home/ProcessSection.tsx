import { SectionHeading } from "@/components/ui/SectionHeading";
import { stages } from "@/config/home";
import { Reveal } from "@/components/ui/Reveal";

export function ProcessSection() {
  return (
    <section className="border-y border-muted/15 bg-graphite py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          index="05"
          eyebrow="Как мы работаем"
          title="От разбора задачи до передачи продукта"
          description="Шесть этапов с понятным результатом на каждом. Вы всегда знаете, на какой стадии проект и что будет дальше."
          align="between"
        />

        <ol className="mt-12 grid gap-y-0 md:mt-16 md:grid-cols-2 md:gap-x-14">
          {stages.map((stage, index) => (
            <Reveal key={stage.step} delay={index * 0.04} as="li">
              <div className="group relative flex gap-5 border-t border-muted/20 py-6 md:gap-7">
                <div className="flex flex-col items-center gap-2">
                  <span className="font-mono text-[0.72rem] text-emerald/80 tabular-nums">{stage.step}</span>
                  <span className="w-px flex-1 bg-gradient-to-b from-emerald/40 to-transparent" aria-hidden />
                </div>
                <div className="pb-2">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-[1.08rem] font-medium text-bone">{stage.title}</h3>
                    <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted/50">
                      {stage.duration}
                    </span>
                  </div>
                  <p className="mt-2 max-w-md text-[0.87rem] leading-relaxed text-muted">{stage.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
