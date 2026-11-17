import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { projects } from "@/config/portfolio";
import { buildMetadata, jsonLdBreadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProjectPreview } from "@/components/portfolio/ProjectPreview";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "Портфолио: AI-ассистент, VPN-инфраструктура, голосовой агент | ADA",
  description:
    "Проекты команды: ADA AI Document Assistant, Kotyara VPN и MCA Voice Agent. Задача, решение, стек и архитектура без выдуманных метрик.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <JsonLd
        data={jsonLdBreadcrumbs([
          { name: "Главная", path: "/" },
          { name: "Проекты", path: "/portfolio" },
        ])}
        id="portfolio-jsonld"
      />

      <section className="border-b border-muted/15 pt-28 md:pt-32">
        <div className="container-page pb-12 md:pb-16">
          <Breadcrumbs items={[{ name: "Проекты", path: "/portfolio" }]} />
          <h1 className="mt-8 max-w-3xl text-h2 text-bone">
            Проекты, в которых видно инженерию
          </h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-muted">
            Три проекта с разными задачами: работа с документами через LLM, серверная инфраструктура
            подключений и голосовая обработка обращений. Для каждого — задача, решение, стек и архитектура.
          </p>
          <p className="mt-4 max-w-2xl text-[0.82rem] leading-relaxed text-muted/60">
            Мы не публикуем показатели эффективности и количество пользователей, если они не подтверждены.
            Статус проекта указан фактический.
          </p>
        </div>
      </section>

      <div className="container-page py-12 md:py-16">
        <nav aria-label="Проекты на странице" className="mb-12 flex flex-wrap gap-3">
          {projects.map((project) => (
            <a
              key={project.slug}
              href={`#${project.slug}`}
              className="rounded-full border border-muted/20 px-3.5 py-1.5 font-mono text-[0.68rem] text-muted transition-colors hover:border-emerald/50 hover:text-bone"
            >
              {project.name} · {project.subtitle}
            </a>
          ))}
        </nav>

        <div className="space-y-20 md:space-y-28">
          {projects.map((project, index) => (
            <Reveal key={project.slug}>
              <article id={project.slug} className="scroll-mt-24">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em]">
                      <span className="text-muted/50">{String(index + 1).padStart(2, "0")}</span>
                      <span className="rounded-full border border-emerald/30 bg-emerald/5 px-2.5 py-1 text-emerald">
                        {project.status}
                      </span>
                      <span className="text-muted/50">{project.year}</span>
                    </div>

                    <h2 className="mt-5 font-display text-[1.8rem] font-semibold tracking-tight text-bone md:text-[2.2rem]">
                      {project.name}
                      <span className="mt-1 block font-sans text-[1rem] font-normal tracking-normal text-emerald/90">
                        {project.subtitle}
                      </span>
                    </h2>
                    <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted">{project.summary}</p>

                    <div className="mt-7 space-y-6">
                      <div>
                        <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted/50">
                          Задача
                        </h3>
                        <p className="mt-2 text-[0.88rem] leading-relaxed text-bone/75">{project.task}</p>
                      </div>
                      <div>
                        <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted/50">
                          Решение
                        </h3>
                        <ul className="mt-2 space-y-1.5">
                          {project.solution.map((item) => (
                            <li key={item} className="flex gap-2.5 text-[0.86rem] leading-relaxed text-bone/75">
                              <span
                                className="mt-1.5 size-1 shrink-0 rounded-full"
                                style={{ backgroundColor: project.accent }}
                                aria-hidden
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted/50">
                        Технологии
                      </h3>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {project.stack.map((tech) => (
                          <li
                            key={tech}
                            className="rounded-md border border-muted/20 px-2 py-1 font-mono text-[0.64rem] text-bone/65"
                          >
                            {tech}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {project.link ? (
                      <a
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 inline-flex items-center gap-2 text-[0.84rem] text-emerald hover:text-bone"
                      >
                        {project.link.label}
                        <ExternalLink className="size-3.5" aria-hidden />
                      </a>
                    ) : (
                      <p className="mt-6 rounded-lg border border-muted/15 px-3 py-2 text-[0.75rem] leading-relaxed text-muted/60">
                        Публичная ссылка на демонстрацию не размещена: проект развивается закрыто.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-5">
                    <ProjectPreview project={project} />
                    <div className="rounded-xl border border-muted/15 p-5">
                      <h3 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted/50">
                        Архитектура
                      </h3>
                      <dl className="mt-3 space-y-2.5">
                        {project.architecture.map((layer) => (
                          <div key={layer.layer} className="grid grid-cols-[80px_1fr] gap-3">
                            <dt className="font-mono text-[0.66rem] uppercase tracking-wide text-bone/60">
                              {layer.layer}
                            </dt>
                            <dd className="text-[0.8rem] leading-relaxed text-muted">{layer.text}</dd>
                          </div>
                        ))}
                      </dl>
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <section className="border-t border-muted/15 bg-forest/20 py-14 md:py-20">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-[1.5rem] font-medium text-bone">Похожая задача?</h2>
            <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-muted">
              Расскажите о процессе — предложим вариант решения и оценим объём работ.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/contacts" withArrow>
              Обсудить проект
            </LinkButton>
            <Link
              href="/pricing"
              className="inline-flex h-11 items-center rounded-full border border-muted/30 px-5 text-sm text-bone transition-colors hover:border-emerald hover:text-emerald"
            >
              Смотреть цены
            </Link>
          </div>
        </div>
      </section>

      <div className="container-page py-10">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone"
        >
          Материалы о разработке
          <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </Link>
      </div>
    </>
  );
}
