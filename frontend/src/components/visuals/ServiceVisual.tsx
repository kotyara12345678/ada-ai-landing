import { ArrowRight, Database, Send, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "blue" | "violet" | "teal" | "green";

const accentText: Record<Tone, string> = {
  blue: "text-brand",
  violet: "text-accent-violet",
  teal: "text-accent-teal",
  green: "text-accent-green",
};

const accentBg: Record<Tone, string> = {
  blue: "bg-brand",
  violet: "bg-accent-violet",
  teal: "bg-accent-teal",
  green: "bg-accent-green",
};

const accentSoft: Record<Tone, string> = {
  blue: "bg-tint-blue",
  violet: "bg-tint-violet",
  teal: "bg-tint-teal",
  green: "bg-success-soft",
};

/**
 * Небольшие схемы результатов по направлениям: вместо одинаковых иконок
 * у каждой услуги свой визуальный образ.
 */
export function ServiceVisual({
  slug,
  tone,
  dark = false,
}: {
  slug: string;
  tone: Tone;
  dark?: boolean;
}) {
  const surface = dark ? "border-white/15 bg-white/[0.04]" : "border-line bg-white";
  const muted = dark ? "bg-white/15" : "bg-line";
  const faint = dark ? "bg-white/10" : "bg-surface-muted";

  if (slug === "web-development") {
    return (
      <div className={cn("rounded-lg border p-2", surface)}>
        <div className="flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-[#f1b3ab]" />
          <span className="size-1.5 rounded-full bg-[#f3d9a4]" />
          <span className="size-1.5 rounded-full bg-[#a9d9bd]" />
          <span className={cn("ml-auto h-1.5 w-20 rounded-full", muted)} />
        </div>
        <div className="mt-2 grid grid-cols-[1fr_1.3fr] gap-2">
          <div className="space-y-1.5">
            <span className={cn("block h-1.5 w-3/4 rounded-full", muted)} />
            <span className={cn("block h-1.5 w-full rounded-full", faint)} />
            <span className={cn("block h-1.5 w-2/3 rounded-full", faint)} />
            <span className={cn("mt-2 block h-4 w-14 rounded", accentSoft[tone])} />
          </div>
          <div className={cn("flex items-end gap-1 rounded-md p-1.5", accentSoft[tone])}>
            {[40, 62, 48, 78, 58, 88].map((height, index) => (
              <span
                key={index}
                className={cn("animate-grow w-full rounded-sm opacity-80", accentBg[tone])}
                style={{ height: `${height * 0.42}px`, animationDelay: `${index * 60}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (slug === "backend") {
    const rows = [
      { method: "GET", path: "/api/orders", code: "200" },
      { method: "POST", path: "/api/checkout", code: "201" },
      { method: "GET", path: "/api/health", code: "200" },
    ];
    return (
      <div className={cn("space-y-1 rounded-lg border p-2", surface)}>
        {rows.map((row) => (
          <div key={row.path} className="flex items-center gap-1.5 font-mono text-[0.6rem]">
            <span className={cn("rounded px-1 py-0.5 font-semibold", accentSoft[tone], accentText[tone])}>
              {row.method}
            </span>
            <span className={cn("truncate", dark ? "text-white/70" : "text-ink-muted")}>{row.path}</span>
            <span className="ml-auto shrink-0 rounded bg-success-soft px-1 py-0.5 text-success">
              {row.code}
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (slug === "ai-development") {
    return (
      <div className={cn("rounded-lg border p-2", surface)}>
        <svg viewBox="0 0 220 78" className="h-[78px] w-full">
          <g stroke={dark ? "rgba(255,255,255,0.18)" : "#cbd5e1"} strokeWidth="1" strokeDasharray="3 4">
            <line x1="34" y1="39" x2="104" y2="39" />
            <line x1="104" y1="39" x2="182" y2="16" />
            <line x1="104" y1="39" x2="182" y2="62" />
            <line x1="34" y1="39" x2="44" y2="12" />
          </g>
          <circle cx="104" cy="39" r="17" fill="#7957e8" fillOpacity="0.12" />
          <circle cx="104" cy="39" r="11" fill="#7957e8" />
          <circle cx="34" cy="39" r="7" fill={dark ? "rgba(255,255,255,0.25)" : "#cbd5e1"} />
          <circle cx="182" cy="16" r="6" fill="#0ea5a4" />
          <circle cx="182" cy="62" r="6" fill="#2563eb" />
          <circle cx="44" cy="12" r="5" fill={dark ? "rgba(255,255,255,0.2)" : "#e2e8f0"} />
        </svg>
        <div className="flex items-center gap-1.5">
          <Sparkles className={cn("size-3", accentText[tone])} aria-hidden />
          <span className={cn("text-[0.62rem]", dark ? "text-white/60" : "text-ink-muted")}>
            документы → контекст → ответ
          </span>
        </div>
      </div>
    );
  }

  if (slug === "automation") {
    return (
      <div className={cn("rounded-lg border p-2.5", surface)}>
        <div className="flex items-center gap-1">
          {[
            { icon: Send, label: "заявка" },
            { icon: Zap, label: "правило" },
            { icon: Database, label: "CRM" },
          ].map((node, index) => (
            <div key={node.label} className="flex flex-1 items-center gap-1">
              <div className={cn("flex flex-1 items-center gap-1 rounded-md px-1.5 py-1", faint)}>
                <node.icon className={cn("size-3 shrink-0", accentText[tone])} aria-hidden />
                <span
                  className={cn(
                    "truncate text-[0.56rem]",
                    dark ? "text-white/70" : "text-ink-muted",
                  )}
                >
                  {node.label}
                </span>
              </div>
              {index < 2 ? (
                <ArrowRight
                  className={cn("size-2.5 shrink-0", dark ? "text-white/30" : "text-line-strong")}
                  aria-hidden
                />
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-success" />
          <span className={cn("text-[0.58rem]", dark ? "text-white/60" : "text-ink-muted")}>
            без ручного переноса данных
          </span>
        </div>
      </div>
    );
  }

  if (slug === "chatbots") {
    return (
      <div className="space-y-1.5">
        <div className="ml-auto w-[82%] rounded-lg rounded-br-sm bg-brand px-2.5 py-1.5 text-[0.62rem] leading-snug text-white">
          Что входит в тариф Business?
        </div>
        <div
          className={cn(
            "w-[88%] rounded-lg rounded-bl-sm border px-2.5 py-1.5 text-[0.62rem] leading-snug",
            dark ? "border-white/15 bg-white/5 text-white/75" : "border-line bg-surface text-ink-muted",
          )}
        >
          Сайт, сервер и база данных: мониторинг, ежедневные бэкапы, часы работ.
        </div>
      </div>
    );
  }

  if (slug === "voice-ai") {
    const bars = [28, 52, 78, 44, 92, 58, 34, 70, 48, 84, 40, 62, 30, 54, 46];
    return (
      <div className={cn("flex items-center gap-2.5 rounded-lg border px-2.5 py-2", surface)}>
        <span
          className={cn(
            "flex size-6 shrink-0 items-center justify-center rounded-full",
            accentSoft[tone],
            accentText[tone],
          )}
        >
          <span className="size-1.5 rounded-full bg-current" />
        </span>
        <div className="flex h-9 flex-1 items-center gap-[2px]">
          {bars.map((height, index) => (
            <span
              key={index}
              className={cn("animate-grow flex-1 rounded-full opacity-80", accentBg[tone])}
              style={{ height: `${height}%`, animationDelay: `${index * 45}ms` }}
            />
          ))}
        </div>
        <span className={cn("shrink-0 font-mono text-[0.56rem]", dark ? "text-white/60" : "text-ink-muted")}>
          00:38
        </span>
      </div>
    );
  }

  return null;
}
