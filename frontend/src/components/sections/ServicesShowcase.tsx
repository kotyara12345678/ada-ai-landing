import Link from "next/link";
import { ArrowRight, Brain, Code, ServerCog } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatPrice } from "@/config/pricing";
import { LinkButton } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type ServiceGroup = {
  number: string;
  badge: string;
  title: string;
  lead: string;
  items: { label: string; href: string }[];
  price: string;
  cta: { label: string; href: string };
  icon: LucideIcon;
  tone: {
    card: string;
    glow: string;
    number: string;
    icon: string;
    badge: string;
    title: string;
    lead: string;
    item: string;
    itemDot: string;
    divider: string;
    price: string;
    cta: string;
  };
};

const groups: ServiceGroup[] = [
  {
    number: "01",
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
    icon: Code,
    tone: {
      card: "border-ink-deep bg-ink-deep",
      glow: "bg-lime/25",
      number: "text-white/[0.07]",
      icon: "bg-white/10 text-lime ring-1 ring-white/10",
      badge: "bg-white/10 text-white/65",
      title: "text-white",
      lead: "text-white/55",
      item: "text-white/70 hover:text-lime",
      itemDot: "bg-lime/70",
      divider: "border-white/10",
      price: "text-lime",
      cta: "bg-lime text-ink hover:bg-white",
    },
  },
  {
    number: "02",
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
    cta: { label: "AI-разработка", href: "/ai-development" },
    icon: Brain,
    tone: {
      card: "border-line bg-tint-violet",
      glow: "bg-accent-violet/15",
      number: "text-accent-violet/10",
      icon: "bg-white text-accent-violet ring-1 ring-line",
      badge: "bg-white/70 text-ink-muted",
      title: "text-ink",
      lead: "text-ink-muted",
      item: "text-ink/80 hover:text-accent-violet",
      itemDot: "bg-accent-violet/50",
      divider: "border-line",
      price: "text-ink",
      cta: "bg-ink text-white hover:bg-ink-deep",
    },
  },
  {
    number: "03",
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
    cta: { label: "Тарифы", href: "/maintenance" },
    icon: ServerCog,
    tone: {
      card: "border-line bg-tint-blue",
      glow: "bg-brand/15",
      number: "text-brand/10",
      icon: "bg-white text-brand ring-1 ring-line",
      badge: "bg-white/70 text-ink-muted",
      title: "text-ink",
      lead: "text-ink-muted",
      item: "text-ink/80 hover:text-brand",
      itemDot: "bg-brand/50",
      divider: "border-line",
      price: "text-ink",
      cta: "bg-brand text-white hover:bg-brand-dark",
    },
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
            <h2 className="mt-4 text-h2 text-ink">Сайты и веб-разработка, усиленные AI</h2>
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
          {groups.map((group) => {
            const Icon = group.icon;
            return (
              <div
                key={group.title}
                className={cn(
                  "group relative flex flex-col overflow-hidden border p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-card md:p-6",
                  group.tone.card,
                )}
              >
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -right-14 -top-16 size-52 rounded-full blur-[70px]",
                    group.tone.glow,
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-4 right-3 font-display text-[4.5rem] font-bold leading-none tracking-tight md:text-[5.5rem]",
                    group.tone.number,
                  )}
                >
                  {group.number}
                </span>

                <div className="relative flex items-center gap-2.5">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl",
                      group.tone.icon,
                    )}
                  >
                    <Icon className="size-[1.15rem]" aria-hidden />
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.08em]",
                      group.tone.badge,
                    )}
                  >
                    {group.badge}
                  </span>
                </div>

                <h3 className={cn("relative mt-4 text-h3 font-semibold", group.tone.title)}>
                  {group.title}
                </h3>
                <p className={cn("relative mt-2 text-[0.86rem] leading-relaxed", group.tone.lead)}>
                  {group.lead}
                </p>

                <ul className={cn("relative mt-4 border-t", group.tone.divider)}>
                  {group.items.map((item) => (
                    <li key={item.label} className={cn("border-b", group.tone.divider)}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group/item flex items-center justify-between gap-2 py-1.5 text-[0.85rem] leading-snug transition-colors",
                          group.tone.item,
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span
                            className={cn("size-1 shrink-0 rounded-full", group.tone.itemDot)}
                            aria-hidden
                          />
                          {item.label}
                        </span>
                        <ArrowRight
                          className="size-3.5 shrink-0 -translate-x-1 opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="relative mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 pt-1 md:mt-auto md:pt-4">
                  <div>
                    <p
                      className={cn(
                        "text-[0.6rem] uppercase tracking-[0.12em] opacity-60",
                        group.tone.title,
                      )}
                    >
                      Стоимость
                    </p>
                    <p
                      className={cn(
                        "mt-0.5 whitespace-nowrap text-[1.05rem] font-semibold",
                        group.tone.price,
                      )}
                    >
                      {group.price}
                    </p>
                  </div>
                  <Link
                    href={group.cta.href}
                    className={cn(
                      "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.78rem] font-semibold transition-colors",
                      group.tone.cta,
                    )}
                  >
                    {group.cta.label}
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </div>
            );
          })}
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
