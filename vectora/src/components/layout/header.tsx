"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { primaryCta, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const sectionIds = site.nav.map((item) => item.href.replace("#", ""));

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0.01, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
          ? "border-line bg-void/78 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 md:h-[4.75rem]">
        <a href="#top" aria-label="VECTORA — к началу страницы" className="min-w-0 shrink-0">
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-8 lg:flex">
          {site.nav.map((item) => {
            const id = item.href.replace("#", "");
            const isActive = active === id;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative py-1 text-[0.8125rem] transition-colors",
                  isActive ? "text-text" : "text-muted hover:text-text",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute inset-x-0 -bottom-1 h-px origin-left bg-lime transition-transform duration-300",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={primaryCta.href}
            className="btn btn-primary hidden h-10 min-h-0 px-5 text-[0.8125rem] md:inline-flex"
          >
            {primaryCta.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="vectora-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className="flex size-11 items-center justify-center rounded-full border border-line bg-white/[0.03] text-text transition-colors hover:border-lime/40 lg:hidden"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="vectora-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-y-auto border-t border-line bg-void/96 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Мобильная навигация" className="shell flex max-h-[calc(100dvh-4rem)] flex-col gap-0 py-6">
              {site.nav.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between gap-4 border-b border-line py-4"
                >
                  <span className="font-display text-[1.75rem] font-medium tracking-tight text-text">
                    {item.label}
                  </span>
                  <span className="mono text-[0.5625rem] text-muted">
                    0{index + 1}
                  </span>
                </a>
              ))}

              <div className="mt-7 flex flex-col gap-3">
                <a href={primaryCta.href} onClick={() => setOpen(false)} className="btn btn-primary w-full">
                  {primaryCta.label}
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                </a>
                <a href={`mailto:${site.demoEmail}`} className="btn btn-ghost w-full text-[0.8125rem]">
                  {site.demoEmail}
                </a>
              </div>

              <div className="mono mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[0.5625rem] text-muted">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-lime shadow-[0_0_10px_rgba(163,255,112,0.8)]" />
                  System status: active
                </span>
                <span>Digital engineering</span>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
