import { Logo } from "@/components/ui/logo";
import { site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="shell py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <div className="[&_span]:text-paper">
              <Logo />
            </div>
            <p className="mt-6 max-w-sm text-[0.875rem] leading-relaxed text-paper/55">
              {site.description}
            </p>
            <a
              href={`mailto:${site.demoEmail}`}
              className="mt-5 inline-flex border-b border-paper/20 pb-0.5 text-[0.8125rem] text-paper/80 transition-colors hover:border-acid hover:text-paper"
            >
              {site.demoEmail}
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="label text-[0.5625rem] text-paper/40">Продукт</p>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-[0.8125rem] text-paper/60 transition-colors hover:text-paper">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label text-[0.5625rem] text-paper/40">Начать</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[0.8125rem] text-paper/60">
              <li>
                <a href="#demo" className="transition-colors hover:text-paper">
                  Запросить демо
                </a>
              </li>
              <li>
                <a href="#pricing" className="transition-colors hover:text-paper">
                  Тарифы и оплата
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-paper">
                  Частые вопросы
                </a>
              </li>
              <li>Москва · данные в России</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/15 pt-6 text-[0.75rem] leading-relaxed text-paper/40 md:flex-row md:items-start md:justify-between">
          <p className="max-w-2xl">
            © {year} DATUM. {site.disclaimer}
          </p>
          <a
            href="https://ada-ai.ru"
            className="shrink-0 text-paper/50 underline decoration-paper/20 underline-offset-4 transition-colors hover:text-paper"
          >
            Сделано в студии ADA
          </a>
        </div>
      </div>
    </footer>
  );
}
