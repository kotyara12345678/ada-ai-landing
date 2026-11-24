"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { primaryCta, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
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
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled || open
          ? "border-line bg-bone/92 backdrop-blur-md"
          : "border-transparent bg-bone",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-20">
        <a href="#top" aria-label="OLEA — к началу страницы" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-1 text-[0.8125rem] text-ink/75 transition-colors hover:text-ink"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-clay transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={primaryCta.href}
            className="btn btn-primary hidden h-10 min-h-0 px-5 text-[0.75rem] md:inline-flex"
          >
            {primaryCta.label}
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="olea-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex size-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="olea-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-line bg-bone lg:hidden"
          >
            <nav aria-label="Мобильная навигация" className="shell flex flex-col py-5">
              {site.nav.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between border-b border-line py-4"
                >
                  <span className="font-display text-[1.6rem] text-ink">{item.label}</span>
                  <span className="label text-[0.5rem] text-muted">0{index + 1}</span>
                </a>
              ))}

              <a
                href={primaryCta.href}
                onClick={() => setOpen(false)}
                className="btn btn-primary mt-6 w-full"
              >
                {primaryCta.label}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>

              <p className="label mt-5 text-[0.5rem] text-muted">{site.address}</p>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
