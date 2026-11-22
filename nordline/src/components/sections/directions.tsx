import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { directions } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

export function Directions() {
  return (
    <section id="directions" className="bg-mist py-20 md:py-28">
      <div className="shell">
        <Reveal>
          <SectionHead
            index="03"
            label="Направления"
            title={
              <>
                Четыре направления,
                <br />
                один инженерный контур
              </>
            }
            description={
              <>
                <p>
                  Поставка не разбивается на несвязанные позиции. Насос, привод и конвейер
                  подбираются как система, которая работает на общий технологический результат.
                </p>
                <p className="mt-4">
                  <a
                    href="#equipment"
                    className="inline-flex items-center gap-2 border-b border-graphite/30 pb-1 text-[0.8125rem] font-semibold text-graphite transition-colors hover:border-accent hover:text-accent"
                  >
                    Перейти к каталогу
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </p>
              </>
            }
          />
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:mt-20 md:grid-cols-2 md:gap-y-20">
          {directions.map((direction, index) => (
            <Reveal
              key={direction.id}
              delay={(index % 2) * 0.08}
              className={cn(index % 2 === 1 && "md:mt-16")}
            >
              <article className="group">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-graphite/10">
                  <Image
                    src={asset(direction.image)}
                    alt={direction.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
                  />
                  <span className="label absolute left-4 top-4 bg-graphite/80 px-2.5 py-1.5 text-[0.5625rem] text-paper">
                    {direction.index}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-6 border-b border-graphite/15 pb-4">
                  <h3 className="text-[1.375rem] font-bold leading-tight tracking-tight md:text-[1.625rem]">
                    {direction.title}
                  </h3>
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-graphite/20 text-graphite transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-graphite">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-4 max-w-lg text-sm leading-relaxed text-graphite/70">
                  {direction.description}
                </p>

                <ul className="mt-5 flex flex-wrap gap-2">
                  {direction.items.map((item) => (
                    <li
                      key={item}
                      className="label border border-graphite/15 px-2.5 py-1.5 text-[0.5625rem] tracking-[0.1em] text-graphite/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
