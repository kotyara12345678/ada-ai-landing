import Link from "next/link";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { site } from "@/config/site";

const points = [
  "Бесплатная оценка и план работ",
  "Ответ в течение рабочего дня",
  "Без навязчивых звонков и спама",
];

export function CtaBlock() {
  return (
    <section id="start" className="relative scroll-mt-24 overflow-hidden bg-ink-deep py-14 text-white md:py-24">
      <div aria-hidden className="tech-grid absolute inset-0 opacity-70" />
      <div
        aria-hidden
        className="absolute -left-24 bottom-0 size-[26rem] rounded-full bg-brand/20 blur-[110px]"
      />

      <div className="container-page relative grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start lg:gap-16">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="h-px w-7 bg-lime" aria-hidden />
            <p className="eyebrow eyebrow-invert">Старт проекта</p>
          </div>
          <h2 className="mt-4 max-w-xl text-h2">
            Расскажите задачу — вернёмся с оценкой и планом
          </h2>
          <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-white/55">
            Достаточно пары предложений: что нужно сделать или что уже работает и требует
            поддержки. Уточним детали и предложим вариант без обязательств.
          </p>

          <ul className="mt-5 flex flex-col gap-2.5 md:mt-7 md:gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-[0.88rem] text-white/70">
                <span className="size-1.5 rounded-full bg-lime" aria-hidden />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-2.5 border-t border-white/10 pt-5 md:mt-9 md:gap-3 md:pt-7">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white/35">
              Написать напрямую
            </p>
            <a
              href={site.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-2.5 text-[0.95rem] text-white transition-colors hover:text-lime"
            >
              <Send className="size-4 text-lime" aria-hidden />
              {site.contacts.telegramHandle}
              <ArrowUpRight className="size-3.5 opacity-50 transition group-hover:opacity-100" aria-hidden />
            </a>
            <a
              href={`mailto:${site.contacts.email}`}
              className="group inline-flex w-fit items-center gap-2.5 text-[0.95rem] text-white transition-colors hover:text-lime"
            >
              <Mail className="size-4 text-lime" aria-hidden />
              {site.contacts.email}
            </a>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-5 text-ink shadow-panel sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                Заявка на оценку
              </p>
              <p className="mt-1 font-display text-[1.15rem] font-semibold">Опишите задачу</p>
            </div>
            <Link
              href="/contacts"
              className="text-[0.78rem] font-semibold text-brand hover:text-brand-dark"
            >
              Все контакты
            </Link>
          </div>

          <LeadForm compact className="mt-5" />
        </div>
      </div>
    </section>
  );
}
