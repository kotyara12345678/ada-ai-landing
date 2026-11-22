import { ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative border-b border-line py-14 md:py-20" aria-labelledby="final-cta-title">
      <div className="shell">
        <div className="relative isolate overflow-hidden rounded-2xl border border-line px-6 py-12 md:px-14 md:py-16">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(120% 140% at 12% 0%, rgba(0,184,121,0.28) 0%, rgba(8,11,9,0) 55%), radial-gradient(90% 120% at 88% 100%, rgba(163,255,112,0.18) 0%, rgba(8,11,9,0) 60%), linear-gradient(160deg, #0c1310 0%, #080b09 70%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:64px_64px]"
          />

          <svg
            aria-hidden="true"
            viewBox="0 0 600 300"
            className="pointer-events-none absolute -right-16 top-1/2 hidden h-[130%] w-[46%] -translate-y-1/2 opacity-60 md:block"
            fill="none"
          >
            <g stroke="rgba(163,255,112,0.35)">
              <circle cx="330" cy="150" r="70" />
              <circle cx="330" cy="150" r="110" opacity="0.6" />
              <circle cx="330" cy="150" r="150" opacity="0.3" />
              <path d="M148 150h364" opacity="0.25" strokeDasharray="2 8" />
              <path d="M330 0v300" opacity="0.2" strokeDasharray="2 8" />
            </g>
            <circle cx="330" cy="150" r="4" fill="#CBFF9B" />
          </svg>

          <p className="mono text-lime">09 / Start</p>

          <h2 id="final-cta-title" className="mt-6 max-w-[18ch] text-[clamp(2rem,5vw,4.25rem)] font-display font-medium leading-[1] tracking-[-0.04em]">
            Есть задача.
            <br />
            Создадим <span className="accent-text">решение</span>.
          </h2>

          <p className="lead mt-5 max-w-lg text-[0.9375rem]">
            Расскажите о своём проекте. Мы поможем определить архитектуру, подход и следующий шаг.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#contact" className="btn btn-primary group">
              Начать проект
              <ArrowUpRight
                className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={`mailto:${site.demoEmail}`}
              className="mono text-[0.5625rem] tracking-[0.18em] text-muted transition-colors hover:text-text"
            >
              {site.demoEmail}
            </a>
          </div>

          <div className="mono mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 text-[0.5rem] tracking-[0.18em] text-muted/60">
            <span>Response: 1 business day</span>
            <span>NDA: on request</span>
            <span>Remote / RU</span>
          </div>
        </div>
      </div>
    </section>
  );
}
