import {
  Activity,
  Bell,
  Braces,
  Layers,
  ShieldCheck,
  Webhook,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { features } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  pulse: Activity,
  segments: Layers,
  bell: Bell,
  sql: Braces,
  shield: ShieldCheck,
  api: Webhook,
};

export function Features() {
  return (
    <section id="product" className="shell py-16 md:py-24">
      <SectionHead
        index="01"
        label="Продукт"
        title={
          <>
            Дашборд, который не нужно
            <br />
            собирать вручную
          </>
        }
        description="Шесть вещей, из-за которых команды переезжают с таблиц и самописных скриптов."
        aside={
          <a href="#demo" className="btn btn-ghost h-10 min-h-0 text-[0.8125rem]">
            Открыть демо
          </a>
        }
      />

      <div className="mt-10 grid gap-3 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = icons[feature.icon];
          return (
            <Reveal
              key={feature.title}
              delay={index * 0.05}
              className={cn("card flex flex-col p-5 md:p-6", feature.wide ? "lg:col-span-2" : "")}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="grid size-9 place-items-center rounded-lg bg-cobalt-soft text-cobalt">
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="mono text-[0.5625rem] text-muted">0{index + 1}</span>
              </div>

              <h3 className="h3 mt-5">{feature.title}</h3>
              <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-muted">{feature.text}</p>

              {feature.icon === "pulse" ? (
                <div className="mt-auto pt-6">
                  <svg viewBox="0 0 400 60" className="h-14 w-full" role="img" aria-label="Рост метрики за двенадцать недель">
                    <defs>
                      <linearGradient id="datum-spark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-cobalt)" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="var(--color-cobalt)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 48 L34 44 L68 46 L102 36 L136 39 L170 30 L204 33 L238 22 L272 25 L306 15 L340 18 L374 8 L400 6 L400 60 L0 60 Z"
                      fill="url(#datum-spark)"
                    />
                    <path
                      d="M0 48 L34 44 L68 46 L102 36 L136 39 L170 30 L204 33 L238 22 L272 25 L306 15 L340 18 L374 8 L400 6"
                      fill="none"
                      stroke="var(--color-cobalt)"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="400" cy="6" r="3.5" fill="var(--color-cobalt)" />
                  </svg>
                </div>
              ) : null}

              {feature.icon === "sql" ? (
                <div className="mt-auto overflow-hidden rounded-lg border border-line bg-[#fbfcf9] pt-4">
                  <div className="mono flex gap-1.5 px-4 text-[0.5625rem] leading-relaxed">
                    <span className="text-muted/60">select</span>
                    <span className="text-ink">plan,</span>
                    <span className="text-muted/60">count</span>
                    <span className="text-ink">(*)</span>
                    <span className="text-muted/60">as</span>
                    <span className="text-cobalt-deep">teams</span>
                  </div>
                  <div className="mono mt-1 flex gap-1.5 px-4 pb-4 text-[0.5625rem] leading-relaxed">
                    <span className="text-muted/60">from</span>
                    <span className="text-ink">accounts</span>
                    <span className="text-muted/60">where</span>
                    <span className="text-ink">mrr &gt; 0</span>
                    <span className="text-cobalt">;</span>
                  </div>
                </div>
              ) : null}

              {feature.icon === "api" ? (
                <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                  {["GET /metrics", "POST /events", "webhooks", "CSV"].map((item) => (
                    <span
                      key={item}
                      className="mono rounded-md border border-line bg-[#fbfcf9] px-2 py-1 text-[0.5625rem] text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
