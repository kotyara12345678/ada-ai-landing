import { ArrowUpRight, Mail, Timer } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const channels = [
  {
    icon: Mail,
    label: "Почта",
    value: site.demoEmail,
    href: `mailto:${site.demoEmail}`,
    note: "Демонстрационный адрес — реальная почта не подключена",
  },
  {
    icon: Timer,
    label: "Ответ",
    value: "1 рабочий день",
    note: "Пишем по существу: что можно сделать и какие данные нужны",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="10"
          label="Контакты"
          title="Расскажите, что нужно построить"
          description="Опишите задачу в свободной форме: контекст, ограничения, сроки. Мы вернёмся с вопросами и предложением по подходу."
          aside={<span className="mono text-[0.5625rem] text-muted">Form / no backend attached</span>}
        />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <ul className="border-t border-line">
              {channels.map((channel) => (
                <li key={channel.label} className="border-b border-line py-4">
                  <p className="mono flex items-center gap-2 text-[0.5rem] tracking-[0.2em] text-muted/65">{/* {channel.icon} */}{channel.label}</p>
                  {channel.href ? (
                    <a
                      href={channel.href}
                      className="mt-2 inline-flex items-center gap-2 break-all text-[0.9375rem] text-text transition-colors hover:text-lime"
                    >
                      {channel.value}
                      <ArrowUpRight className="size-3.5 shrink-0" aria-hidden="true" />
                    </a>
                  ) : (
                    <p className="mt-2 text-[0.9375rem] text-text">{channel.value}</p>
                  )}
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-muted/70">{channel.note}</p>
                </li>
              ))}
            </ul>

            <div className="mono mt-6 space-y-2 text-[0.5rem] leading-relaxed tracking-[0.16em] text-muted/60">
              <p className="text-emerald">{/* before we start */}</p>
              <p>{/* Какой процесс или продукт нужно изменить */}— Какой процесс или продукт нужно изменить</p>
              <p>{/* Есть ли данные, интеграции и ограничения */}— Есть ли данные, интеграции и ограничения</p>
              <p>{/* Ориентир по срокам и формату работы */}— Ориентир по срокам и формату работы</p>
            </div>
          </div>

          <div className={cn("md:col-span-7 md:col-start-6")}>
            <div className="rounded-2xl border border-line bg-surface/45 p-5 md:p-7">
              <div className="mono flex items-center justify-between gap-4 border-b border-line pb-3 text-[0.5rem] tracking-[0.2em] text-muted/60">
                <span>Inquiry / vectora</span>
                <span className="text-lime">Form 01</span>
              </div>
              <div className="mt-6">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
