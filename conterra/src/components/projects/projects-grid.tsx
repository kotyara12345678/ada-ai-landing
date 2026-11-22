"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/components/ui/route-link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectCategories, projects, type ProjectCategory } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

type Filter = ProjectCategory | "Все";

export function ProjectsGrid() {
  const [filter, setFilter] = useState<Filter>("Все");
  const reduced = useReducedMotion();

  const visible = useMemo(
    () => (filter === "Все" ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  );

  return (
    <section className="border-b border-line bg-canvas py-10 md:py-14" aria-labelledby="projects-grid-title">
      <div className="shell">
        <div className="flex flex-col gap-4 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 id="projects-grid-title" className="eyebrow text-muted">
              Демонстрационные концепты
            </h2>
            <p className="mt-2 text-[0.875rem] text-graphite/70">
              Показано {visible.length} из {projects.length}
            </p>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр проектов по направлению">
            {projectCategories.map((category) => {
              const selected = category === filter;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={selected}
                  className={cn(
                    "border px-3.5 py-2 text-[0.8125rem] transition-colors",
                    selected
                      ? "border-navy bg-navy text-white"
                      : "border-line bg-paper text-graphite/70 hover:border-graphite/40 hover:text-graphite",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-8">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project, index) => (
              <motion.article
                key={project.slug}
                layout={!reduced}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: reduced ? 0 : index * 0.03, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-line">
                    <Image
                      src={asset(project.image)}
                      alt={project.imageAlt}
                      fill
                      sizes="(min-width: 768px) 46vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-0 top-0 bg-canvas/92 px-2.5 py-1.5 text-[0.625rem] uppercase tracking-[0.12em] text-graphite/70">
                      Концепт
                    </span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div>
                      <p className="eyebrow text-muted">
                        {project.category} · {project.year}
                      </p>
                      <h3 className="mt-2 font-display text-[1.25rem] font-medium tracking-tight text-graphite transition-colors group-hover:text-navy">
                        {project.name}
                      </h3>
                      <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-graphite/65">
                        {project.summary}
                      </p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 size-5 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                      aria-hidden="true"
                    />
                  </div>

                  <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-3 text-[0.75rem] text-muted">
                    <div className="flex gap-1.5">
                      <dt className="sr-only">Локация</dt>
                      <dd>{project.location}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="sr-only">Площадь</dt>
                      <dd>{project.specs[0]?.value}</dd>
                    </div>
                  </dl>
                </Link>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {visible.length === 0 ? (
          <p className="mt-10 border border-line bg-paper p-6 text-[0.9375rem] text-graphite/70">
            В этом направлении пока нет проектов. Выберите другой фильтр.
          </p>
        ) : null}
      </div>
    </section>
  );
}
