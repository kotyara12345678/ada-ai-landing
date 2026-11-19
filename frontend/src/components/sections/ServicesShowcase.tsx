import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/config/pricing";
import { LinkButton } from "@/components/ui/Button";

type ServiceGroup = {
  badge: string;
  title: string;
  lead: string;
  items: { label: string; href: string }[];
  price: string;
  cta: { label: string; href: string };
};

const groups: ServiceGroup[] = [
  {
    badge: "основное направление",
    title: "Сайты и веб-разработка",
    lead: "Фундамент бизнеса в интернете: от лендинга под кампанию до веб-системы с личным кабинетом.",
    items: [
      { label: "Лендинги", href: "/web-development" },
      { label: "Корпоративные сайты", href: "/web-development" },
      { label: "Многостраничные сайты", href: "/web-development" },
      { label: "Интернет-магазины", href: "/web-development" },
      { label: "Веб-приложения", href: "/web-development" },
      { label: "Личные кабинеты", href: "/web-development" },
    ],
    price: formatPrice(7000),
    cta: { label: "Разработка сайтов", href: "/web-development" },
  },
  {
    badge: "основное направление",
    title: "AI и автоматизация",
    lead: "AI-помощники и автоматизация процессов, которые снимают ручную работу и ускоряют ответы клиентам.",
    items: [
      { label: "AI-ассистенты", href: "/ai-development" },
      { label: "AI-консультанты на сайте", href: "/ai-development" },
      { label: "Автоматизация заявок", href: "/automation" },
      { label: "Автоматизация документов", href: "/automation" },
      { label: "Интеграция AI с CRM и API", href: "/ai-development" },
      { label: "Внутренние AI-инструменты", href: "/ai-development" },
    ],
    price: formatPrice(12000),
    cta: { label: "AI и автоматизация", href: "/ai-development" },
  },
  {
    badge: "дополнительное направление",
    title: "Интеграции и IT-поддержка",
    lead: "Связываем сервисы между собой и держим продукт в рабочем состоянии после запуска.",
    items: [
      { label: "Backend и API", href: "/backend" },
      { label: "Интеграции между сервисами", href: "/automation" },
      { label: "Telegram-боты", href: "/chatbots" },
      { label: "Поддержка и обслуживание сайтов", href: "/website-maintenance" },
      { label: "Администрирование серверов", href: "/server-administration" },
      { label: "Управление базами данных", href: "/database-management" },
    ],
    price: `${formatPrice(1490)}/мес`,
    cta: { label: "Поддержка и тарифы", href: "/maintenance" },
  },
];

export function ServicesShowcase() {
  return (
    <section id="services" className="scroll-mt-24 bg-surface py-14 md:py-28">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5">
              <span className="h-px w-7 bg-brand" aria-hidden />
              <p className="eyebrow">Что мы делаем</p>
            </div>
            <h2 className="mt-4 text-h2 text-ink">
              Сайты и веб-разработка, усиленные AI
            </h2>
            <p className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-ink-muted">
              Разработка сайтов и веб-приложений — основа работы студии. AI и автоматизация
              усиливают продукт, а интеграции и поддержка держат его в рабочем состоянии.
            </p>
          </div>
          <LinkButton href="/pricing" variant="secondary" withArrow className="shrink-0">
            Все услуги и цены
          </LinkButton>
        </div>

        <div className="mt-8 grid gap-3 sm:gap-4 md:grid-cols-3">
          {groups.map((group, index) => (
            <div
              key={group.title}
              className="flex flex-col border border-line bg-surface p-5 transition-shadow hover:shadow-card md:p-7"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-display text-[0.8rem] font-semibold tracking-[0.18em] text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-surface-muted px-2.5 py-1 text-[0.64rem] font-medium uppercase tracking-[0.06em] text-ink-muted">
                  {group.badge}
                </span>
              </div>

              <h3 className="mt-4 text-h3 font-semibold text-ink">{group.title}</h3>
              <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-muted">{group.lead}</p>

              <ul className="mt-4 space-y-1.5">
                {group.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-2 text-[0.86rem] leading-snug text-ink/85 transition-colors hover:text-brand"
                    >
                      <span className="size-1 shrink-0 rounded-full bg-brand/60" aria-hidden />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 md:mt-auto md:pt-5">
                <span className="text-[0.8rem] font-semibold text-ink">{group.price}</span>
                <Link
                  href={group.cta.href}
                  className="inline-flex items-center gap-1 text-[0.8rem] font-semibold text-brand hover:text-brand-dark"
                >
                  {group.cta.label}
                  <ArrowUpRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-5 text-[0.8rem] text-ink-muted">
          Не знаете, какое направление нужно?{" "}
          <Link href="/contacts" className="font-semibold text-brand hover:text-brand-dark">
            Опишите задачу
          </Link>{" "}
          — предложим формат и назовём стоимость.
        </p>
      </div>
    </section>
  );
}
