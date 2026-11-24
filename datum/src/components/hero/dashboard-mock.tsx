import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Bell,
  ChevronDown,
  LayoutGrid,
  Search,
  Settings,
  Table2,
  Users,
  Wallet,
} from "lucide-react";
import { heroMetrics } from "@/lib/content";

const navItems = [
  { icon: LayoutGrid, label: "Обзор", active: true },
  { icon: BarChart3, label: "Выручка" },
  { icon: Users, label: "Клиенты" },
  { icon: Wallet, label: "Финансы" },
  { icon: Table2, label: "Отчёты" },
];

const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];
const bars = [38, 44, 41, 52, 58, 54, 63, 68, 66, 74, 81, 88];
const barsPrev = [30, 34, 36, 40, 42, 45, 48, 50, 53, 57, 60, 64];

const rows = [
  { channel: "Органика", users: "3 412", cr: "4,8%", revenue: "1 284 000 ₽", width: "82%" },
  { channel: "Реклама", users: "2 106", cr: "3,1%", revenue: "964 000 ₽", width: "61%" },
  { channel: "Партнёры", users: "1 248", cr: "5,4%", revenue: "712 000 ₽", width: "45%" },
];

export function DashboardMock() {
  return (
    <div className="card overflow-hidden rounded-xl shadow-[0_40px_80px_-40px_rgba(15,18,16,0.35)]">
      <div className="flex items-center gap-3 border-b border-line bg-white/70 px-4 py-2.5">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2 rounded-full bg-[#e7e8e3]" />
          <span className="size-2 rounded-full bg-[#e7e8e3]" />
          <span className="size-2 rounded-full bg-[#e7e8e3]" />
        </div>
        <div className="mx-auto hidden w-full max-w-[260px] items-center justify-center gap-1.5 rounded-md border border-line bg-paper px-3 py-1 sm:flex">
          <span className="size-1.5 rounded-full bg-[#3fbf7f]" aria-hidden="true" />
          <span className="mono text-[0.625rem] text-muted">app.datum.example/overview</span>
        </div>
        <span className="ml-auto hidden rounded-md bg-paper px-2 py-1 text-[0.5625rem] text-muted md:inline">
          60 сек
        </span>
      </div>

      <div className="grid md:grid-cols-[168px_1fr]">
        <aside className="hidden border-r border-line bg-[#fbfcf9] p-3 md:block">
          <div className="flex items-center gap-2 px-2 py-2">
            <span className="grid size-5 place-items-center rounded-[4px] bg-cobalt text-[0.5rem] font-bold text-white">
              D
            </span>
            <span className="text-[0.6875rem] font-semibold tracking-[0.08em] text-ink">DATUM</span>
            <ChevronDown className="ml-auto size-3 text-muted" aria-hidden="true" />
          </div>

          <nav className="mt-3 flex flex-col gap-0.5">
            {navItems.map((item) => (
              <span
                key={item.label}
                className={
                  item.active
                    ? "flex items-center gap-2 rounded-md bg-cobalt-soft px-2 py-1.5 text-[0.6875rem] font-medium text-cobalt-deep"
                    : "flex items-center gap-2 rounded-md px-2 py-1.5 text-[0.6875rem] text-muted"
                }
              >
                <item.icon className="size-3.5" aria-hidden="true" />
                {item.label}
              </span>
            ))}
          </nav>

          <div className="mt-6 border-t border-line pt-3">
            <span className="flex items-center gap-2 px-2 py-1.5 text-[0.6875rem] text-muted">
              <Bell className="size-3.5" aria-hidden="true" />
              Алерты
              <span className="ml-auto rounded-full bg-acid px-1.5 text-[0.5rem] font-semibold text-ink">3</span>
            </span>
            <span className="flex items-center gap-2 px-2 py-1.5 text-[0.6875rem] text-muted">
              <Settings className="size-3.5" aria-hidden="true" />
              Настройки
            </span>
          </div>

          <div className="mt-10 flex items-center gap-2 border-t border-line pt-3">
            <span className="grid size-6 place-items-center rounded-full bg-ink text-[0.5rem] font-semibold text-white">
              АК
            </span>
            <span className="text-[0.625rem] leading-tight text-ink">
              Анна К.
              <span className="block text-[0.5625rem] text-muted">Админ</span>
            </span>
          </div>
        </aside>

        <div className="min-w-0 p-3.5 md:p-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[0.6875rem] text-muted">Рабочее пространство / Обзор</p>
              <p className="font-display text-[0.9375rem] font-semibold text-ink">Ключевые метрики</p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1.5 rounded-md border border-line bg-white px-2 py-1 text-[0.625rem] text-muted">
                <Search className="size-3" aria-hidden="true" />
                <span className="hidden sm:inline">Поиск метрики</span>
              </span>
              <span className="rounded-md border border-line bg-white px-2 py-1 text-[0.625rem] text-ink">
                Ноябрь 2026
              </span>
            </div>
          </div>

          <div className="mt-3.5 grid grid-cols-3 gap-2">
            {heroMetrics.map((metric) => {
              const negative = metric.delta.startsWith("−");
              return (
                <div key={metric.label} className="rounded-lg border border-line bg-white p-2.5">
                  <p className="text-[0.5625rem] uppercase tracking-[0.08em] text-muted">{metric.label}</p>
                  <p className="mt-1 truncate font-display text-[0.9375rem] font-semibold tabular-nums text-ink sm:text-[1.125rem]">
                    {metric.value}
                  </p>
                  <p
                    className={
                      negative
                        ? "mt-0.5 flex items-center gap-0.5 text-[0.5625rem] text-[#2f7d5b]"
                        : "mt-0.5 flex items-center gap-0.5 text-[0.5625rem] text-[#2f7d5b]"
                    }
                  >
                    {negative ? (
                      <ArrowDownRight className="size-2.5" aria-hidden="true" />
                    ) : (
                      <ArrowUpRight className="size-2.5" aria-hidden="true" />
                    )}
                    {metric.delta}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-2 grid gap-2 lg:grid-cols-[1.45fr_1fr]">
            <div className="rounded-lg border border-line bg-white p-3">
              <div className="flex items-center justify-between">
                <p className="text-[0.6875rem] font-medium text-ink">Выручка по месяцам</p>
                <div className="flex items-center gap-3 text-[0.5rem] text-muted">
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-sm bg-cobalt" aria-hidden="true" />
                    2026
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="size-1.5 rounded-sm bg-[#dfe2da]" aria-hidden="true" />
                    2025
                  </span>
                </div>
              </div>

              <div className="mt-3 flex h-[86px] items-end gap-[5px] sm:gap-2">
                {bars.map((height, index) => (
                  <div key={months[index]} className="flex h-full flex-1 items-end gap-[2px]">
                    <div
                      className="w-full rounded-sm bg-[#e6e8e1]"
                      style={{ height: `${barsPrev[index]}%` }}
                      aria-hidden="true"
                    />
                    <div
                      className={
                        index === bars.length - 1
                          ? "w-full rounded-sm bg-cobalt"
                          : "w-full rounded-sm bg-cobalt/85"
                      }
                      style={{ height: `${height}%` }}
                      aria-hidden="true"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-1.5 flex gap-[5px] text-[0.4375rem] text-muted sm:gap-2">
                {months.map((month, index) => (
                  <span key={month} className={index > 8 ? "flex-1 text-center text-ink/60" : "flex-1 text-center"}>
                    {index % 2 === 0 || index > 8 ? month : ""}
                  </span>
                ))}
              </div>
            </div>

            <div className="hidden rounded-lg border border-line bg-white p-3 lg:block">
              <p className="text-[0.6875rem] font-medium text-ink">Цель месяца</p>
              <p className="mt-1 font-display text-[1.25rem] font-semibold tabular-nums text-ink">92%</p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#eceee7]">
                <div className="h-full w-[92%] rounded-full bg-cobalt" />
              </div>
              <p className="mt-1.5 text-[0.5625rem] text-muted">4,28 из 4,65 млн ₽</p>

              <div className="mt-4 border-t border-line pt-3">
                <p className="text-[0.5625rem] uppercase tracking-[0.08em] text-muted">Прогноз</p>
                <div className="mt-2 flex items-end gap-1">
                  {[34, 46, 41, 57, 62, 55, 70, 76, 68, 84, 79, 92].map((height, index) => (
                    <span
                      key={index}
                      className={
                        index > 8
                          ? "w-full rounded-sm bg-acid"
                          : "w-full rounded-sm bg-[#dfe2da]"
                      }
                      style={{ height: `${Math.max(8, height * 0.4)}px` }}
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2 overflow-hidden rounded-lg border border-line bg-white">
            <div className="flex items-center justify-between border-b border-line px-3 py-2">
              <p className="text-[0.6875rem] font-medium text-ink">Каналы привлечения</p>
              <span className="text-[0.5625rem] text-cobalt">Все сегменты</span>
            </div>
            <div className="hidden grid-cols-[1.3fr_0.7fr_0.7fr_1fr] gap-2 border-b border-line px-3 py-1.5 text-[0.5rem] uppercase tracking-[0.06em] text-muted sm:grid">
              <span>Канал</span>
              <span>Клиенты</span>
              <span>CR</span>
              <span className="text-right">Выручка</span>
            </div>
            {rows.map((row) => (
              <div
                key={row.channel}
                className="grid grid-cols-[1.3fr_1fr] items-center gap-2 px-3 py-2 text-[0.5625rem] sm:grid-cols-[1.3fr_0.7fr_0.7fr_1fr]"
              >
                <span className="flex items-center gap-1.5 text-ink">
                  <span className="size-1.5 rounded-full bg-cobalt/60" aria-hidden="true" />
                  {row.channel}
                </span>
                <span className="hidden tabular-nums text-muted sm:inline">{row.users}</span>
                <span className="hidden tabular-nums text-muted sm:inline">{row.cr}</span>
                <span className="text-right tabular-nums text-ink">{row.revenue}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
