import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { asset } from "@/lib/asset";
import { chef } from "@/lib/content";

export function Chef() {
  return (
    <section id="chef" className="shell py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src={asset("/images/chef.jpg")}
              alt={chef.portraitAlt}
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
            <p className="label text-ink">{chef.name}</p>
            <p className="label text-[0.5rem] text-muted">{chef.role}</p>
          </div>
        </Reveal>

        <div className="md:col-span-7 md:pt-4">
          <Reveal>
            <p className="label flex items-baseline gap-3 text-muted">
              <span className="text-clay">03</span>
              Шеф
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <blockquote className="mt-7">
              <p className="font-display text-[clamp(1.6rem,3vw,2.6rem)] leading-[1.18] tracking-[-0.02em] text-ink">
                «{chef.quote}»
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.1} className="mt-9 grid gap-5 border-t border-line pt-7 sm:grid-cols-2">
            {chef.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-[0.875rem] leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.14} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="font-display text-[1.75rem] text-clay">{chef.signature}</span>
            <span className="label text-[0.5rem] text-muted">
              Кухня открыта до 23:00 · можно заглянуть
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
