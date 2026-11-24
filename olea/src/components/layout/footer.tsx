import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bone">
      <div className="shell py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-6 max-w-xs text-[0.875rem] leading-relaxed text-muted">
              {site.tagline}. {site.description}
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label text-[0.5rem] text-muted">Навигация</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[0.875rem] text-ink/70 transition-colors hover:text-clay">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label text-[0.5rem] text-muted">Контакты</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[0.875rem] text-ink/70">
              <li>{site.address}</li>
              <li>
                <a href={`tel:${site.phone.replace(/[^\d+]/g, "")}`} className="transition-colors hover:text-clay">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-clay">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="label text-[0.5rem] text-muted">Часы</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[0.8125rem] text-ink/70">
              {site.hours.slice(0, 3).map((row) => (
                <li key={row.days}>
                  <span className="block text-[0.6875rem] text-muted">{row.days}</span>
                  {row.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-[0.75rem] leading-relaxed text-muted md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">
            © {year} OLEA. {site.disclaimer}
          </p>
          <a
            href="https://ada-ai.ru"
            className="shrink-0 text-ink/60 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink"
          >
            Сделано в студии ADA
          </a>
        </div>
      </div>
    </footer>
  );
}
