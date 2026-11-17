import { ArrowUpRight, Mail, Send } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { site } from "@/config/site";

export function CtaBlock() {
  return (
    <section className="relative overflow-hidden border-t border-muted/15 bg-graphite py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[130px]"
        style={{ background: "radial-gradient(circle, rgba(32,201,130,0.18), transparent 70%)" }}
        aria-hidden
      />

      <div className="container-page relative">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-emerald">Обсудим задачу</p>
            <h2 className="mt-5 max-w-2xl text-h2 text-bone">
              Расскажите, что нужно сделать.
              <br />
              <span className="text-muted">Остальное — наша работа.</span>
            </h2>
            <p className="mt-5 max-w-lg text-[0.98rem] leading-relaxed text-muted">
              Разберём задачу, предложим архитектуру и назовём стоимость со сроками. Оценка бесплатна
              и не обязывает начинать работы.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <LinkButton href="/contacts" size="lg" withArrow className="w-full sm:w-auto sm:self-start">
              Обсудить проект
            </LinkButton>
            <div className="flex flex-col gap-2 border-t border-muted/15 pt-4">
              <a
                href={site.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-2 text-[0.86rem] text-bone/80 transition-colors hover:text-emerald"
              >
                <span className="inline-flex items-center gap-2">
                  <Send className="size-3.5 text-muted" aria-hidden />
                  Telegram {site.contacts.telegramHandle}
                </span>
                <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
              <a
                href={`mailto:${site.contacts.email}`}
                className="group inline-flex items-center justify-between gap-2 text-[0.86rem] text-bone/80 transition-colors hover:text-emerald"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail className="size-3.5 text-muted" aria-hidden />
                  {site.contacts.email}
                </span>
                <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/50">
              Ответим в течение рабочего дня
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
