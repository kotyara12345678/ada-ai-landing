import { Check } from "lucide-react";
import { DemoForm } from "@/components/demo/demo-form";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/lib/site";

const promises = [
  "30 минут, без презентации на сорок слайдов",
  "Соберём дашборд на ваших источниках",
  "Отдадим доступ на 14 дней, карта не нужна",
];

export function Demo() {
  return (
    <section id="demo" className="relative overflow-hidden bg-cobalt text-white">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-[0.18]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 size-[520px] rounded-full bg-[radial-gradient(circle,rgba(217,243,107,0.22),transparent_65%)] blur-2xl"
      />

      <div className="shell relative grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
        <div className="md:col-span-5">
          <Reveal>
            <p className="label flex items-baseline gap-2.5 text-white/60">
              <span className="text-acid">06</span>
              Демо
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="h2 mt-4 text-white">
              Покажем DATUM
              <br />
              на ваших данных
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-white/70">
              Оставьте заявку — вернёмся с двумя вариантами времени и списком того, что нужно
              подготовить. Обычно это один ключ доступа.
            </p>
          </Reveal>

          <Reveal delay={0.14} className="mt-8 border-t border-white/20 pt-6">
            <ul className="space-y-2.5">
              {promises.map((promise) => (
                <li key={promise} className="flex items-start gap-2.5 text-[0.8125rem] text-white/80">
                  <Check className="mt-0.5 size-3.5 shrink-0 text-acid" aria-hidden="true" />
                  {promise}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[0.75rem] text-white/50">
              Или напрямую:{" "}
              <a href={`mailto:${site.demoEmail}`} className="text-white underline decoration-white/30 underline-offset-4">
                {site.demoEmail}
              </a>
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <div className="overflow-hidden rounded-xl bg-surface text-ink shadow-[0_30px_70px_-30px_rgba(9,14,47,0.55)]">
            <DemoForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
