"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-muted/15 bg-graphite/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 md:h-18">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${site.name} — на главную`}>
          <span className="relative flex size-7 items-center justify-center rounded-[7px] border border-emerald/40 bg-emerald/10">
            <span className="size-2 rounded-[2px] bg-emerald transition-transform duration-300 group-hover:rotate-45" />
          </span>
          <span className="font-display text-[1.05rem] font-semibold tracking-tight text-bone">
            {site.name}
          </span>
          <span className="hidden border-l border-muted/25 pl-2.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted sm:block">
            dev studio
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Основная навигация">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[0.86rem] transition-colors",
                  active ? "text-bone" : "text-muted hover:text-bone",
                )}
              >
                {item.label}
                {active ? (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-emerald" aria-hidden />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.contacts.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-muted/25 px-4 py-2 font-mono text-[0.7rem] tracking-wide text-bone/80 transition-colors hover:border-emerald/60 hover:text-emerald md:inline-flex"
          >
            Telegram
            <ArrowUpRight className="size-3" aria-hidden />
          </a>
          <Link
            href="/contacts"
            className="group inline-flex items-center gap-1.5 rounded-full bg-emerald px-4 py-2 text-[0.82rem] font-medium text-graphite transition-colors hover:bg-[#25dd90]"
          >
            Обсудить проект
            <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            className="ml-1 flex size-9 items-center justify-center rounded-full border border-muted/25 text-bone lg:hidden"
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-muted/15 bg-graphite lg:hidden"
          >
            <nav className="container-page flex flex-col py-4" aria-label="Мобильная навигация">
              {site.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between border-b border-muted/10 py-3.5 text-[0.98rem] text-bone/90 last:border-b-0"
                >
                  {item.label}
                  <ArrowUpRight className="size-4 text-muted" aria-hidden />
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 pb-2">
                <a
                  href={site.contacts.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-muted/25 px-4 py-2.5 text-center text-sm text-bone"
                >
                  Telegram {site.contacts.telegramHandle}
                </a>
                <a
                  href={`mailto:${site.contacts.email}`}
                  className="rounded-full border border-muted/25 px-4 py-2.5 text-center text-sm text-bone"
                >
                  {site.contacts.email}
                </a>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
