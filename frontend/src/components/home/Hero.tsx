import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";

const priceRows = [
  { title: "Лендинг", note: "Страница + форма заявки", price: "от 7 000 ₽", href: "/web-development" },
  { title: "Корпоративный сайт", note: "Разделы, SEO, аналитика", price: "от 15 000 ₽", href: "/web-development" },
  { title: "Telegram-бот", note: "Заявки и уведомления", price: "от 5 000 ₽", href: "/chatbots" },
  { title: "AI-агент", note: "Ответы по вашим данным", price: "от 12 000 ₽", href: "/ai-development" },
];

const facts = [
  { value: "10", label: "направлений разработки и поддержки" },
  { value: "от 7 000 ₽", label: "стартовая цена проекта" },
  { value: "от 1 490 ₽", label: "поддержка в месяц" },
  { value: "100%", label: "код и доступы остаются у вас" },
];

const guarantees = ["Оценка бесплатно", "Договор и поэтапная оплата", "Ответ в течение рабочего дня"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink-deep text-white">
      <div aria-hidden className="tech-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute -right-32 -top-32 size-[34rem] rounded-full bg-brand/25 blur-[130px]"
      />

      <div className="container-page relative">
        <div className="grid gap-14 pb-14 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-20 lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[0.74rem] font-medium text-white/75">
              <span className="size-1.5 rounded-full bg-lime" aria-hidden />
              Студия разработки и поддержки · ADA
            </span>

            <h1 className="mt-6 text-display">
              Сайт, сервис или AI-бот{" "}
              <span className="text-lime">под ключ</span>
            </h1>

            <p className="mt-4 font-display text-[clamp(1.25rem,2.2vw,1.9rem)] font-semibold leading-tight tracking-tight text-white/90">
              Цена и срок — до начала работ.
            </p>

            <p className="mt-5 max-w-xl text-[1rem] leading-relaxed text-white/60">
              Проектируем, разрабатываем и обслуживаем цифровые продукты для бизнеса. Показываем
              промежуточный результат и остаёмся рядом после запуска.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <LinkButton href="/contacts" variant="lime" size="lg" withArrow className="w-full sm:w-auto">
                Получить оценку
              </LinkButton>
              <LinkButton href="#prices" variant="outline-light" size="lg" className="w-full sm:w-auto">
                Цены и тарифы
              </LinkButton>
            </div>

            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {guarantees.map((item) => (
                <li key={item} className="flex items-center gap-1.5 text-[0.8rem] text-white/55">
                  <Check className="size-3.5 text-lime" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="rounded-2xl bg-white p-5 text-ink shadow-panel ring-1 ring-white/10 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                    Стартовые цены
                  </p>
                  <p className="mt-1 font-display text-[1.15rem] font-semibold text-ink">
                    Что можно запустить
                  </p>
                </div>
                <span className="hidden rounded-full bg-surface-muted px-2.5 py-1 text-[0.66rem] font-medium text-ink-muted sm:inline-block">
                  без скрытых строк
                </span>
              </div>

              <ul className="mt-5 border-t border-line">
                {priceRows.map((row) => (
                  <li key={row.title} className="border-b border-line">
                    <Link
                      href={row.href}
                      className="group flex items-center justify-between gap-4 py-3.5"
                    >
                      <span>
                        <span className="flex items-center gap-1.5 text-[0.92rem] font-semibold text-ink">
                          {row.title}
                          <ArrowUpRight
                            className="size-3.5 text-ink-muted opacity-0 transition group-hover:opacity-100"
                            aria-hidden
                          />
                        </span>
                        <span className="mt-0.5 block text-[0.76rem] text-ink-muted">{row.note}</span>
                      </span>
                      <span className="whitespace-nowrap text-[0.92rem] font-semibold text-ink">
                        {row.price}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <p className="max-w-[13rem] text-[0.75rem] leading-snug text-ink-muted">
                  Точная смета — после бесплатного брифа.
                </p>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-1 text-[0.82rem] font-semibold text-brand hover:text-brand-dark"
                >
                  Весь прайс-лист
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 rounded-lg bg-ink px-4 py-3 text-white">
                <div>
                  <p className="text-[0.6rem] uppercase tracking-[0.12em] text-white/45">
                    Поддержка после запуска
                  </p>
                  <p className="mt-0.5 text-[0.92rem] font-semibold text-lime">от 1 490 ₽/мес</p>
                </div>
                <Link
                  href="/maintenance"
                  className="inline-flex items-center gap-1 text-[0.76rem] font-medium text-white/70 hover:text-lime"
                >
                  Тарифы
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>

            <div className="absolute -top-3 right-5 rotate-2 rounded-md bg-lime px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-ink shadow-lg">
              Смета до старта
            </div>

          </div>
        </div>

        <dl className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 sm:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-ink-deep px-4 py-6 sm:px-5">
              <dt className="font-display text-[1.35rem] font-semibold tracking-tight text-lime sm:text-[1.5rem]">
                {fact.value}
              </dt>
              <dd className="mt-1 text-[0.76rem] leading-snug text-white/45">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
