"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { primaryCta, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-[4.5rem]">
        <a href="#top" aria-label="DATUM — к началу страницы" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-7 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[0.8125rem] text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#demo"
            className="hidden text-[0.8125rem] text-ink/70 transition-colors hover:text-ink md:inline"
          >
            Демо
          </a>
          <a
            href={primaryCta.href}
            className="btn btn-primary hidden h-10 min-h-0 px-4 text-[0.8125rem] md:inline-flex"
          >
            {primaryCta.label}
            <ArrowRight className="size-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="datum-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex size-10 items-center justify-center rounded-lg border border-line-strong text-ink transition-colors hover:border-ink lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="datum-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-line bg-paper lg:hidden"
          >
            <nav aria-label="Мобильная навигация" className="shell flex flex-col py-4">
              {site.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3.5 text-[0.9375rem] text-ink"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={primaryCta.href}
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-5 w-full"
              >
                {primaryCta.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
