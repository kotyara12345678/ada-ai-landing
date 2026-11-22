import { Link } from "@/components/ui/route-link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { directionsShort } from "@/lib/site";

export function Intro() {
  return (
    <section className="border-b border-line bg-paper" aria-labelledby="intro-title">
      <div className="shell grid gap-10 py-14 md:grid-cols-12 md:gap-8 md:py-20">
        <Reveal className="md:col-span-5">
          <p className="eyebrow text-teal">О компании</p>
          <h2 id="intro-title" className="h2 mt-4 max-w-[16ch]">
            Инфраструктура, которую можно планировать на годы
          </h2>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-6 md:col-start-7">
          <div className="space-y-4 text-[0.9375rem] leading-relaxed text-graphite/75">
            <p>
              CONTERRA проектирует и строит объекты, которые работают на бизнес-задачу:
              производственные корпуса, логистические центры, офисные здания и инженерную
              инфраструктуру. Мы начинаем с технологии и экономики объекта, а не с готового
              шаблона.
            </p>
            <p>
              Проектирование, строительство и инженерные системы ведёт одна команда. Поэтому
              решения не расходятся между разделами, а изменения на площадке не превращаются
              в переделку документации.
            </p>
          </div>

          <ul className="mt-8 grid gap-x-6 gap-y-2.5 border-t border-line pt-5 sm:grid-cols-2">
            {directionsShort.map((direction) => (
              <li key={direction} className="flex items-baseline gap-2.5 text-[0.875rem] text-graphite/80">
                <span className="mt-1.5 size-1 shrink-0 bg-teal" aria-hidden="true" />
                {direction}
              </li>
            ))}
          </ul>

          <Link href="/about" className="link-arrow mt-7">
            Подробнее о подходе
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
