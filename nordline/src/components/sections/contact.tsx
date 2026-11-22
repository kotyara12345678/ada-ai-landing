import { Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/lib/content";
import { LeadForm } from "@/components/contact/lead-form";
import { Reveal } from "@/components/ui/reveal";

export function Contact() {
  return (
    <section id="contacts" className="bg-paper py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <div className="flex items-baseline gap-4">
              <span className="label text-accent">08</span>
              <span className="label text-graphite/75">Контакты</span>
            </div>
            <h2 className="display mt-6 max-w-[12ch] text-[clamp(2.25rem,4.6vw,4.25rem)]">
              Обсудим вашу задачу
            </h2>
            <p className="mt-6 max-w-md text-[0.9375rem] leading-relaxed text-graphite/70">
              Напишите, что нужно подобрать или заменить. Если задача ещё не сформулирована —
              поможем определить направление и собрать исходные данные.
            </p>

            <dl className="mt-10 flex flex-col gap-5">
              <div className="flex items-start gap-4 border-b border-graphite/12 pb-5">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <dt className="label text-[0.5rem] text-graphite/70">Телефон</dt>
                  <dd className="mt-1">
                    <a
                      href={company.phoneHref}
                      className="text-lg font-semibold transition-colors hover:text-accent"
                    >
                      {company.phone}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-graphite/12 pb-5">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <dt className="label text-[0.5rem] text-graphite/70">Почта</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${company.email}`}
                      className="text-lg font-semibold transition-colors hover:text-accent"
                    >
                      {company.email}
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-4 border-b border-graphite/12 pb-5">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <div>
                  <dt className="label text-[0.5rem] text-graphite/70">Офис</dt>
                  <dd className="mt-1 text-[0.9375rem] font-medium">{company.address}</dd>
                  <dd className="mt-1 text-sm text-graphite/75">{company.hours}</dd>
                </div>
              </div>
            </dl>

            <p className="mt-6 max-w-sm text-[0.6875rem] leading-relaxed text-graphite/70">
              Контактные данные приведены в качестве заглушки для демонстрационного концепта.
              Действующий номер и адрес не используются.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <LeadForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
