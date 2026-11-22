import { Link } from "@/components/ui/route-link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="bg-canvas">
      <div className="shell flex min-h-[70vh] flex-col justify-center py-16">
        <p className="eyebrow text-teal">Ошибка 404</p>
        <h1 className="h1 mt-4 max-w-[18ch]">Такой страницы нет</h1>
        <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-graphite/70">
          Адрес мог измениться, а страница — переехать. Ниже основные разделы сайта
          {" "}
          {site.name}.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            <ArrowLeft className="size-4" aria-hidden="true" />
            На главную
          </Link>
          <Link href="/projects" className="btn btn-outline">
            Смотреть проекты
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <nav aria-label="Разделы сайта" className="mt-12 border-t border-line pt-6">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {site.nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-3 border-b border-line py-2 text-[0.9375rem] text-graphite/80 transition-colors hover:text-navy"
                >
                  {item.label}
                  <ArrowUpRight className="size-4 text-muted" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
