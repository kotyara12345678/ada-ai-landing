import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LinkButton } from "@/components/ui/Button";
import { directions } from "@/config/services";

export const metadata: Metadata = {
  title: "Страница не найдена — 404",
  description: "Запрошенная страница не существует. Перейдите к направлениям разработки или свяжитесь с командой.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-32 md:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" aria-hidden />
      <div className="container-page relative pb-20">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-emerald">error 404</p>
        <h1 className="mt-5 max-w-2xl text-h2 text-bone">Такой страницы нет</h1>
        <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-muted">
          Возможно, ссылка устарела или в адресе опечатка. Ниже — основные разделы сайта.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/" withArrow>
            На главную
          </LinkButton>
          <LinkButton href="/contacts" variant="secondary">
            Написать нам
          </LinkButton>
        </div>

        <div className="mt-14 grid gap-x-8 gap-y-0 border-t border-muted/15 sm:grid-cols-2 lg:grid-cols-3">
          {directions.map((direction) => (
            <Link
              key={direction.slug}
              href={`/${direction.slug}`}
              className="group flex items-center justify-between border-b border-muted/10 py-4 text-[0.9rem] text-bone/80 transition-colors hover:text-emerald"
            >
              {direction.name}
              <ArrowUpRight className="size-3.5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
