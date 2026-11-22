"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/ui/route-link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { primaryCta, site } from "@/lib/site";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";

/** В статической витрине pathname приходит вместе с basePath — отрезаем его. */
function useCurrentPath() {
  const pathname = usePathname() ?? "/";
  return pathname.replace(/^\/works\/[^/]+/, "") || "/";
}

export function Header() {
  const pathname = useCurrentPath();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-canvas/92 backdrop-blur-md transition-shadow",
        scrolled ? "border-line shadow-[0_1px_0_0_rgba(36,42,48,0.04)]" : "border-line/70",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-3 md:h-[4.5rem] md:gap-6">
        <Link href="/" aria-label="CONTERRA — на главную" className="min-w-0 shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "group relative py-1 text-[0.875rem] transition-colors",
                isActive(item.href)
                  ? "text-navy"
                  : "text-graphite/70 hover:text-graphite",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-teal transition-transform duration-300",
                  isActive(item.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={primaryCta.href}
            className="btn btn-primary hidden h-11 min-h-0 px-5 text-[0.8125rem] md:inline-flex"
          >
            {primaryCta.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex size-11 items-center justify-center border border-line bg-paper text-graphite transition-colors hover:border-navy lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-line bg-canvas lg:hidden"
          >
            <div className="shell max-h-[calc(100dvh-4rem)] overflow-y-auto py-6">
              <nav aria-label="Мобильная навигация">
                <ul>
                  {site.nav.map((item, index) => (
                    <li key={item.href} className="border-b border-line">
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className={cn(
                          "flex items-baseline justify-between gap-4 py-4",
                          isActive(item.href) ? "text-navy" : "text-graphite",
                        )}
                      >
                        <span className="font-display text-[1.375rem] font-medium tracking-tight">
                          {item.label}
                        </span>
                        <span className="eyebrow text-[0.625rem] text-muted">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <p className="eyebrow mt-6 text-muted">Направления</p>
              <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services#${service.slug}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 py-1.5 text-[0.9375rem] text-graphite/75 hover:text-navy"
                    >
                      <span className="size-1 shrink-0 bg-teal" aria-hidden="true" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-3">
                <Link href={primaryCta.href} onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  {primaryCta.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={`mailto:${site.demoEmail}`}
                  className="btn btn-outline w-full text-[0.8125rem]"
                >
                  {site.demoEmail}
                </a>
              </div>
              <p className="mt-4 pb-2 text-[0.6875rem] leading-relaxed text-muted">
                Контакты приведены для демонстрационного концепта.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
