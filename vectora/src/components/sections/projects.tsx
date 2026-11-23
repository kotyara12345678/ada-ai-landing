import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { projects, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

// При статическом экспорте next/image не добавляет basePath к путям картинок.
const basePath = process.env.NEXT_PUBLIC_WORKS_BASE_PATH ?? "";

/** Обложка проекта: фотография в единой тёмной тональности + служебные метки. */
function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-line bg-deep">
      <Image
        src={`${basePath}${project.image}`}
        alt={project.imageAlt}
        fill
        sizes="(max-width: 768px) 100vw, 55vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(8,11,9,0.72)_0%,rgba(8,11,9,0.12)_45%,rgba(8,11,9,0.28)_100%)]"
        aria-hidden="true"
      />

      <span className="mono absolute left-4 top-4 text-[0.5rem] tracking-[0.24em] text-white/70">
        {project.index}
      </span>
      <span className="mono absolute right-4 top-4 text-[0.5rem] tracking-[0.24em] text-white/45">
        Concept
      </span>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative border-b border-line py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="04"
          label="Проекты"
          title="Системы, а не просто сайты"
          description="Четыре концептуальных кейса: что было задачей, как устроено решение и какие компоненты в нём работают."
          aside={
            <span className="mono max-w-[14rem] text-[0.5625rem] leading-relaxed text-muted">
              Все проекты — демонстрационные концепты. Реальных клиентов и заказов за ними нет.
            </span>
          }
        />

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-12 md:gap-6">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.05} className={cn("md:col-span-6", spans[index])}>
              <article className="group flex h-full flex-col">
                <ProjectVisual project={project} />

                <div className="mt-4 flex flex-1 flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[1.125rem] font-medium tracking-tight text-text md:text-[1.25rem]">
                      {project.name}
                    </h3>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-lime"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="mono mt-2 text-[0.5rem] tracking-[0.24em] text-emerald/80">
                    {project.category}
                  </p>
                  <p className="mt-3 max-w-lg text-[0.875rem] leading-relaxed text-muted">
                    {project.summary}
                  </p>

                  <dl className="mt-4 grid gap-1.5 border-t border-line pt-3">
                    {project.facts.map((fact) => (
                      <div key={fact.label} className="flex items-baseline justify-between gap-4">
                        <dt className="mono text-[0.5rem] tracking-[0.18em] text-muted/65">{fact.label}</dt>
                        <dd className="text-right text-[0.75rem] text-muted">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-line px-2.5 py-1 text-[0.6875rem] text-muted/85"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
