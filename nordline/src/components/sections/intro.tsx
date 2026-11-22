import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { asset } from "@/lib/asset";

const facts = [
  {
    value: "04",
    label: "направления поставки",
    text: "Оборудование, гидравлика, конвейеры и комплектующие — в одной точке ответственности.",
  },
  {
    value: "01",
    label: "контакт на проект",
    text: "Инженер ведёт задачу от первого разговора до отгрузки и пусконаладки.",
  },
  {
    value: "РФ",
    label: "география поставок",
    text: "Работа с площадками по всей России, включая удалённые производства.",
  },
];

export function Intro() {
  return (
    <section id="about" className="bg-paper py-20 md:py-28">
      <div className="shell">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-4">
              <span className="label text-accent">02</span>
              <span className="label text-graphite/75">О компании</span>
            </div>
            <h2 className="display mt-6 max-w-[16ch] text-[clamp(2.25rem,4.8vw,4.75rem)]">
              Промышленность не терпит{" "}
              <span className="text-accent">случайных</span> решений
            </h2>
            <p className="mt-8 max-w-xl text-[0.9375rem] leading-relaxed text-graphite/75 lg:mt-10">
              Мы поставляем оборудование для участков, где остановка стоит дороже самой техники.
              Поэтому в основе работы — не каталог, а расчёт: нагрузка, среда, режим эксплуатации
              и совместимость с тем, что уже установлено на площадке.
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:col-span-4 lg:col-start-9 lg:pt-14">
            <p className="text-[0.9375rem] leading-relaxed text-graphite/75">
              Поэтому мы начинаем не с прайса, а с разбора задачи: что происходит на площадке,
              в каком режиме работает оборудование и что должно измениться после поставки.
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-graphite/75">
              Если нужной позиции нет у производителя, подбираем функциональный аналог и сверяем
              присоединительные размеры — замена не должна требовать переделки обвязки.
            </p>
            <div className="border-t border-graphite/15 pt-4">
              <span className="label text-graphite/60">Проверяем до отгрузки</span>
              <ul className="mt-3 flex flex-col gap-2 text-[0.8125rem] text-graphite/75">
                <li className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                  Нагрузку, среду и режим работы оборудования
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                  Совместимость с существующей обвязкой и приводом
                </li>
                <li className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 bg-accent" aria-hidden="true" />
                  Комплектность партии и документацию
                </li>
              </ul>
            </div>
            <a
              href="#directions"
              className="group inline-flex w-fit items-center gap-3 border-b border-graphite/25 pb-2 text-[0.8125rem] font-semibold tracking-wide transition-colors hover:border-accent hover:text-accent"
            >
              Смотреть направления
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        </Reveal>

        <Reveal className="mt-14 md:mt-20" delay={0.1}>
          <figure className="relative">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-mist md:aspect-[16/7]">
              <Image
                src={asset("/images/intro-line.jpg")}
                alt="Промышленный участок с насосными агрегатами и трубной обвязкой"
                fill
                sizes="100vw"
                className="object-cover object-[50%_45%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,24,22,0.55),transparent_55%)]" />
              <figcaption className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 md:bottom-6 md:left-6 md:right-6">
                <span className="label text-paper/85">Насосное оборудование и трубная обвязка</span>
                <span className="label text-[0.5625rem] text-paper/75">Демонстрационное фото</span>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        <div className="mt-12 grid gap-px border-t border-graphite/15 md:mt-16 md:grid-cols-3">
          {facts.map((fact, index) => (
            <Reveal
              key={fact.label}
              delay={index * 0.08}
              className="border-b border-graphite/15 py-7 md:border-b-0 md:border-r md:px-8 md:py-8 md:first:pl-0 md:last:border-r-0"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-bold tracking-tight md:text-3xl">{fact.value}</span>
                <span className="label text-graphite/75">{fact.label}</span>
              </div>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-graphite/75">{fact.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
