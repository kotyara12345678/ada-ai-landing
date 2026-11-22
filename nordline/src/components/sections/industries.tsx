import Image from "next/image";
import { industries } from "@/lib/content";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

const layout = [
  "md:col-span-7 md:h-[32rem]",
  "md:col-span-5 md:h-[32rem]",
  "md:col-span-5 md:mt-16 md:h-[26rem]",
  "md:col-span-7 md:mt-16 md:h-[26rem]",
];

export function Industries() {
  return (
    <section id="industries" className="bg-mist py-20 md:py-28">
      <div className="shell">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <div className="flex items-baseline gap-4">
              <span className="label text-accent">06</span>
              <span className="label text-graphite/75">Отрасли</span>
            </div>
            <h2 className="display mt-6 max-w-[20ch] text-[clamp(2rem,4.4vw,4.25rem)]">
              Отрасли, где цена простоя выше цены оборудования
            </h2>
          </div>
          <div className="lg:col-span-3 lg:col-start-10 lg:pt-12">
            <p className="text-[0.9375rem] leading-relaxed text-graphite/75">
              Понимаем режимы работы и ограничения площадок в четырёх отраслях. Это влияет на
              подбор материалов, запаса и формата сопровождения.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12 md:gap-6">
          {industries.map((industry, index) => (
            <Reveal
              key={industry.id}
              delay={(index % 2) * 0.08}
              className={cn("group relative h-[20rem] sm:h-[24rem]", layout[index])}
            >
              <figure className="relative h-full w-full overflow-hidden bg-graphite/10">
                <Image
                  src={asset(industry.image)}
                  alt={industry.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,24,22,0.94)_0%,rgba(21,24,22,0.4)_42%,rgba(21,24,22,0.05)_72%)]" />
                <figcaption className="absolute inset-x-0 bottom-0 p-5 text-paper md:p-7">
                  <span className="label text-paper/70">{`0${index + 1}`} / Отрасль</span>
                  <h3 className="mt-2 max-w-[13ch] text-[1.25rem] font-bold leading-tight tracking-tight md:text-[1.75rem]">
                    {industry.title}
                  </h3>
                  <p className="mt-3 hidden max-w-sm text-[0.8125rem] leading-relaxed text-paper/75 lg:block">
                    {industry.text}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
