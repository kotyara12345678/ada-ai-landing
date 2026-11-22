import Image from "next/image";
import { Link } from "@/components/ui/route-link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { featuredProjects } from "@/lib/projects";
import { asset } from "@/lib/asset";

/** Избранные проекты: крупный первый объект и два поменьше — асимметричная сетка. */
export function FeaturedProjects() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section className="border-b border-line bg-paper py-14 md:py-20" aria-labelledby="featured-title">
      <div className="shell">
        <SectionHead
          index="02"
          eyebrow="Проекты"
          title="Объекты, в которых видно инженерную логику"
          description="Четыре концептуальных кейса: производство, логистика, коммерческая недвижимость и инженерная модернизация."
          link={{ label: "Все проекты", href: "/projects" }}
        />

        <h2 id="featured-title" className="sr-only">
          Избранные проекты
        </h2>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Link href={`/projects/${lead.slug}`} className="group block">
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-line">
                <Image
                  src={asset(lead.image)}
                  alt={lead.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="eyebrow text-muted">
                    {lead.category} · {lead.year}
                  </p>
                  <h3 className="h3 mt-2 text-graphite transition-colors group-hover:text-navy">
                    {lead.name}
                  </h3>
                  <p className="mt-2 max-w-lg text-[0.875rem] leading-relaxed text-graphite/65">
                    {lead.summary}
                  </p>
                </div>
                <ArrowUpRight
                  className="mt-1 size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                  aria-hidden="true"
                />
              </div>
            </Link>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-8">
            {rest.map((project, index) => (
              <Reveal key={project.slug} delay={0.06 * (index + 1)}>
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-line">
                    <Image
                      src={asset(project.image)}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="eyebrow text-muted">
                        {project.category} · {project.year}
                      </p>
                      <h3 className="mt-1.5 font-display text-[1.125rem] font-medium tracking-tight text-graphite transition-colors group-hover:text-navy">
                        {project.name}
                      </h3>
                    </div>
                    <ArrowUpRight
                      className="mt-0.5 size-4 shrink-0 text-muted transition-colors group-hover:text-teal"
                      aria-hidden="true"
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <p className="mt-8 text-[0.75rem] leading-relaxed text-muted">
          Все проекты на сайте — демонстрационные концепты. Названия, локации, площади и сроки
          приведены для иллюстрации подхода и не являются выполненными заказами.
        </p>
      </div>
    </section>
  );
}
