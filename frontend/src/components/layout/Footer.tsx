import Image from "next/image";
import Link from "next/link";
import { Mail, Send } from "lucide-react";
import { site } from "@/config/site";
import { directions } from "@/config/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-deep text-white">
      <div className="container-page py-14 md:py-16">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_1.9fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/brand/icon.png"
                alt=""
                width={72}
                height={72}
                className="size-9 rounded-md"
              />
              <span className="font-display text-[1.1rem] font-bold tracking-tight">{site.name}</span>
            </Link>
            <p className="max-w-xs text-[0.88rem] leading-relaxed text-white/50">
              Разработка и техническое сопровождение цифровых продуктов: сайты, сервисы, AI,
              автоматизация и инфраструктура.
            </p>
            <div className="flex flex-col gap-2.5">
              <a
                href={`mailto:${site.contacts.email}`}
                className="inline-flex items-center gap-2 text-[0.88rem] text-white/75 transition-colors hover:text-lime"
              >
                <Mail className="size-4 text-lime" aria-hidden />
                {site.contacts.email}
              </a>
              <a
                href={site.contacts.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.88rem] text-white/75 transition-colors hover:text-lime"
              >
                <Send className="size-4 text-lime" aria-hidden />
                {site.contacts.telegramHandle}
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/35">
                Разработка
              </p>
              <ul className="flex flex-col gap-2">
                {site.footerServices.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.85rem] text-white/60 transition-colors hover:text-lime"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/35">
                Обслуживание
              </p>
              <ul className="flex flex-col gap-2">
                {site.footerMaintenance.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.85rem] text-white/60 transition-colors hover:text-lime"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/35">
                Компания
              </p>
              <ul className="flex flex-col gap-2">
                {[
                  { label: "Цены", href: "/pricing" },
                  { label: "О нас", href: "/about" },
                  { label: "Блог", href: "/blog" },
                  { label: "Контакты", href: "/contacts" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[0.85rem] text-white/60 transition-colors hover:text-lime"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white/35">
                Начать
              </p>
              <p className="text-[0.85rem] leading-relaxed text-white/60">
                Опишите задачу — ответим с оценкой и планом работ.
              </p>
              <Link
                href="/contacts"
                className="mt-3 inline-flex h-9 items-center rounded-md bg-lime px-3.5 text-[0.82rem] font-semibold text-ink transition-colors hover:bg-[#c9e84f]"
              >
                Обсудить проект
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-5 border-b border-white/10 pb-6 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <p className="text-[0.8rem] text-white/70">
              © {year} {site.name}
            </p>
            <p className="max-w-xl text-[0.74rem] leading-relaxed text-white/35">
              Информация на сайте не является публичной офертой. Указанные цены — стартовая
              стоимость и зависят от объёма работ. Стоимость VPS, доменов, платных сервисов и
              внешней инфраструктуры оплачивается отдельно.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.76rem] text-white/40">
            <Link href="/privacy" className="transition-colors hover:text-lime">
              Политика конфиденциальности
            </Link>
            <Link href="/terms" className="transition-colors hover:text-lime">
              Условия использования
            </Link>
            <Link href="/sitemap.xml" className="transition-colors hover:text-lime">
              Карта сайта
            </Link>
          </div>
        </div>

        <nav aria-label="Все услуги" className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
          {directions.map((direction) => (
            <Link
              key={direction.slug}
              href={`/${direction.slug}`}
              className="text-[0.73rem] text-white/30 transition-colors hover:text-lime"
            >
              {direction.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
