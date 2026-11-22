import { Link } from "@/components/ui/route-link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { services } from "@/lib/services";

/** Направления — не карточки, а редакционный список с крупной типографикой. */
export function Directions() {
  return (
    <section className="border-b border-line bg-canvas py-14 md:py-20" aria-labelledby="directions-title">
      <div className="shell">
        <SectionHead
          index="01"
          eyebrow="Направления"
          title="Четыре направления, одна ответственность"
          description="Можно заказать отдельный этап или весь цикл: команда одна, а решения на каждом этапе учитывают следующий."
          link={{ label: "Все услуги", href: "/services" }}
        />

        <h2 id="directions-title" className="sr-only">
          Направления деятельности
        </h2>

        <ul className="mt-10 border-t border-line">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={index * 0.04} className="border-b border-line">
              <Link
                href={`/services#${service.slug}`}
                className="group grid items-start gap-4 py-6 transition-colors hover:bg-paper md:grid-cols-12 md:gap-6 md:py-7"
              >
                <span className="flex items-baseline gap-3 md:col-span-2">
                  <span className="eyebrow text-teal">{service.index}</span>
                </span>

                <span className="md:col-span-4">
                  <span className="font-display text-[1.5rem] font-medium leading-tight tracking-tight text-graphite transition-colors group-hover:text-navy md:text-[1.75rem]">
                    {service.name}
                  </span>
                  <span className="mt-1 block text-[0.75rem] text-muted">{service.tagline}</span>
                </span>

                <span className="text-[0.9375rem] leading-relaxed text-graphite/70 md:col-span-5">
                  {service.summary}
                </span>

                <span className="flex justify-start md:col-span-1 md:justify-end">
                  <ArrowUpRight
                    className="size-5 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[0.8125rem] leading-relaxed text-muted">
            Проект, строительство и инженерные системы можно вести по отдельности — в этом случае
            мы подключаемся к вашей команде на конкретном этапе.
          </p>
          <Link href="/services" className="link-arrow shrink-0">
            Как мы работаем
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
