import { Link } from "@/components/ui/route-link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-navy text-white">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-white/65">
              {site.tagline}. Проектирование, строительство, реконструкция и инженерные системы
              для коммерческих и промышленных объектов.
            </p>
            <a
              href={`mailto:${site.demoEmail}`}
              className="mt-6 inline-flex items-center gap-2 border-b border-white/25 pb-1 text-[0.9375rem] transition-colors hover:border-teal hover:text-teal"
            >
              {site.demoEmail}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </a>
          </div>

          <nav aria-label="Навигация в подвале" className="md:col-span-3">
            <p className="eyebrow text-white/45">Разделы</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-white/75 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-white/45">Направления</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services#${service.slug}`}
                    className="flex items-baseline gap-2.5 text-[0.9375rem] text-white/75 transition-colors hover:text-white"
                  >
                    <span className="text-[0.6875rem] tabular-nums text-teal">{service.index}</span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.8125rem] leading-relaxed text-white/45">
              Работаем по всей России. {site.areaServed}.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-6 text-[0.75rem] text-white/45 md:flex-row md:items-start md:justify-between">
          <p>
            © {year} CONTERRA. {site.disclaimer}
          </p>
          <a
            href="https://ada-ai.ru"
            className="shrink-0 text-white/60 underline decoration-white/25 underline-offset-4 transition-colors hover:text-white"
          >
            Дизайн и разработка — студия ADA
          </a>
        </div>
      </div>
    </footer>
  );
}
