import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/ui/route-link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { primaryCta } from "@/lib/site";
import { projectBySlug, projects } from "@/lib/projects";
import { canonical } from "@/lib/seo";
import { asset } from "@/lib/asset";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    return { title: "Проект не найден" };
  }

  return {
    title: `${project.name} — концепт`,
    description: project.summary,
    alternates: { canonical: canonical(`/projects/${project.slug}`) },
    openGraph: {
      title: `${project.name} — концепт CONTERRA`,
      description: project.summary,
      images: [{ url: canonical(project.image), alt: project.imageAlt }],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <article>
        <div className="border-b border-line bg-canvas">
          <div className="shell pt-6 pb-10 md:pt-8 md:pb-12">
            <Breadcrumbs
              items={[
                { label: "Главная", href: "/" },
                { label: "Проекты", href: "/projects" },
                { label: project.name },
              ]}
            />

            <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-teal/40 bg-teal/8 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.12em] text-navy">
                    Концептуальный кейс
                  </span>
                  <span className="eyebrow text-muted">
                    {project.category} · {project.year}
                  </span>
                </div>
                <h1 className="h1 mt-5 max-w-[20ch]">{project.name}</h1>
                <p className="lead mt-5 max-w-2xl">{project.summary}</p>
              </div>

              <dl className="md:col-span-4">
                {[
                  { label: "Тип объекта", value: project.objectType },
                  { label: "Локация", value: project.location },
                  { label: "Год", value: project.year },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 text-[0.8125rem]"
                  >
                    <dt className="text-muted">{row.label}</dt>
                    <dd className="text-right text-graphite/85">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="border-b border-line bg-paper">
          <div className="shell py-8 md:py-10">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-line md:aspect-[16/8]">
              <Image
                src={asset(project.image)}
                alt={project.imageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-3 text-[0.6875rem] text-muted">
              Визуализация концепта · {project.location} · демонстрационный проект
            </p>
          </div>
        </div>

        <div className="border-b border-line bg-canvas py-12 md:py-16">
          <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-7">
              <Reveal>
                <h2 className="eyebrow text-teal">Задача</h2>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-graphite/85">{project.task}</p>
              </Reveal>

              <div className="mt-10">
                <h2 className="eyebrow text-teal">Подход</h2>
                <ol className="mt-4 border-t border-line">
                  {project.approach.map((step, index) => (
                    <Reveal
                      as="li"
                      key={step.title}
                      delay={index * 0.05}
                      className="grid gap-2 border-b border-line py-5 sm:grid-cols-12 sm:gap-4"
                    >
                      <span className="eyebrow text-muted sm:col-span-1">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="sm:col-span-11">
                        <h3 className="font-display text-[1.0625rem] font-medium tracking-tight text-graphite">
                          {step.title}
                        </h3>
                        <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-graphite/70">
                          {step.text}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>

              <Reveal className="mt-10 border-l-2 border-teal pl-5">
                <h2 className="eyebrow text-teal">Результат</h2>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-graphite/85">{project.result}</p>
              </Reveal>

              {project.additionalImage ? (
                <figure className="mt-10">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-line">
                    <Image
                      src={asset(project.additionalImage.src)}
                      alt={project.additionalImage.alt}
                      fill
                      sizes="(min-width: 768px) 58vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-2 text-[0.6875rem] text-muted">
                    {project.additionalImage.alt} · концептуальная иллюстрация
                  </figcaption>
                </figure>
              ) : null}
            </div>

            <aside className="md:col-span-4 md:col-start-9">
              <div className="border border-line bg-paper p-5">
                <h2 className="eyebrow text-muted">Параметры концепта</h2>
                <dl className="mt-3">
                  {project.specs.map((spec) => (
                    <div
                      key={spec.label}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2 last:border-b-0"
                    >
                      <dt className="text-[0.75rem] text-muted">{spec.label}</dt>
                      <dd className="text-right text-[0.8125rem] font-medium text-graphite">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-6">
                <h2 className="eyebrow text-muted">Состав работ</h2>
                <ul className="mt-3 space-y-2">
                  {project.scope.map((item) => (
                    <li key={item} className="flex gap-2 text-[0.875rem] leading-snug text-graphite/70">
                      <span className="mt-1.5 size-1 shrink-0 bg-teal" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={primaryCta.href} className="btn btn-primary mt-7 w-full">
                Обсудить похожий объект
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>

              <p className="mt-4 text-[0.6875rem] leading-relaxed text-muted">
                Параметры и результаты приведены в рамках демонстрационного концепта. Реальных
                договоров, объектов и клиентов за этими данными нет.
              </p>
            </aside>
          </div>
        </div>

        <nav aria-label="Другие проекты" className="border-b border-line bg-paper">
          <div className="shell flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/projects" className="inline-flex items-center gap-2 text-[0.875rem] text-graphite/70 hover:text-navy">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Все проекты
            </Link>

            <Link
              href={`/projects/${nextProject.slug}`}
              className="group inline-flex items-center gap-3 text-right"
            >
              <span>
                <span className="eyebrow block text-muted">Следующий проект</span>
                <span className="mt-1 block font-display text-[1.0625rem] font-medium tracking-tight text-graphite group-hover:text-navy">
                  {nextProject.name}
                </span>
              </span>
              <ArrowUpRight
                className="size-5 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal"
                aria-hidden="true"
              />
            </Link>
          </div>
        </nav>
      </article>

      <FinalCta />
    </>
  );
}
