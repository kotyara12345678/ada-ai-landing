import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MessageSquare, Send } from "lucide-react";
import { buildMetadata, jsonLdBreadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { LeadForm } from "@/components/forms/LeadForm";
import { site } from "@/config/site";
import { directions } from "@/config/services";
import Link from "next/link";

export const metadata: Metadata = buildMetadata({
  title: "Контакты — обсудить разработку проекта | ADA",
  description:
    "Свяжитесь с командой: Telegram, email и форма заявки. Разберём задачу, предложим решение и назовём стоимость разработки.",
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <>
      <JsonLd
        data={jsonLdBreadcrumbs([
          { name: "Главная", path: "/" },
          { name: "Контакты", path: "/contacts" },
        ])}
        id="contacts-jsonld"
      />

      <section className="border-b border-muted/15 pt-28 md:pt-32">
        <div className="container-page pb-10 md:pb-14">
          <Breadcrumbs items={[{ name: "Контакты", path: "/contacts" }]} />
          <h1 className="mt-8 max-w-3xl text-h2 text-bone">Обсудим ваш проект</h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-muted">
            Опишите задачу в форме или напишите напрямую в Telegram. Отвечаем в течение рабочего дня,
            задаём уточняющие вопросы и предлагаем решение со стоимостью.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div id="form" className="scroll-mt-24 rounded-2xl border border-muted/15 bg-bone p-6 md:p-8">
            <h2 className="font-display text-[1.2rem] font-semibold text-graphite">Заявка на разработку</h2>
            <p className="mt-1.5 text-[0.84rem] leading-relaxed text-graphite/55">
              Поля со звёздочкой обязательны. Чем подробнее описание, тем точнее оценка.
            </p>
            <div className="mt-6">
              <LeadForm />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href={site.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 rounded-xl border border-muted/20 bg-forest/30 p-5 transition-colors hover:border-emerald/40"
            >
              <div className="flex gap-4">
                <span className="flex size-9 items-center justify-center rounded-lg border border-muted/20 text-emerald">
                  <Send className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.9rem] font-medium text-bone">Telegram</p>
                  <p className="mt-0.5 font-mono text-[0.78rem] text-muted">{site.contacts.telegramHandle}</p>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted/70">
                    Самый быстрый способ: можно сразу приложить файлы и примеры.
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald" aria-hidden />
            </a>

            <a
              href={`mailto:${site.contacts.email}`}
              className="group flex items-start justify-between gap-4 rounded-xl border border-muted/20 p-5 transition-colors hover:border-emerald/40"
            >
              <div className="flex gap-4">
                <span className="flex size-9 items-center justify-center rounded-lg border border-muted/20 text-emerald">
                  <Mail className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.9rem] font-medium text-bone">Email</p>
                  <p className="mt-0.5 font-mono text-[0.78rem] text-muted">{site.contacts.email}</p>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-muted/70">
                    Для технических заданий и документов.
                  </p>
                </div>
              </div>
              <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald" aria-hidden />
            </a>

            <div className="rounded-xl border border-muted/20 p-5">
              <div className="flex gap-4">
                <span className="flex size-9 items-center justify-center rounded-lg border border-muted/20 text-emerald">
                  <Clock className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.9rem] font-medium text-bone">Формат работы</p>
                  <p className="mt-1 text-[0.8rem] leading-relaxed text-muted">
                    Удалённо, в удобном канале: Telegram, почта, видеозвонки. Часовой пояс и график
                    созвонов согласуем на старте.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-muted/20 p-5">
              <p className="flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/60">
                <MessageSquare className="size-3" aria-hidden />
                Реквизиты и договор
              </p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">
                Работаем по договору, реквизиты и условия предоставляем после обсуждения задачи.
                Персональные данные обрабатываются согласно{" "}
                <Link href="/privacy" className="text-emerald underline underline-offset-2">
                  политике конфиденциальности
                </Link>
                .
              </p>
            </div>

            <div className="rounded-xl border border-muted/15 p-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/50">
                Направления
              </p>
              <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
                {directions.map((direction) => (
                  <li key={direction.slug}>
                    <Link
                      href={`/${direction.slug}`}
                      className="text-[0.78rem] text-muted transition-colors hover:text-emerald"
                    >
                      {direction.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
