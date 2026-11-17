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
        <header className="border-b border-muted/15 pt-28 md:pt-32">
          <div className="container-page max-w-4xl pb-10 md:pb-14">
            <Breadcrumbs
              items={[
                { name: "Блог", path: "/blog" },
                { name: article.title, path: `/blog/${article.slug}` },
              ]}
            />
            <div className="mt-7 flex flex-wrap items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/60">
              <span className="text-emerald/80">{article.category}</span>
              <span className="size-1 rounded-full bg-muted/30" />
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
              <span className="size-1 rounded-full bg-muted/30" />
              <span>{article.readingTime} мин чтения</span>
            </div>
            <h1 className="mt-5 text-h2 text-bone">{article.h1}</h1>
            <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-muted">{article.description}</p>
          </div>
        </header>

        <div className="container-page grid max-w-6xl gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
          <div className="max-w-2xl">
            {article.blocks.map((block, index) => {
              if (block.type === "h2") {
                return (
                  <h2
                    key={index}
                    className="mt-10 mb-3 font-display text-[1.35rem] font-semibold tracking-tight text-bone first:mt-0"
                  >
                    {block.text}
                  </h2>
                );
              }
              if (block.type === "p") {
                return (
                  <p key={index} className="mb-4 text-[0.96rem] leading-[1.75] text-bone/75">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "ul") {
                return (
                  <ul key={index} className="mb-5 space-y-2">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.94rem] leading-relaxed text-bone/75">
                        <span className="mt-2.5 size-1 shrink-0 rounded-full bg-emerald/70" aria-hidden />
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
                      <li key={item} className="flex gap-3 text-[0.94rem] leading-relaxed text-bone/75">
                        <span className="mt-0.5 font-mono text-[0.72rem] text-emerald/70">
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
                  className="my-7 border-l-2 border-emerald/60 pl-5 text-[1.02rem] italic leading-relaxed text-bone/80"
                >
                  {block.text}
                </blockquote>
              );
            })}

            <div className="mt-12 flex flex-col gap-5 rounded-xl border border-muted/15 bg-forest/25 p-6">
              <div>
                <p className="font-display text-[1.05rem] text-bone">Обсудить задачу?</p>
                <p className="mt-1 text-[0.85rem] leading-relaxed text-muted">
                  Разберём ваш случай, предложим архитектуру и назовём стоимость. Оценка бесплатна.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <LinkButton href="/contacts" withArrow>
                  Оставить заявку
                </LinkButton>
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center rounded-full border border-muted/30 px-5 text-sm text-bone transition-colors hover:border-emerald hover:text-emerald"
                >
                  Цены
                </Link>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-muted/15 pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone"
              >
                <ArrowLeft className="size-3" aria-hidden />
                Все материалы
              </Link>
            </div>
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted/50">Содержание</p>
              <ul className="mt-3 space-y-2 border-l border-muted/15 pl-4">
                {headings.map((heading) => (
                  <li key={heading.text} className="text-[0.78rem] leading-snug text-muted/70">
                    {heading.text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-muted/15 py-12 md:py-16">
          <div className="container-page">
            <h2 className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted/60">
              Читайте также
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/blog/${item.slug}`}
                  className="group flex items-start justify-between gap-4 border-t border-muted/15 pt-4 transition-colors hover:border-emerald/40"
                >
                  <div>
                    <p className="font-display text-[0.95rem] text-bone transition-colors group-hover:text-emerald">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[0.8rem] text-muted">{item.description}</p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
