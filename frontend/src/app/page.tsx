import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Advantages } from "@/components/home/Advantages";
import { ProjectsShowcase } from "@/components/home/ProjectsShowcase";
import { PricingPreview } from "@/components/home/PricingPreview";
import { ProcessSection } from "@/components/home/ProcessSection";
import { TechSection } from "@/components/home/TechSection";
import { CtaBlock } from "@/components/home/CtaBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DirectionGrid } from "@/components/sections/DirectionGrid";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { directions } from "@/config/services";
import { homeFaq } from "@/config/home";
import { buildMetadata, jsonLdFaq, jsonLdOrganization } from "@/lib/seo";
import { Reveal } from "@/components/ui/Reveal";
import { sortedArticles } from "@/content/blog";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Разработка сайтов, ПО и AI-решений для бизнеса | ADA",
  description:
    "Разрабатываем сайты, веб-приложения, backend и AI-агентов. Автоматизация бизнес-процессов, Telegram-боты, голосовые агенты. Цены от 5 000 ₽, оценка бесплатно.",
  path: "/",
  keywords: [
    "разработка сайтов",
    "разработка AI-агентов",
    "автоматизация бизнеса",
    "заказать telegram бота",
    "backend разработка",
    "голосовой AI агент",
  ],
});

export default function HomePage() {
  const latest = sortedArticles().slice(0, 2);

  return (
    <>
      <JsonLd data={[jsonLdFaq(homeFaq), jsonLdOrganization]} id="home-jsonld" />
      <Hero />

      <section id="directions" className="scroll-mt-20 border-b border-muted/15 py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            index="01"
            eyebrow="Направления"
            title="Что мы разрабатываем"
            description="Шесть направлений, которые закрывают задачи от простого сайта до AI-системы с интеграциями. Можно начать с одного модуля и расширять по мере роста."
            align="between"
          />
          <div className="mt-10 md:mt-14">
            <DirectionGrid items={directions} />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-[0.82rem] leading-relaxed text-muted/70">
              Не нашли точное направление? Опишите задачу — определим, какой формат подходит.
            </p>
            <Link
              href="/contacts"
              className="group inline-flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-emerald transition-colors hover:text-bone"
            >
              Обсудить задачу
              <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <Advantages />
      <ProjectsShowcase />
      <PricingPreview />
      <ProcessSection />
      <TechSection />

      <section className="border-b border-muted/15 bg-forest/20 py-16 md:py-24">
        <div className="container-page grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              index="07"
              eyebrow="FAQ"
              title="Частые вопросы"
              description="Если ответа нет — спросите AI-консультанта в правом нижнем углу или напишите напрямую."
            />
            <Link
              href="/contacts"
              className="mt-6 inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-emerald hover:text-bone"
            >
              Задать вопрос
              <ArrowUpRight className="size-3" aria-hidden />
            </Link>
          </div>
          <FaqAccordion items={homeFaq} />
        </div>
      </section>

      <section className="border-b border-muted/15 py-14 md:py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading index="08" eyebrow="Блог" title="Разбираем разработку без маркетингового шума" />
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted transition-colors hover:text-bone"
            >
              Все материалы
              <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {latest.map((article, index) => (
              <Reveal key={article.slug} delay={index * 0.05}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group flex h-full flex-col justify-between gap-6 rounded-xl border border-muted/15 bg-forest/30 p-6 transition-colors hover:border-emerald/40"
                >
                  <div>
                    <div className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/60">
                      <span className="text-emerald/80">{article.category}</span>
                      <span className="size-1 rounded-full bg-muted/30" />
                      <span>{article.readingTime} мин</span>
                    </div>
                    <h3 className="mt-3 font-display text-[1.12rem] font-medium leading-snug text-bone transition-colors group-hover:text-emerald">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-[0.86rem] leading-relaxed text-muted">{article.description}</p>
                  </div>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted/50">
                    {formatDate(article.publishedAt)}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
