import { ArrowUpRight } from "lucide-react";
import { company, directions, nav } from "@/lib/content";
import { LogoMark } from "@/components/ui/logo";
import { PrivacyDialog } from "@/components/layout/privacy-dialog";

export function Footer() {
  return (
    <footer className="bg-dark text-paper">
      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#top" className="flex items-center gap-3" aria-label="NORDLINE — в начало страницы">
              <LogoMark className="h-9 w-9" />
              <span className="flex flex-col leading-none">
                <span className="text-[1.1rem] font-extrabold tracking-[0.16em]">NORDLINE</span>
                <span className="label mt-1.5 text-[0.5rem] text-paper/70">промышленные системы</span>
              </span>
            </a>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/75">
              {company.tagline}. Подбор, комплектация и сопровождение поставки для предприятий
              России.
            </p>
            <p className="mt-6 max-w-sm border-l border-accent pl-4 text-[0.6875rem] leading-relaxed text-paper/75">
              {company.disclaimer}
            </p>
          </div>

          <nav aria-label="Разделы сайта" className="lg:col-span-2 lg:col-start-6">
            <h2 className="label text-paper/50">Разделы</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-paper/75 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="label text-paper/50">Направления</h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {directions.map((direction) => (
                <li key={direction.id}>
                  <a
                    href="#directions"
                    className="text-sm text-paper/75 transition-colors hover:text-accent"
                  >
                    {direction.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="label text-paper/50">Контакты</h2>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={company.phoneHref}
                  className="font-semibold transition-colors hover:text-accent"
                >
                  {company.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.email}`}
                  className="text-paper/75 transition-colors hover:text-accent"
                >
                  {company.email}
                </a>
              </li>
              <li className="text-paper/75">{company.address}</li>
              <li className="text-paper/70">{company.hours}</li>
            </ul>
            <a
              href="#contacts"
              className="group mt-6 inline-flex items-center gap-2 border-b border-paper/25 pb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
            >
              Запросить предложение
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/12 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="label text-[0.5625rem] tracking-[0.1em] text-paper/50">
            © 2026 NORDLINE · демонстрационный концепт
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <PrivacyDialog />
            <p className="text-[0.75rem] text-paper/50">
              Дизайн и разработка —{" "}
              <span className="font-semibold text-paper/70">IT-студия ADA</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
