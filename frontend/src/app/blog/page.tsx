import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { sortedArticles } from "@/content/blog";
import { buildMetadata, jsonLdBreadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatDate } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = buildMetadata({
  title: "Блог о разработке, AI и автоматизации | ADA",
  description:
    "Практические материалы о разработке: стоимость AI-агентов, RAG-системы, автоматизация заявок, корпоративные сайты, API и голосовые агенты.",
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

      <section className="border-b border-muted/15 pt-28 md:pt-32">
        <div className="container-page pb-10 md:pb-14">
          <Breadcrumbs items={[{ name: "Блог", path: "/blog" }]} />
          <h1 className="mt-8 max-w-3xl text-h2 text-bone">Материалы о разработке</h1>
          <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-muted">
            Разбираем то, о чём спрашивают клиенты: из чего складывается цена, когда нужен AI, как
            автоматизировать рутину и не переплатить за архитектуру.
          </p>
        </div>
      </section>

      <div className="container-page py-12 md:py-16">
        <div className="grid gap-x-8 gap-y-0 border-t border-muted/15 md:grid-cols-2">
          {articles.map((article, index) => (
            <Reveal key={article.slug} delay={index * 0.03}>
              <Link
                href={`/blog/${article.slug}`}
                className="group flex h-full flex-col justify-between gap-5 border-b border-muted/15 py-7 md:pr-8"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/60">
                    <span className="text-emerald/80">{article.category}</span>
                    <span className="size-1 rounded-full bg-muted/30" />
                    <span>{formatDate(article.publishedAt)}</span>
                    <span className="size-1 rounded-full bg-muted/30" />
                    <span>{article.readingTime} мин</span>
                  </div>
                  <h2 className="mt-3 max-w-lg font-display text-[1.25rem] font-medium leading-snug text-bone transition-colors group-hover:text-emerald">
                    {article.title}
                  </h2>
                  <p className="mt-2 max-w-lg text-[0.88rem] leading-relaxed text-muted">
                    {article.description}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/60 transition-colors group-hover:text-emerald">
                  Читать
                  <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-xl border border-muted/15 bg-forest/25 p-6 md:flex-row md:items-center">
          <div>
            <p className="font-display text-[1.05rem] text-bone">Нужен разбор вашей задачи, а не общая статья?</p>
            <p className="mt-1 text-[0.84rem] text-muted">Напишите — ответим конкретно по вашему случаю.</p>
          </div>
          <LinkButton href="/contacts" withArrow>
            Задать вопрос
          </LinkButton>
        </div>
      </div>
    </>
  );
}
