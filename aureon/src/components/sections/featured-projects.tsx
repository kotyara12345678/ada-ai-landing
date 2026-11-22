import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { projects } from "@/lib/content";
import { cn } from "@/lib/utils";

const layouts = [
  {
    figure: "md:col-span-7",
    meta: "md:col-span-4 md:col-start-9 md:self-end md:pb-6",
    ratio: "aspect-[16/11]",
  },
  {
    figure: "md:col-span-5 md:col-start-8",
    meta: "md:col-span-4 md:col-start-2 md:row-start-1 md:self-end md:pb-10",
    ratio: "aspect-[3/4]",
  },
  {
    figure: "md:col-span-8",
    meta: "md:col-span-3 md:col-start-10 md:self-center",
    ratio: "aspect-[16/10]",
  },
  {
    figure: "md:col-span-6 md:col-start-7",
    meta: "md:col-span-4 md:col-start-1 md:row-start-1 md:self-center",
    ratio: "aspect-[4/3]",
  },
];

export function FeaturedProjects() {
  return (
    <section className="border-t border-ink/12 py-[clamp(5rem,9vw,9rem)]">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <SectionLabel index="02">Selected work</SectionLabel>
            <h2 className="display mt-5 text-[clamp(2.2rem,4vw,4rem)]">
              Four places, <span className="italic text-stone">one language.</span>
            </h2>
          </div>
          <Link href="/projects" className="label link-line text-ink">
            All projects
            <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-14 space-y-20 md:mt-24 md:space-y-32">
          {projects.slice(0, 4).map((project, index) => {
            const layout = layouts[index % layouts.length];
            return (
              <article key={project.slug} className="group grid gap-8 md:grid-cols-12 md:gap-8">
                <Reveal className={cn("relative", layout.figure)}>
                  <Link href={`/projects/${project.slug}`} className="block" aria-label={project.title}>
                    <div className={cn("media relative w-full", layout.ratio)}>
                      <Image
                        src={project.image}
                        alt={project.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 60vw"
                        className="object-cover"
                      />
                    </div>
                  </Link>
                </Reveal>

                <div className={cn("flex flex-col", layout.meta)}>
                  <Reveal delay={0.08}>
                    <div className="flex items-baseline gap-3">
                      <span className="label text-bronze">{project.index}</span>
                      <span className="h-px w-6 bg-ink/25" aria-hidden />
                      <span className="label text-stone">{project.category}</span>
                    </div>

                    <h3 className="display mt-4 text-[clamp(2rem,3vw,3.1rem)]">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="transition-opacity hover:opacity-70"
                      >
                        {project.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-ink/70">
                      {project.summary}
                    </p>

                    <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-ink/12 pt-4">
                      <div>
                        <dt className="label text-stone">Location</dt>
                        <dd className="mt-1 text-sm">{project.location}</dd>
                      </div>
                      <div>
                        <dt className="label text-stone">Year</dt>
                        <dd className="mt-1 text-sm">{project.year}</dd>
                      </div>
                    </dl>

                    <Link
                      href={`/projects/${project.slug}`}
                      className="label link-line mt-6 w-fit text-ink"
                    >
                      View project
                      <span aria-hidden>→</span>
                    </Link>
                  </Reveal>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
