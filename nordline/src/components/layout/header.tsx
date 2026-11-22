"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { company, nav } from "@/lib/content";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/ui/logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
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

  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        solid
          ? "border-b border-graphite/12 bg-paper text-graphite"
          : "border-b border-paper/15 text-paper",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-6 md:h-20">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3"
          aria-label="NORDLINE — в начало страницы"
        >
          <LogoMark className="h-8 w-8" />
          <span className="flex flex-col leading-none">
            <span className="text-[1rem] font-extrabold tracking-[0.16em] md:text-[1.1rem]">
              NORDLINE
            </span>
            <span
              className={cn(
                "label mt-1.5 text-[0.5rem]",
                solid ? "text-graphite/75" : "text-paper/70",
              )}
            >
              промышленные системы
            </span>
          </span>
        </a>

        <nav aria-label="Основная навигация" className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-2 text-[0.8125rem] font-medium tracking-wide"
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 md:gap-5">
          <a
            href={company.phoneHref}
            className={cn(
              "label hidden text-[0.625rem] tracking-[0.08em] transition-colors hover:text-accent xl:block",
              solid ? "text-graphite/70" : "text-paper/70",
            )}
          >
            {company.phone}
          </a>
          <a
            href="#contacts"
            className="btn btn-accent hidden min-h-0 h-11 px-5 text-[0.625rem] md:inline-flex"
          >
            Запросить предложение
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            className={cn(
              "flex h-11 w-11 items-center justify-center border lg:hidden",
              solid ? "border-graphite/20" : "border-paper/30",
            )}
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="h-[calc(100dvh-4rem)] overflow-y-auto bg-dark text-paper lg:hidden"
      >
        <nav aria-label="Мобильная навигация" className="shell flex flex-col py-6">
          {nav.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between gap-4 border-b border-paper/12 py-5"
            >
              <span className="text-[1.75rem] font-bold tracking-tight">{item.label}</span>
              <span className="label text-paper/75">0{index + 1}</span>
            </a>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <a href="#contacts" onClick={() => setOpen(false)} className="btn btn-accent w-full">
              Обсудить задачу
            </a>
            <div className="flex flex-col gap-1">
              <a href={company.phoneHref} className="text-lg font-semibold">
                {company.phone}
              </a>
              <a href={`mailto:${company.email}`} className="text-sm text-paper/70">
                {company.email}
              </a>
            </div>
            <p className="label text-[0.5625rem] text-paper/50">
              Контакты приведены для демонстрационного концепта
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
