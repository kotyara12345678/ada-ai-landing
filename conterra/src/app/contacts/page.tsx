import type { Metadata } from "next";
import { Mail, MessageSquare, Timer } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Контакты",
  description:
    "Обсудить инженерный или строительный проект: форма обращения, направления интереса и порядок ответа. Демонстрационные контакты концепта CONTERRA.",
  alternates: { canonical: canonical("/contacts") },
};

const channels = [
  {
    icon: Mail,
    title: "Почта концепта",
    value: site.demoEmail,
    note: "Демонстрационный адрес — реальная почта не подключена",
  },
  {
    icon: Timer,
    title: "Порядок ответа",
    value: "1 рабочий день",
    note: "Отвечаем по существу: что можно сделать и какие данные нужны",
  },
  {
    icon: MessageSquare,
    title: "Первый разговор",
    value: "20–30 минут",
    note: "Без презентаций: задача, ограничения, возможные варианты",
  },
];

export default function ContactsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Контакты"
        title="Обсудим задачу и следующий шаг"
        lead={
          <>
            Опишите объект и стадию, на которой вы находитесь. Если задача ещё не
            сформулирована — поможем собрать вводные и определить первый этап.
          </>
        }
        crumbs={[{ label: "Главная", href: "/" }, { label: "Контакты" }]}
        aside={
          <p className="border-l-2 border-teal pl-4 text-[0.8125rem] leading-relaxed text-graphite/65">
            {site.disclaimer}
          </p>
        }
      />

      <section className="border-b border-line bg-canvas py-12 md:py-16" aria-labelledby="contacts-title">
        <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <h2 id="contacts-title" className="eyebrow text-muted">
              Как связаться
            </h2>

            <ul className="mt-4 border-t border-line">
              {channels.map((channel) => (
                <li key={channel.title} className="border-b border-line py-4">
                  <div className="flex items-center gap-2 text-[0.75rem] uppercase tracking-[0.1em] text-muted">
                    <channel.icon className="size-3.5" aria-hidden="true" />
                    {channel.title}
                  </div>
                  <p className="mt-2 break-words font-display text-[1.0625rem] font-medium tracking-tight text-graphite">
                    {channel.title === "Почта концепта" ? (
                      <a href={`mailto:${channel.value}`} className="hover:text-navy">
                        {channel.value}
                      </a>
                    ) : (
                      channel.value
                    )}
                  </p>
                  <p className="mt-1 text-[0.75rem] leading-relaxed text-muted">{channel.note}</p>
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mt-8 text-muted">Что помогает с оценкой</h3>
            <ul className="mt-3 space-y-1.5 text-[0.8125rem] leading-relaxed text-graphite/70">
              <li>Назначение и предполагаемая площадь объекта</li>
              <li>Участок, регион, существующие ограничения</li>
              <li>Стадия: идея, проект, действующий объект</li>
              <li>Ориентиры по срокам и бюджету</li>
            </ul>

            <p className="mt-6 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-muted">
              Направления: {services.map((service) => service.name).join(", ")}.
            </p>
          </div>

          <div className="md:col-span-7 md:col-start-6">
            <div className="border border-line bg-paper p-5 md:p-7">
              <h2 className="font-display text-[1.375rem] font-medium tracking-tight text-graphite">
                Форма обращения
              </h2>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-graphite/65">
                Поля со звёздочкой обязательны. Форма проверяет данные на стороне браузера, а
                отправка подключается через API.
              </p>
              <div className="mt-6">
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
