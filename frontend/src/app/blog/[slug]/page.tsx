import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { articles, getArticle, relatedArticles } from "@/content/blog";
import { buildMetadata, jsonLdArticle, jsonLdBreadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { formatDate } from "@/lib/utils";
import { LinkButton } from "@/components/ui/Button";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.description,
    path: `/blog/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
  });
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(article.slug);
  const headings = article.blocks.filter((block) => block.type === "h2");

  return (
    <>
      <JsonLd
        data={[
          jsonLdArticle({
            title: article.title,
            description: article.description,
            path: `/blog/${article.slug}`,
            publishedAt: article.publishedAt,
            updatedAt: article.updatedAt,
          }),
          jsonLdBreadcrumbs([
            { name: "Главная", path: "/" },
            { name: "Блог", path: "/blog" },
            { name: article.title, path: `/blog/${article.slug}` },
          ]),
        ]}
        id={`article-jsonld-${article.slug}`}
      />

      <article>
        <header className="border-b border-line bg-surface">
          <div className="container-page max-w-4xl py-8 md:py-12">
            <Breadcrumbs
              items={[
                { name: "Блог", path: "/blog" },
                { name: article.title, path: `/blog/${article.slug}` },
              ]}
            />
            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-[0.75rem] text-ink-muted">
              <span className="font-medium text-brand">{article.category}</span>
              <span className="size-1 rounded-full bg-line-strong" />
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
            </div>
            <h1 className="mt-4 text-h2 text-ink">{article.h1}</h1>
            <p className="mt-4 max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted">{article.description}</p>
          </div>
        </header>

        <div className="container-page grid max-w-6xl gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
          <div className="max-w-2xl">
            {article.blocks.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={index}
                    className="mt-9 mb-3 font-display text-[1.25rem] font-semibold tracking-tight text-ink first:mt-0"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "p") {
                return (
                  <p key={index} className="mb-4 text-[0.94rem] leading-[1.75] text-ink-muted">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={index} className="mb-5 space-y-2">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink-muted">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-brand/60" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (block.type === "ol") {
                return (
                  <ol key={index} className="mb-5 space-y-2.5">
                    {block.items.map((item, itemIndex) => (
                      <li key={item} className="flex gap-3 text-[0.92rem] leading-relaxed text-ink-muted">
                        <span className="mt-0.5 text-[0.75rem] font-semibold text-brand">
                          {String(itemIndex + 1).padStart(2, "0")}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ol>
                );
              }
              return (
                <blockquote
                  key={index}
                  className="my-6 border-l-2 border-brand/50 pl-4 text-[0.98rem] italic leading-relaxed text-ink"
                >
                  {block.text}
                </blockquote>
              );
            })}

            <div className="mt-10 flex flex-col gap-4 rounded-xl border border-line bg-surface-muted p-5">
              <div>
                <p className="font-display text-[1rem] font-semibold text-ink">Обсудить задачу?</p>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-muted">
                  Разберём ваш случай, предложим решение и назовём стоимость. Оценка бесплатна.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <LinkButton href="/contacts" withArrow>
                  Оставить заявку
                </LinkButton>
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center rounded-lg border border-line-strong px-5 text-[0.9rem] text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  Цены
                </Link>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-[0.84rem] text-ink-muted transition-colors hover:text-brand"
              >
                <ArrowLeft className="size-3" aria-hidden />
                Все материалы
              </Link>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">Содержание</p>
              <ul className="mt-3 space-y-2 border-l border-line pl-4">
                {headings.map((heading) => (
                  <li key={heading.text} className="text-[0.81rem] leading-snug text-ink-muted">
                    {heading.text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-line bg-surface-muted py-10 md:py-14">
          <div className="container-page">
            <h2 className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] text-ink-muted">
              Читайте также
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group flex items-start justify-between gap-4 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-brand/40"
                >
                  <div>
                    <p className="font-display text-[0.95rem] font-semibold text-ink transition-colors group-hover:text-brand">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.81rem] text-ink-muted">{item.description}</p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-ink-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
