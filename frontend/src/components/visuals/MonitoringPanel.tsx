import { Activity, Database, Globe, HardDrive, ShieldCheck } from "lucide-react";

const checks = [
  {
    icon: Globe,
    name: "Сайт · HTTPS",
    meta: "проверка каждые 5 минут",
    value: "200 OK",
    state: "ok" as const,
  },
  {
    icon: Activity,
    name: "API · /health",
    meta: "внешний монитор",
    value: "200 OK",
    state: "ok" as const,
  },
  {
    icon: Database,
    name: "PostgreSQL",
    meta: "доступность и медленные запросы",
    value: "доступна",
    state: "ok" as const,
  },
  {
    icon: HardDrive,
    name: "Бэкап базы",
    meta: "03:00 · внешнее хранилище",
    value: "выполнен",
    state: "ok" as const,
  },
  {
    icon: ShieldCheck,
    name: "SSL-сертификат",
    meta: "следующее продление",
    value: "48 дней",
    state: "warn" as const,
  },
];

const bars = Array.from({ length: 24 }, (_, index) =>
  index === 15 ? "warn" : index === 9 ? "soft" : "ok",
);

/**
 * Схема панели мониторинга: показывает, что именно контролируется.
 * Данные условные — это не отчёт о реальной инфраструктуре.
 */
export function MonitoringPanel() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
      <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-tint-teal text-accent-teal">
            <Activity className="size-4" aria-hidden />
          </span>
          <div>
            <p className="text-[0.86rem] font-semibold text-ink">Панель мониторинга</p>
            <p className="text-[0.7rem] text-ink-muted">сервисы, бэкапы, сертификаты</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-md bg-success-soft px-2 py-1 text-[0.66rem] font-medium text-success">
          <span className="animate-dot size-1.5 rounded-full bg-success" />
          контроль активен
        </span>
      </div>

      <div className="px-4 py-3.5 sm:px-5">
        <ul className="space-y-1.5">
          {checks.map((check) => (
            <li
              key={check.name}
              className="flex items-center gap-2.5 rounded-lg border border-line px-2.5 py-2"
            >
              <check.icon
                className="size-3.5 shrink-0 text-ink-muted"
                strokeWidth={1.8}
                aria-hidden
              />
              <div className="min-w-0">
                <p className="truncate text-[0.78rem] font-medium text-ink">{check.name}</p>
                <p className="hidden truncate text-[0.66rem] text-ink-muted sm:block">
                  {check.meta}
                </p>
              </div>
              <span
                className={
                  check.state === "ok"
                    ? "ml-auto shrink-0 rounded bg-success-soft px-1.5 py-0.5 font-mono text-[0.62rem] font-medium text-success"
                    : "ml-auto shrink-0 rounded bg-amber-50 px-1.5 py-0.5 font-mono text-[0.62rem] font-medium text-amber-700"
                }
              >
                {check.value}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-3.5 rounded-lg border border-line bg-surface-muted p-3">
          <div className="flex items-center justify-between">
            <p className="text-[0.7rem] text-ink-muted">Доступность за 14 дней</p>
            <p className="font-mono text-[0.66rem] font-medium text-ink">99,9%</p>
          </div>
          <div className="mt-2 flex h-7 items-end gap-[3px]">
            {bars.map((state, index) => (
              <span
                key={index}
                className={
                  state === "warn"
                    ? "h-4 w-full rounded-sm bg-amber-400/80"
                    : state === "soft"
                      ? "h-6 w-full rounded-sm bg-success/35"
                      : "h-full w-full rounded-sm bg-success/70"
                }
              />
            ))}
          </div>
          <div className="mt-1.5 flex items-center gap-3 text-[0.6rem] text-ink-muted">
            <span className="inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-success/70" /> без сбоев
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="size-1.5 rounded-full bg-amber-400/80" /> короткий сбой
            </span>
          </div>
        </div>
      </div>

      <p className="border-t border-line bg-surface-muted px-4 py-2.5 text-[0.66rem] leading-relaxed text-ink-muted sm:px-5">
        Пример панели и условные показатели — не отчёт о реальной инфраструктуре.
      </p>
    </div>
  );
}
