import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { asset } from "@/lib/asset";
import { gallery } from "@/lib/content";
import { site } from "@/lib/site";

export function Room() {
  return (
    <section id="room" className="border-y border-line bg-paper">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <Reveal>
              <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                <Image
                  src={asset(gallery[0].src)}
                  alt={gallery[0].alt}
                  fill
                  sizes="(min-width: 768px) 56vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <p className="label text-muted">{gallery[0].caption}</p>
                <p className="text-[0.8125rem] text-muted">{gallery[0].title}</p>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <div className="relative aspect-[16/10] overflow-hidden bg-sand">
                <Image
                  src={asset(gallery[1].src)}
                  alt={gallery[1].alt}
                  fill
                  sizes="(min-width: 768px) 56vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-4">
                <p className="label text-muted">{gallery[1].caption}</p>
                <p className="text-[0.8125rem] text-muted">{gallery[1].title}</p>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5 md:pt-2">
            <Reveal>
              <p className="label flex items-baseline gap-3 text-muted">
                <span className="text-clay">04</span>
                Зал
              </p>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="h2 mt-7">
                Тёплый свет,
                <br />
                тихая музыка
                <br />
                <span className="text-muted">и открытая кухня</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
                Сорок два места в зале и четырнадцать у бара. Терракота, дуб и льняные скатерти —
                ничего, что перебивало бы еду и разговор.
              </p>
            </Reveal>

            <Reveal delay={0.14} className="mt-9 border-t border-line">
              <dl>
                {site.hours.map((row) => (
                  <div
                    key={row.days}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-3"
                  >
                    <dt className="text-[0.8125rem] text-ink/75">{row.days}</dt>
                    <dd className="text-[0.8125rem] tabular-nums text-muted">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>

            <Reveal delay={0.18} className="mt-7">
              <p className="label text-[0.5rem] text-muted">Адрес</p>
              <p className="mt-2 text-[0.9375rem] text-ink">{site.address}</p>
              <p className="text-[0.8125rem] text-muted">{site.addressNote}</p>
              <a
                href="#booking"
                className="mt-6 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-[0.8125rem] text-ink transition-colors hover:border-clay hover:text-clay"
              >
                Забронировать стол
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
