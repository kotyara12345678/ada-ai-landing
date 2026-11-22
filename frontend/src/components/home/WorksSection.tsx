import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { works } from "@/config/works";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Ссылки на /works/* ведут на статические концепт-сайты, которые собраны
 * отдельными приложениями (aureon/ и nordline/), поэтому это обычные <a>,
 * а не next/link: клиентский роутер ADA не знает этих маршрутов.
 */
export function WorksSection({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="border-b border-line bg-surface py-12 md:py-16">
      <div className="container-page">
        {showHeading ? (
          <SectionHeading
            eyebrow="Работы"
            title="Демонстрационные сайты, сделанные целиком"
            description="Концепты для вымышленных брендов: структура, дизайн, вёрстка, анимации и адаптив. Открываются как отдельные страницы этого сайта — без редиректов на сторонние домены."
          />
        ) : null}

        <div className={showHeading ? "mt-8 grid gap-4 md:grid-cols-2" : "grid gap-4 md:grid-cols-2"}>
          {works.map((work, index) => (
            <Reveal key={work.slug} delay={index * 0.05}>
              <a
                href={work.href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface-muted transition-colors hover:border-line-strong"
              >
                <div className="relative aspect-[16/10] overflow-hidden border-b border-line">
                  <Image
                    src={work.cover}
                    alt={work.coverAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-[1.05rem] font-semibold text-ink">{work.name}</h3>
                      <p className="mt-0.5 text-[0.78rem] text-ink-muted">{work.discipline}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 size-4 shrink-0 text-ink-muted transition-colors group-hover:text-brand"
                      aria-hidden
                    />
                  </div>

                  <p className="mt-3 text-[0.86rem] leading-relaxed text-ink-muted">{work.summary}</p>

                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {work.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.68rem] text-ink-muted"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-5 inline-flex items-center gap-1 text-[0.82rem] font-semibold text-brand">
                    Открыть сайт
                    <span aria-hidden>→</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
