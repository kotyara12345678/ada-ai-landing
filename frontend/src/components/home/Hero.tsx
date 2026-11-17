import { ArrowDown, ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { SystemDiagram } from "@/components/home/SystemDiagram";
import { heroMetrics } from "@/config/home";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-muted/15 pt-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-[0.55]" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(32,201,130,0.22), transparent 65%)" }}
        aria-hidden
      />

      <div className="container-page relative">
        <div className="grid items-start gap-12 pb-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16 lg:pb-20">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/5 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-emerald">
                <span className="size-1.5 rounded-full bg-emerald" aria-hidden />
                Разработка · AI · автоматизация
              </span>
            </div>

            <h1 className="mt-7 text-display text-bone">
              Ваши идеи.
              <br />
              <span className="text-gradient">Наши технологии.</span>
            </h1>

            <p className="mt-7 max-w-xl text-[1.02rem] leading-relaxed text-muted md:text-[1.08rem]">
              Разрабатываем сайты, программное обеспечение и AI-решения, которые автоматизируют процессы,
              упрощают работу и помогают бизнесу расти.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <LinkButton href="/contacts" size="lg" withArrow>
                Обсудить проект
              </LinkButton>
              <LinkButton href="#directions" variant="secondary" size="lg">
                Наши решения
              </LinkButton>
            </div>

            <p className="mt-8 flex items-start gap-2.5 text-[0.82rem] leading-relaxed text-muted/80">
              <span className="mt-2 h-px w-6 shrink-0 bg-emerald/60" aria-hidden />
              От идеи и технического проектирования до готового продукта
            </p>
          </div>

          <div className="lg:pt-2">
            <SystemDiagram />
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/60">
              <span>TypeScript</span>
              <span className="size-1 rounded-full bg-muted/30" aria-hidden />
              <span>Python</span>
              <span className="size-1 rounded-full bg-muted/30" aria-hidden />
              <span>PostgreSQL</span>
              <span className="size-1 rounded-full bg-muted/30" aria-hidden />
              <span>LLM API</span>
            </div>
          </div>
        </div>

        <div className="grid border-t border-muted/15 sm:grid-cols-2 lg:grid-cols-4">
          {heroMetrics.map((item, index) => (
            <div
              key={item.label}
              className={`flex items-center gap-3 py-5 ${
                index < 3 ? "lg:border-r lg:border-muted/15" : ""
              } ${index % 2 === 0 ? "sm:border-r sm:border-muted/15 lg:border-r" : ""} lg:px-6 lg:first:pl-0`}
            >
              <item.icon className="size-4 text-emerald/70" strokeWidth={1.5} aria-hidden />
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/60">
                  {item.label}
                </span>
                <span className="text-[0.84rem] text-bone/85">{item.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container-page">
        <a
          href="#directions"
          className="group flex items-center gap-2 py-5 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted/60 transition-colors hover:text-bone"
        >
          <ArrowDown className="size-3 transition-transform group-hover:translate-y-0.5" aria-hidden />
          Смотреть направления
          <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
        </a>
      </div>
    </section>
  );
}
