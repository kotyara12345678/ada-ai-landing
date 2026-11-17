import Link from "next/link";
import { ArrowUpRight, Mail, Send } from "lucide-react";
import { site } from "@/config/site";
import { directions } from "@/config/services";
import { articles } from "@/content/blog";

export function Footer() {
  const year = new Date().getFullYear();
  const recentArticles = articles.slice(0, 3);

  return (
    <footer className="border-t border-muted/15 bg-graphite">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-[7px] border border-emerald/40 bg-emerald/10">
                <span className="size-2 rounded-[2px] bg-emerald" />
              </span>
              <span className="font-display text-[1.05rem] font-semibold text-bone">{site.name}</span>
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Разработка сайтов, программного обеспечения и AI-решений. От технического проектирования
              до готового продукта.
            </p>
            <div className="flex flex-col gap-2.5 pt-1">
              <a
                href={`mailto:${site.contacts.email}`}
                className="group inline-flex items-center gap-2 text-sm text-bone/85 transition-colors hover:text-emerald"
              >
                <Mail className="size-4 text-muted" aria-hidden />
                {site.contacts.email}
              </a>
              <a
                href={site.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-bone/85 transition-colors hover:text-emerald"
              >
                <Send className="size-4 text-muted" aria-hidden />
                {site.contacts.telegramHandle}
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <div>
              <p className="eyebrow mb-4 text-muted/70">Услуги</p>
              <ul className="flex flex-col gap-2.5">
                {site.footerServices.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-bone/70 transition-colors hover:text-emerald">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-muted/70">Компания</p>
              <ul className="flex flex-col gap-2.5">
                <li>
                  <Link href="/portfolio" className="text-sm text-bone/70 transition-colors hover:text-emerald">
                    Проекты
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-sm text-bone/70 transition-colors hover:text-emerald">
                    Цены
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-bone/70 transition-colors hover:text-emerald">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" className="text-sm text-bone/70 transition-colors hover:text-emerald">
                    Контакты
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-bone/70 transition-colors hover:text-emerald">
                    Блог
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-4 text-muted/70">Материалы</p>
              <ul className="flex flex-col gap-2.5">
                {recentArticles.map((article) => (
                  <li key={article.slug}>
                    <Link
                      href={`/blog/${article.slug}`}
                      className="text-sm leading-snug text-bone/70 transition-colors hover:text-emerald"
                    >
                      {article.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-start justify-between gap-6 border-t border-muted/15 pt-6">
          <div className="flex flex-col gap-2">
            <p className="font-mono text-[0.68rem] tracking-wide text-muted/70">
              © {year} {site.name}. Все права защищены.
            </p>
            <p className="max-w-xl text-[0.72rem] leading-relaxed text-muted/60">
              Информация на сайте не является публичной офертой. Указанные цены — стартовая стоимость
              и зависят от объёма работ.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.68rem] text-muted/70">
            <Link href="/privacy" className="transition-colors hover:text-bone">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="transition-colors hover:text-bone">
              Условия использования
            </Link>
            <Link href="/sitemap.xml" className="inline-flex items-center gap-1 transition-colors hover:text-bone">
              Sitemap
              <ArrowUpRight className="size-2.5" aria-hidden />
            </Link>
          </div>
        </div>

        <nav aria-label="Все направления" className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
          {directions.map((direction) => (
            <Link
              key={direction.slug}
              href={`/${direction.slug}`}
              className="text-[0.72rem] text-muted/50 transition-colors hover:text-muted"
            >
              {direction.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
