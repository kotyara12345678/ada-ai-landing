import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { directions } from "@/config/services";

export const metadata: Metadata = {
  title: "Страница не найдена — 404",
  description:
    "Запрошенная страница не существует. Перейдите к направлениям разработки и обслуживания или свяжитесь с командой.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="bg-surface">
      <div className="container-page py-14 md:py-20">
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-brand">
          Ошибка 404
        </p>
        <h1 className="mt-4 max-w-2xl text-h2 text-ink">Такой страницы нет</h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink-muted">
          Возможно, ссылка устарела или в адресе опечатка. Ниже — основные разделы сайта.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <LinkButton href="/" withArrow>
            На главную
          </LinkButton>
          <LinkButton href="/contacts" variant="secondary">
            Написать нам
          </LinkButton>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {directions.map((direction) => (
            <Link
              key={direction.slug}
              href={`/${direction.slug}`}
              className="group flex items-center justify-between gap-3 rounded-lg border border-line px-4 py-3 text-[0.88rem] text-ink transition-colors hover:border-brand/40 hover:text-brand"
            >
              {direction.name}
              <ArrowRight
                className="size-3.5 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
