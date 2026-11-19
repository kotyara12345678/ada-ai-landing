"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Menu, Send, X } from "lucide-react";
import { site } from "@/config/site";
import { directions } from "@/config/services";
import { cn } from "@/lib/utils";

const devDirections = directions.filter((item) => item.group === "development");
const maintenanceDirections = directions.filter((item) => item.group === "maintenance");

const navItems = site.nav.filter((item) => item.href !== "/web-development");

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!servicesOpen) return;

    const onClick = (event: MouseEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };

    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  const isServicesActive =
    devDirections.some((item) => pathname === `/${item.slug}`) ||
    maintenanceDirections.some((item) => pathname === `/${item.slug}`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-ink-deep text-white transition-shadow",
        scrolled ? "border-white/10 shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]" : "border-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} — на главную`}>
          <span className="flex size-9 items-center justify-center rounded-md bg-lime font-display text-[1rem] font-bold text-ink">
            A
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-[1.1rem] font-bold tracking-tight text-white">
              {site.name}
            </span>
            <span className="mt-1 hidden text-[0.6rem] uppercase tracking-[0.16em] text-white/40 sm:block">
              digital studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Основная навигация">
          <div className="relative" ref={servicesRef}>
            <button
              type="button"
              onClick={() => setServicesOpen((value) => !value)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              className={cn(
                "inline-flex items-center gap-1 rounded-lg px-3 py-2 text-[0.88rem] transition-colors",
                isServicesActive || servicesOpen
                  ? "text-lime"
                  : "text-white/75 hover:bg-white/5 hover:text-white",
              )}
            >
              Услуги
              <ChevronDown
                className={cn("size-4 transition-transform", servicesOpen && "rotate-180")}
                aria-hidden
              />
            </button>

            <AnimatePresence>
              {servicesOpen ? (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="absolute left-1/2 top-[calc(100%+0.6rem)] w-[38rem] -translate-x-1/2 rounded-xl border border-white/10 bg-ink-soft p-5 shadow-panel"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-lime">
                        Разработка
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {devDirections.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`/${item.slug}`}
                              className="flex items-center justify-between gap-2 rounded-md px-2 py-2 text-[0.85rem] text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              {item.name}
                              <span className="text-[0.72rem] text-white/35">
                                от {item.priceFrom.toLocaleString("ru-RU")} ₽
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-3 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-white/35">
                        Обслуживание
                      </p>
                      <ul className="flex flex-col gap-0.5">
                        {maintenanceDirections.map((item) => (
                          <li key={item.slug}>
                            <Link
                              href={`/${item.slug}`}
                              className="flex items-center justify-between gap-2 rounded-md px-2 py-2 text-[0.85rem] text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                            >
                              {item.name}
                              <span className="text-[0.72rem] text-white/35">
                                от {item.priceFrom.toLocaleString("ru-RU")} ₽
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
                    <p className="text-[0.76rem] text-white/40">
                      Тарифы обслуживания — от 1 490 ₽/мес.
                    </p>
                    <Link
                      href="/maintenance"
                      className="text-[0.8rem] font-semibold text-lime hover:text-white"
                    >
                      Все услуги обслуживания →
                    </Link>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {navItems.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-[0.88rem] transition-colors",
                  active ? "text-lime" : "text-white/75 hover:bg-white/5 hover:text-white",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${site.contacts.email}`}
            className="hidden items-center gap-1.5 text-[0.83rem] text-white/50 transition-colors hover:text-lime 2xl:inline-flex"
          >
            <Mail className="size-4" aria-hidden />
            {site.contacts.email}
          </a>
          <Link
            href="/contacts"
            className="hidden h-10 items-center rounded-lg bg-lime px-4 text-[0.86rem] font-semibold text-ink transition-colors hover:bg-[#c9e84f] sm:inline-flex"
          >
            Обсудить проект
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
            className="flex size-10 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
          >
            {mobileOpen ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-white/10 bg-ink-deep lg:hidden"
          >
            <div className="container-page max-h-[calc(100dvh-4rem)] overflow-y-auto py-4">
              <p className="mb-2 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-lime">
                Разработка
              </p>
              <ul className="grid gap-0.5 sm:grid-cols-2">
                {devDirections.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className="flex items-center justify-between gap-3 rounded-md px-2 py-2.5 text-[0.92rem] text-white/80"
                    >
                      {item.name}
                      <span className="text-[0.72rem] text-white/35">
                        от {item.priceFrom.toLocaleString("ru-RU")} ₽
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="mb-2 mt-4 text-[0.64rem] font-semibold uppercase tracking-[0.14em] text-white/35">
                Обслуживание
              </p>
              <ul className="grid gap-0.5 sm:grid-cols-2">
                {maintenanceDirections.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/${item.slug}`}
                      className="flex items-center justify-between gap-3 rounded-md px-2 py-2.5 text-[0.92rem] text-white/80"
                    >
                      {item.name}
                      <span className="text-[0.72rem] text-white/35">
                        от {item.priceFrom.toLocaleString("ru-RU")} ₽
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-4 grid gap-0.5 border-t border-white/10 pt-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md px-2 py-2.5 text-[0.92rem] text-white/80"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex flex-col gap-2 pb-2">
                <Link
                  href="/contacts"
                  className="flex h-11 items-center justify-center rounded-lg bg-lime text-[0.9rem] font-semibold text-ink"
                >
                  Обсудить проект
                </Link>
                <a
                  href={site.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 items-center justify-center gap-2 rounded-lg border border-white/15 text-[0.85rem] text-white"
                >
                  <Send className="size-4" aria-hidden />
                  Telegram
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
