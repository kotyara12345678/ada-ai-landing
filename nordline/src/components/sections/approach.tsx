import { ArrowRight } from "lucide-react";
import { steps } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";

export function Approach() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="shell">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-4">
              <span className="label text-accent">05</span>
              <span className="label text-graphite/75">Инженерный подход</span>
            </div>
            <h2 className="display mt-6 max-w-[22ch] text-[clamp(2rem,4.2vw,4.25rem)]">
              Не просто поставка. Решение производственной задачи
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 lg:pt-12">
            <p className="max-w-sm text-[0.9375rem] leading-relaxed text-graphite/75">
              Четыре этапа, которые проходят одинаково — от одной позиции до комплексной
              комплектации участка.
            </p>
          </div>
        </Reveal>

        <ol className="mt-14 grid gap-px border-t border-graphite/15 md:mt-20 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.index}
              className="relative border-b border-graphite/15 pb-8 pt-7 lg:border-b-0 lg:pr-8"
            >
              <Reveal delay={index * 0.08}>
                <span
                  className="absolute left-0 top-0 hidden h-px w-12 bg-accent lg:block"
                  aria-hidden="true"
                />
                <div className="flex items-baseline justify-between gap-3">
                  <span className="label text-accent">{step.index}</span>
                  {index < steps.length - 1 ? (
                    <ArrowRight className="h-4 w-4 text-graphite/25" aria-hidden="true" />
                  ) : null}
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight md:text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-graphite/75">{step.text}</p>
                <div className="mt-6 flex items-center gap-2 border-t border-graphite/10 pt-3">
                  <span className="label text-[0.5rem] text-graphite/70">Результат</span>
                  <span className="text-[0.8125rem] font-semibold">{step.result}</span>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <p className="label mt-8 max-w-3xl text-[0.5625rem] leading-relaxed tracking-[0.1em] text-graphite/70">
          Состав работ, сроки и стоимость определяются после анализа задачи и спецификации.
        </p>
      </div>
    </section>
  );
}
