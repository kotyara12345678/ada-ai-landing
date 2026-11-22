import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { getProject, nextProject, projects } from "@/lib/content";
import { cn } from "@/lib/utils";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} — AUREON`,
      description: project.summary,
      url: `/projects/${project.slug}`,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = nextProject(project.slug);

  return (
    <article>
      <header className="shell pb-10 pt-32 md:pt-44">
        <Reveal>
          <Link href="/projects" className="label link-line text-stone">
            ← All projects
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end">
          <Reveal className="md:col-span-8">
            <p className="label text-bronze">
              {project.index} — {project.category}
            </p>
            <h1 className="display mt-5 text-[clamp(2.8rem,6.6vw,6.6rem)]">
              {project.title}
            </h1>
          </Reveal>
          <Reveal delay={0.08} className="md:col-span-4">
            <p className="body-copy max-w-[42ch]">{project.intro}</p>
          </Reveal>
        </div>
      </header>

      <Reveal className="shell">
        <div className="media relative aspect-[16/9] w-full">
          <Image
            src={project.image}
            alt={project.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <section className="shell py-[clamp(4rem,7vw,7rem)]">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-ink/12 py-8 md:grid-cols-6">
          {project.facts.map((fact) => (
            <div key={fact.label}>
              <dt className="label text-stone">{fact.label}</dt>
              <dd className="mt-2 text-sm">{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionLabel>Architectural concept</SectionLabel>
            <p className="display mt-4 text-[clamp(1.5rem,2.2vw,2rem)] leading-snug">
              {project.discipline}, {project.year}
            </p>
          </div>
          <div className="space-y-6 md:col-span-7 md:col-start-6">
            {project.concept.map((paragraph) => (
              <Reveal key={paragraph.slice(0, 24)}>
                <p className="body-copy">{paragraph}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="shell pb-[clamp(4rem,7vw,7rem)]">
        <div className="grid gap-4 md:grid-cols-12 md:gap-5">
          {project.gallery.map((image, index) => {
            const layout =
              index === 0
                ? { span: "md:col-span-7", ratio: "aspect-[4/3]" }
                : index === 1
                  ? { span: "md:col-span-5 md:mt-20", ratio: "aspect-[3/4]" }
                  : index === 2
                    ? { span: "md:col-span-5 md:col-start-2", ratio: "aspect-[4/5]" }
                    : index === 3
                      ? { span: "md:col-span-6 md:mt-10", ratio: "aspect-[16/11]" }
                      : { span: "md:col-span-12", ratio: "aspect-[21/9]" };
            return (
              <Reveal key={image.src + index} className={cn("group", layout.span)}>
                <figure>
                  <div className={cn("media relative w-full", layout.ratio)}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
                      className="object-cover"
                    />
                  </div>
                  {image.caption ? (
                    <figcaption className="label mt-3 text-stone">{image.caption}</figcaption>
                  ) : null}
                </figure>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t border-ink/12 bg-paper-soft py-[clamp(4rem,7vw,7rem)]">
        <div className="shell grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel>Materials</SectionLabel>
            <ul className="mt-6 space-y-3">
              {project.materials.map((material) => (
                <li key={material} className="flex items-baseline gap-3 border-b border-ink/10 pb-3 text-sm">
                  <span className="h-1 w-1 bg-bronze" aria-hidden />
                  {material}
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 md:col-start-7">
            <SectionLabel>Planning</SectionLabel>
            <dl className="mt-6 space-y-4">
              {project.plan.map((row) => (
                <div key={row.label} className="grid grid-cols-2 gap-6 border-b border-ink/10 pb-4">
                  <dt className="label text-stone">{row.label}</dt>
                  <dd className="text-sm">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 max-w-[40ch] text-xs leading-relaxed text-stone">
              Areas and layouts are indicative, part of the AUREON concept study
              rather than a built record.
            </p>
          </div>
        </div>
      </section>

      <Link href={`/projects/${next.slug}`} className="group block border-t border-ink/12">
        <div className="shell flex flex-col gap-6 py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <div>
            <p className="label text-stone">Next project</p>
            <p className="display mt-4 text-[clamp(2.2rem,4.4vw,4.4rem)] transition-opacity group-hover:opacity-70">
              {next.title}
            </p>
            <p className="label mt-3 text-stone">
              {next.location} — {next.year}
            </p>
          </div>
          <span className="label flex items-center gap-3 text-stone transition-colors group-hover:text-ink">
            View
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
