import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectPreview } from "@/components/portfolio/ProjectPreview";
import { projects } from "@/config/portfolio";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectsShowcase() {
  return (
    <section className="border-b border-muted/15 bg-forest/30 py-16 md:py-24">
      <div className="container-page">
        <SectionHeading
          index="03"
          eyebrow="Избранные проекты"
          title="Продукты, которые мы делаем"
          description="Внутренние и клиентские проекты: от ассистента по документам до голосового агента. Без выдуманных метрик — только задача, решение и стек."
          align="between"
        />

        <div className="mt-12 flex flex-col gap-14 md:mt-16 md:gap-20">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={0.05}>
              <article className="grid gap-8 border-t border-muted/20 pt-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
                <div className="flex flex-col">
                  <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/70">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="h-px w-8 bg-muted/25" aria-hidden />
                    <span>{project.status}</span>
                    <span className="text-muted/30">/</span>
                    <span>{project.year}</span>
                  </div>

                  <h3 className="mt-5 font-display text-[1.65rem] font-semibold tracking-tight text-bone md:text-[2rem]">
                    {project.name}
                    <span className="mt-1 block font-sans text-[0.95rem] font-normal tracking-normal text-emerald/90">
                      {project.subtitle}
                    </span>
                  </h3>

                  <p className="mt-4 max-w-md text-[0.92rem] leading-relaxed text-muted">{project.summary}</p>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.slice(0, 5).map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-muted/20 px-2.5 py-1 font-mono text-[0.62rem] tracking-wide text-bone/60"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/portfolio#${project.slug}`}
                    className="group mt-7 inline-flex items-center gap-2 text-[0.84rem] text-bone/80 transition-colors hover:text-emerald"
                  >
                    Разбор проекта
                    <ArrowUpRight
                      className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </div>

                <ProjectPreview project={project} />
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 border-b border-muted/25 pb-1 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted transition-colors hover:border-emerald hover:text-bone"
          >
            Все проекты
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
