import { Link } from "@/components/ui/route-link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";

const formats = [
  {
    index: "A",
    title: "Полный цикл",
    text: "Концепция, проект, строительство, инженерные системы и передача объекта в эксплуатацию. Один договор и один ответственный.",
    best: "Для нового объекта или комплексной реконструкции",
  },
  {
    index: "B",
    title: "Проектирование",
    text: "Проектная и рабочая документация без строительства. Документация готова к передаче любому подрядчику.",
    best: "Для собственной строительной команды",
  },
  {
    index: "C",
    title: "Сопровождение",
    text: "Технический надзор, проверка решений подрядчика, приёмка этапов и помощь службе эксплуатации.",
    best: "Когда объект уже строится",
  },
];

/** Три формата сотрудничества — другой тип композиции, чтобы страница не была однотипной. */
export function Formats() {
  return (
    <section className="border-b border-line bg-paper py-14 md:py-20" aria-labelledby="formats-title">
      <div className="shell">
        <SectionHead
          index="05"
          eyebrow="Форматы"
          title="Можно взять весь цикл или отдельный этап"
          description="Формат зависит от того, что уже есть у заказчика: участок, проект, подрядчик или действующий объект."
        />

        <h2 id="formats-title" className="sr-only">
          Форматы сотрудничества
        </h2>

        <div className="mt-10 grid gap-0 border-t border-line md:grid-cols-3">
          {formats.map((format, index) => (
            <Reveal
              key={format.index}
              delay={index * 0.05}
              className="group border-b border-line py-6 md:border-b-0 md:border-r md:px-6 md:py-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="font-display text-[2.5rem] font-medium leading-none tracking-tight text-line transition-colors group-hover:text-teal/40">
                  {format.index}
                </span>
                <ArrowUpRight className="size-4 text-muted" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-[1.25rem] font-medium tracking-tight text-graphite">
                {format.title}
              </h3>
              <p className="mt-2 text-[0.875rem] leading-relaxed text-graphite/70">{format.text}</p>
              <p className="mt-5 border-t border-line pt-3 text-[0.75rem] leading-snug text-muted">
                {format.best}
              </p>
            </Reveal>
          ))}
        </div>

        <Link href="/contacts" className="link-arrow mt-8">
          Обсудить формат работы
          <ArrowUpRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
