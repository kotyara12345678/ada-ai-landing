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
  title: "Контакты — обсудить разработку или обслуживание | ADA",
  description:
    "Свяжитесь с командой: Telegram, email и форма заявки. Разберём задачу, предложим решение, назовём стоимость разработки или обслуживания.",
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

      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs items={[{ name: "Контакты", path: "/contacts" }]} />
          <h1 className="mt-6 max-w-3xl text-h2 text-ink">Обсудим ваш проект</h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted">
            Опишите задачу в форме или напишите в Telegram. Отвечаем в течение рабочего дня,
            задаём уточняющие вопросы и предлагаем решение со стоимостью.
          </p>
        </div>
      </section>

      <section className="bg-surface py-10 md:py-14">
        <div className="container-page grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div id="form" className="scroll-mt-24 rounded-xl border border-line bg-surface p-5 sm:p-7">
            <h2 className="font-display text-[1.15rem] font-semibold text-ink">
              Заявка на разработку или обслуживание
            </h2>
            <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-muted">
              Поля со звёздочкой обязательны. Чем подробнее описание, тем точнее оценка.
            </p>
            <div className="mt-5">
              <LeadForm />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href={site.contacts.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start justify-between gap-4 rounded-xl border border-line bg-surface-muted p-5 transition-colors hover:border-brand/40"
            >
              <div className="flex gap-4">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Send className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.9rem] font-medium text-ink">Telegram</p>
                  <p className="mt-0.5 text-[0.82rem] text-ink-muted">
                    {site.contacts.telegramHandle}
                  </p>
                  <p className="mt-1.5 text-[0.79rem] leading-relaxed text-ink-muted">
                    Самый быстрый способ: можно сразу приложить файлы и примеры.
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                aria-hidden
              />
            </a>

            <a
              href={`mailto:${site.contacts.email}`}
              className="group flex items-start justify-between gap-4 rounded-xl border border-line p-5 transition-colors hover:border-brand/40"
            >
              <div className="flex gap-4">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Mail className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.9rem] font-medium text-ink">Email</p>
                  <p className="mt-0.5 text-[0.82rem] text-ink-muted">{site.contacts.email}</p>
                  <p className="mt-1.5 text-[0.79rem] leading-relaxed text-ink-muted">
                    Для технических заданий и документов.
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                aria-hidden
              />
            </a>

            <div className="rounded-xl border border-line p-5">
              <div className="flex gap-4">
                <span className="flex size-9 items-center justify-center rounded-lg bg-brand-soft text-brand">
                  <Clock className="size-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.9rem] font-medium text-ink">Формат работы</p>
                  <p className="mt-1 text-[0.82rem] leading-relaxed text-ink-muted">
                    Удалённо, в удобном канале: Telegram, почта, видеозвонки. Часовой пояс и график
                    созвонов согласуем на старте. Техническая поддержка — в рабочие часы.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-line p-5">
              <p className="flex items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ink-muted">
                <MessageSquare className="size-3.5" aria-hidden />
                Реквизиты и договор
              </p>
              <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-muted">
                Работаем по договору, реквизиты и условия предоставляем после обсуждения задачи.
                Персональные данные обрабатываются согласно{" "}
                <Link href="/privacy" className="text-brand underline underline-offset-2">
                  политике конфиденциальности
                </Link>
                .
              </p>
            </div>

            <div className="rounded-xl border border-line p-5">
              <p className="text-[0.75rem] font-medium uppercase tracking-[0.08em] text-ink-muted">
                Услуги
              </p>
              <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5">
                {directions.map((direction) => (
                  <li key={direction.slug}>
                    <Link
                      href={`/${direction.slug}`}
                      className="text-[0.79rem] text-ink-muted transition-colors hover:text-brand"
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
