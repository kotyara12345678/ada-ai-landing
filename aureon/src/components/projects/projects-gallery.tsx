"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { asset } from "@/lib/asset";

import { categories, type Project, type ProjectCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;

const spans = [
  { span: "md:col-span-7", ratio: "aspect-[16/11]" },
  { span: "md:col-span-5 md:mt-24", ratio: "aspect-[3/4]" },
  { span: "md:col-span-5", ratio: "aspect-[4/5]" },
  { span: "md:col-span-7 md:mt-16", ratio: "aspect-[16/12]" },
];

export function ProjectsGallery({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const reduced = useReducedMotion();

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  const counts = categories.map((category) => ({
    category,
    count:
      category === "All"
        ? projects.length
        : projects.filter((p) => p.category === category).length,
  }));

  return (
    <div className="shell pb-[clamp(5rem,9vw,9rem)]">
      <div className="flex flex-col gap-5 border-b border-ink/12 pb-6 md:flex-row md:items-end md:justify-between">
        <div
          className="flex flex-wrap gap-x-7 gap-y-3"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {counts.map(({ category, count }) => {
            const active = filter === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(category)}
                className={cn(
                  "label flex items-baseline gap-2 border-b pb-2 transition-colors",
                  active
                    ? "border-ink text-ink"
                    : "border-transparent text-stone hover:text-ink",
                )}
              >
                {category}
                <span className="text-[9px] text-stone/70">
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        <p className="label text-stone" aria-live="polite">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <motion.div layout className="mt-10 grid gap-x-5 gap-y-14 md:mt-16 md:grid-cols-12">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, index) => {
            const tile = spans[index % spans.length];
            return (
            <motion.article
              key={project.slug}
              layout
              initial={reduced ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className={cn("group", tile.span)}
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div className={cn("media relative w-full overflow-hidden", tile.ratio)}>
                  <Image
                    src={asset(project.image)}
                    alt={project.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 label bg-paper/90 px-3 py-2 text-ink">
                    {project.category}
                  </span>
                </div>

                <div className="mt-4 flex items-start justify-between gap-4 border-t border-ink/12 pt-3">
                  <div>
                    <h2 className="display text-[clamp(1.6rem,2.3vw,2.3rem)]">
                      {project.title}
                    </h2>
                    <p className="label mt-2 text-stone">
                      {project.location} — {project.year}
                    </p>
                  </div>
                  <span className="label mt-1 shrink-0 text-stone transition-colors group-hover:text-ink">
                    {project.index}
                  </span>
                </div>
              </Link>
            </motion.article>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
