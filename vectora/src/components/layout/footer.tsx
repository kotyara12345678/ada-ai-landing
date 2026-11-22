import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";
import { solutions } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-deep/40">
      <div className="shell py-12 md:py-14">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-6 max-w-xs text-[0.875rem] leading-relaxed text-muted">
              {site.tagline}.
            </p>
            <a
              href={`mailto:${site.demoEmail}`}
              className="mono mt-6 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-[0.625rem] text-text transition-colors hover:border-lime hover:text-lime"
            >
              {site.demoEmail}
            </a>
          </div>

          <nav aria-label="Разделы сайта" className="md:col-span-3">
            <p className="mono text-muted/70">Навигация</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[0.875rem] text-muted transition-colors hover:text-text">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="mono text-muted/70">Решения</p>
            <ul className="mt-4 grid gap-2.5">
              {solutions.map((solution) => (
                <li key={solution.id}>
                  <a
                    href="#solutions"
                    className="flex items-baseline gap-2.5 text-[0.875rem] text-muted transition-colors hover:text-text"
                  >
                    <span className="mono text-[0.5625rem] text-emerald">{solution.index}</span>
                    {solution.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[0.75rem] text-muted/70 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">
            © {year} VECTORA. {site.disclaimer}
          </p>
          <a
            href="https://ada-ai.ru"
            className="shrink-0 text-muted underline decoration-white/20 underline-offset-4 transition-colors hover:text-text"
          >
            Сделано в студии ADA
          </a>
        </div>
      </div>
    </footer>
  );
}
