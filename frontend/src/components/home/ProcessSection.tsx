import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

const steps = [
  {
    step: "01",
    title: "Бриф и оценка",
    text: "30 минут разговора: что нужно бизнесу, что уже есть и какой результат считается успехом.",
    meta: "1 день",
  },
  {
    step: "02",
    title: "Прототип и смета",
    text: "Показываем структуру и объём первой версии. Фиксируем цену, сроки и этапы оплаты.",
    meta: "2–3 дня",
  },
  {
    step: "03",
    title: "Разработка",
    text: "Идём итерациями и показываем результат каждую неделю. Тестируем ключевые сценарии.",
    meta: "от 1 недели",
  },
  {
    step: "04",
    title: "Запуск и поддержка",
    text: "Домен, HTTPS, сервер, резервные копии и мониторинг. Дальше — поддержка по тарифу.",
    meta: "1–2 дня",
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="relative scroll-mt-24 overflow-hidden bg-ink-deep py-14 text-white md:py-28">
      <div aria-hidden className="tech-grid absolute inset-0 opacity-70" />
      <div className="container-page relative grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="flex items-center gap-2.5">
            <span className="h-px w-7 bg-lime" aria-hidden />
            <p className="eyebrow eyebrow-invert">Как мы работаем</p>
          </div>
          <h2 className="mt-4 max-w-lg text-h2">
            От брифа до запуска — четыре понятных шага
          </h2>
          <p className="mt-4 max-w-md text-[0.98rem] leading-relaxed text-white/55">
            Вы всегда знаете, на каком этапе проект, сколько он стоит и что получите на выходе.
            Первый разговор ни к чему не обязывает.
          </p>

          <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10 lg:mt-8">
            <Image
              src="/visuals/workspace-code.jpg"
              alt="Рабочее место разработчика: ноутбук с кодом проекта"
              width={1400}
              height={1000}
              sizes="(min-width: 1024px) 520px, 100vw"
              className="h-36 w-full object-cover md:h-64"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
              <p className="text-[0.82rem] font-medium text-white/80">
                Прототип → смета → запуск
              </p>
              <Link
                href="/contacts"
                className="inline-flex items-center gap-1 text-[0.8rem] font-semibold text-lime hover:text-white"
              >
                Начать
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <ol className="border-t border-white/10">
          {steps.map((item) => (
            <li
              key={item.step}
              className="group grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-b border-white/10 py-5 md:grid-cols-[4.5rem_1fr_auto] md:items-start md:gap-7 md:py-7"
            >
              <span className="font-display text-[1.05rem] font-semibold tracking-[0.1em] text-lime/80 transition-colors group-hover:text-lime">
                {item.step}
              </span>
              <div>
                <h3 className="text-h3 text-white">{item.title}</h3>
                <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-white/50">
                  {item.text}
                </p>
              </div>
              <span className="col-start-2 w-fit rounded-full border border-white/15 px-2.5 py-1 text-[0.72rem] text-white/50 md:col-start-auto">
                {item.meta}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className="container-page relative mt-8 lg:mt-10">
        <LinkButton href="/contacts" variant="lime" size="lg" withArrow>
          Обсудить проект
        </LinkButton>
      </div>
    </section>
  );
}
