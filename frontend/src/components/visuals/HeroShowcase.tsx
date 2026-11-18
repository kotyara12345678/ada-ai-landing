import { ArrowUpRight, Check, LayoutDashboard, Settings2, Sparkles } from "lucide-react";

const kpis = [
  { label: "Запросы API", value: "24.8k", hint: "за неделю" },
  { label: "Ответ p95", value: "118 мс", hint: "среднее" },
  { label: "Сбои", value: "0", hint: "за 24 часа" },
];

const services = [
  { name: "Web · production", meta: "Next.js", value: "200" },
  { name: "API · production", meta: "FastAPI", value: "200" },
  { name: "PostgreSQL", meta: "основная база", value: "ok" },
];

const weekdays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

/**
 * Визуальная композиция первого экрана: мокап панели проекта.
 * Это иллюстрация интерфейса, а не отчёт о реальных показателях.
 */
export function HeroShowcase() {
  return (
    <figure className="relative m-0">
      <div aria-hidden="true" className="relative">
        {/* Мягкий фон композиции */}
        <div className="pointer-events-none absolute -inset-x-8 -inset-y-10 -z-10">
          <div className="absolute right-0 top-0 size-64 rounded-full bg-tint-blue blur-3xl" />
          <div className="absolute bottom-0 left-2 size-56 rounded-full bg-tint-violet blur-3xl" />
          <div className="soft-grid mask-fade absolute inset-x-8 inset-y-2 rounded-3xl opacity-60" />
        </div>

        {/* Плавающие подписи направлений */}
        <div className="animate-float-slow absolute -right-2 -top-4 z-10 hidden items-center gap-2 rounded-xl border border-line bg-surface px-2.5 py-1.5 shadow-card sm:flex">
          <span className="flex size-6 items-center justify-center rounded-md bg-tint-violet text-accent-violet">
            <Sparkles className="size-3.5" aria-hidden />
          </span>
          <span className="text-[0.7rem] font-medium text-ink">AI-агент</span>
          <span className="text-[0.66rem] text-ink-muted">обрабатывает запросы</span>
        </div>

        <div className="animate-float absolute -left-3 top-[42%] z-10 hidden items-center gap-2 rounded-xl border border-line bg-surface px-2.5 py-1.5 shadow-card lg:flex">
          <span className="size-1.5 rounded-full bg-success" />
          <span className="font-mono text-[0.66rem] font-medium text-ink">GET /api/health</span>
          <span className="rounded bg-success-soft px-1.5 py-0.5 font-mono text-[0.6rem] font-medium text-success">
            200
          </span>
        </div>

        <div className="animate-float-slow absolute -bottom-5 right-8 z-10 hidden items-center gap-2 rounded-xl border border-line bg-surface px-2.5 py-1.5 shadow-card sm:flex">
          <span className="flex size-6 items-center justify-center rounded-md bg-tint-teal text-accent-teal">
            <Check className="size-3.5" aria-hidden />
          </span>
          <span className="text-[0.7rem] font-medium text-ink">Автоматизация</span>
          <span className="text-[0.66rem] text-ink-muted">сценарий выполнен</span>
        </div>

        {/* Окно приложения */}
        <div className="relative rounded-2xl border border-line bg-surface p-1.5 shadow-panel sm:p-2">
          <div className="flex items-center gap-2 px-2 pb-1.5 pt-1">
            <span className="flex gap-1">
              <span className="size-2 rounded-full bg-[#f1b3ab]" />
              <span className="size-2 rounded-full bg-[#f3d9a4]" />
              <span className="size-2 rounded-full bg-[#a9d9bd]" />
            </span>
            <span className="mx-auto hidden rounded-md border border-line bg-surface-muted px-3 py-0.5 font-mono text-[0.6rem] text-ink-muted sm:block">
              app.ada.studio / dashboard
            </span>
            <span className="ml-auto rounded bg-brand-soft px-1.5 py-0.5 text-[0.58rem] font-medium text-brand sm:ml-0">
              демо
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-line">
            <div className="flex">
              {/* Боковая панель */}
              <div className="hidden w-12 flex-col items-center gap-2 border-r border-line bg-surface-muted py-3 sm:flex">
                <span className="flex size-7 items-center justify-center rounded-lg bg-brand text-white">
                  <LayoutDashboard className="size-3.5" aria-hidden />
                </span>
                <span className="flex size-7 items-center justify-center rounded-lg text-ink-muted/70">
                  <Sparkles className="size-3.5" aria-hidden />
                </span>
                <span className="flex size-7 items-center justify-center rounded-lg text-ink-muted/70">
                  <Settings2 className="size-3.5" aria-hidden />
                </span>
                <span className="mt-auto size-6 rounded-full bg-tint-violet" />
              </div>

              {/* Контент панели */}
              <div className="min-w-0 flex-1 p-3 sm:p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[0.6rem] uppercase tracking-[0.14em] text-ink-muted">
                      Обзор проекта
                    </p>
                    <p className="mt-0.5 font-display text-[0.95rem] font-semibold text-ink">
                      Платформа заказов
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-line bg-surface-muted px-2 py-1 text-[0.62rem] text-ink-muted">
                    <span className="animate-dot size-1.5 rounded-full bg-success" />
                    production
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-1.5 sm:gap-2">
                  {kpis.map((kpi) => (
                    <div
                      key={kpi.label}
                      className="rounded-lg border border-line bg-surface-muted px-2 py-1.5 sm:px-2.5 sm:py-2"
                    >
                      <p className="truncate text-[0.56rem] uppercase tracking-[0.08em] text-ink-muted">
                        {kpi.label}
                      </p>
                      <p className="mt-0.5 font-display text-[0.82rem] font-semibold text-ink sm:text-[0.95rem]">
                        {kpi.value}
                      </p>
                      <p className="hidden text-[0.56rem] text-ink-muted sm:block">{kpi.hint}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-2 rounded-lg border border-line p-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[0.64rem] text-ink-muted">Запросы API за 7 дней</p>
                    <span className="inline-flex items-center gap-0.5 text-[0.6rem] font-medium text-success">
                      <ArrowUpRight className="size-3" aria-hidden />
                      стабильно
                    </span>
                  </div>

                  <svg
                    viewBox="0 0 320 92"
                    preserveAspectRatio="none"
                    className="mt-1.5 h-16 w-full sm:h-20"
                  >
                    <defs>
                      <linearGradient id="hero-chart-fill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {[18, 42, 66].map((y) => (
                      <line
                        key={y}
                        x1="0"
                        y1={y}
                        x2="320"
                        y2={y}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="3 5"
                      />
                    ))}
                    <path
                      d="M0 74 C24 70 36 58 56 60 C76 62 84 46 104 48 C124 50 132 36 152 40 C172 44 180 28 200 32 C220 36 232 22 252 26 C272 30 292 14 320 18 L320 92 L0 92 Z"
                      fill="url(#hero-chart-fill)"
                    />
                    <path
                      d="M0 74 C24 70 36 58 56 60 C76 62 84 46 104 48 C124 50 132 36 152 40 C172 44 180 28 200 32 C220 36 232 22 252 26 C272 30 292 14 320 18"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      className="animate-draw"
                    />
                    <circle cx="320" cy="18" r="3" fill="#2563eb" />
                    <circle cx="320" cy="18" r="6" fill="#2563eb" fillOpacity="0.15" />
                  </svg>

                  <div className="mt-1 flex justify-between text-[0.54rem] uppercase tracking-wider text-ink-muted">
                    {weekdays.map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                </div>

                <div className="mt-2 space-y-1">
                  {services.map((service) => (
                    <div
                      key={service.name}
                      className="flex items-center gap-2 rounded-lg border border-line px-2.5 py-1.5"
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-success" />
                      <span className="truncate text-[0.66rem] font-medium text-ink">
                        {service.name}
                      </span>
                      <span className="ml-auto hidden truncate text-[0.58rem] text-ink-muted sm:block">
                        {service.meta}
                      </span>
                      <span className="shrink-0 rounded bg-success-soft px-1.5 py-0.5 font-mono text-[0.56rem] font-medium text-success">
                        {service.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-4 text-[0.72rem] leading-relaxed text-ink-muted">
        Пример интерфейса: панель проекта, метрики и состояние сервисов.
      </figcaption>
    </figure>
  );
}
