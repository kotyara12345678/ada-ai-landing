import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { sortedArticles } from "@/content/blog";
import { buildMetadata, jsonLdBreadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Блог о разработке, AI и обслуживании IT | ADA",
  description:
    "Практические материалы о разработке и эксплуатации: стоимость AI-агентов, RAG-системы, автоматизация заявок, корпоративные сайты, API и обслуживание серверов.",
  path: "/blog",
});

export default function BlogPage() {
  const articles = sortedArticles();

  return (
    <>
      <JsonLd
        data={jsonLdBreadcrumbs([
          { name: "Главная", path: "/" },
          { name: "Блог", path: "/blog" },
        ])}
        id="blog-jsonld"
      />

      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs items={[{ name: "Блог", path: "/blog" }]} />
          <h1 className="mt-6 max-w-3xl text-h2 text-ink">Материалы о разработке</h1>
          <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted">
            Разбираем то, о чём спрашивают клиенты: из чего складывается цена, когда нужен AI, как
            автоматизировать рутину и что входит в техническое обслуживание.
          </p>
        </div>
      </section>

      <div className="container-page py-10 md:py-14">
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.03}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col justify-between gap-4 rounded-xl border border-line bg-surface p-5 transition-all hover:border-brand/40 hover:shadow-card"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 text-[0.75rem] text-ink-muted">
                    <span className="font-medium text-brand">{article.category}</span>
                    <span className="size-1 rounded-full bg-line-strong" aria-hidden />
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <h2 className="mt-2.5 max-w-lg font-display text-[1.1rem] font-semibold leading-snug text-ink group-hover:text-brand">
                    {article.title}
                  </h2>
                  <p className="mt-1.5 max-w-lg text-[0.86rem] leading-relaxed text-ink-muted">
                    {article.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-ink-muted transition-colors group-hover:text-brand">
                  Читать
                  <ArrowRight
                    className="size-3.5 transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-xl border border-line bg-surface-muted p-5 md:flex-row md:items-center">
          <div>
            <p className="font-display text-[1rem] font-semibold text-ink">
              Нужен разбор вашей задачи, а не общая статья?
            </p>
            <p className="mt-1 text-[0.85rem] text-ink-muted">
              Напишите — ответим конкретно по вашему случаю.
            </p>
          </div>
          <LinkButton href="/contacts" withArrow>
            Задать вопрос
          </LinkButton>
        </div>
      </div>
    </>
  );
}
