import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { projects, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

/** Абстрактная «обложка» проекта: свет, сетка и геометрия вместо стокового фото. */
function ProjectVisual({ project }: { project: Project }) {
  const [first, second] = project.palette;

  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl border border-line bg-deep">
      <div
        className="absolute inset-0 transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        style={{
          background: `radial-gradient(120% 90% at 18% 12%, ${first}33 0%, transparent 58%), radial-gradient(90% 80% at 84% 78%, ${second}26 0%, transparent 62%), linear-gradient(150deg, #0b100d 0%, #101612 100%)`,
        }}
      />
      <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:44px_44px]" />

      <svg
        viewBox="0 0 400 275"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`${project.slug}-stroke`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={first} stopOpacity="0.85" />
            <stop offset="100%" stopColor={second} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <g stroke={`url(#${project.slug}-stroke)`} fill="none" strokeWidth="1">
          <circle cx="300" cy="92" r="58" />
          <circle cx="300" cy="92" r="88" opacity="0.55" />
          <circle cx="300" cy="92" r="120" opacity="0.28" />
          <path d="M40 232 C 120 210, 168 150, 232 132 S 340 120, 380 62" opacity="0.55" />
          <path d="M40 252 C 132 236, 190 182, 250 164 S 348 152, 392 96" opacity="0.3" />
        </g>
        <g fill={second}>
          <circle cx="232" cy="132" r="2.4" />
          <circle cx="300" cy="92" r="2.8" />
          <circle cx="380" cy="62" r="1.8" />
        </g>
      </svg>

      <span className="mono absolute left-4 top-4 text-[0.5rem] tracking-[0.24em] text-white/55">
        {project.index}
      </span>
      <span className="mono absolute right-4 top-4 text-[0.5rem] tracking-[0.24em] text-white/35">
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
