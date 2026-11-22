"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  const light = overlay && !scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-500",
          light
            ? "border-transparent bg-transparent text-paper"
            : "border-b border-ink/10 bg-paper text-ink",
        )}
      >
        <div className="shell flex h-[72px] items-center justify-between gap-6 md:h-[84px]">
          <Link
            href="/"
            className="text-[15px] font-semibold tracking-[0.34em] transition-opacity hover:opacity-70"
            aria-label="AUREON — home"
          >
            AUREON
          </Link>

          <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label link-line pb-0 text-current opacity-80 transition-opacity hover:opacity-100"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "label hidden items-center gap-2 border px-5 py-3 transition-colors duration-300 md:inline-flex",
                light
                  ? "border-paper/40 text-paper hover:bg-paper hover:text-ink"
                  : "border-ink/25 text-ink hover:bg-ink hover:text-paper",
              )}
            >
              Start a project
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-11 w-11 items-center justify-center md:hidden"
            >
              {open ? <X size={20} strokeWidth={1.4} /> : <Menu size={20} strokeWidth={1.4} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-paper pt-[72px] md:hidden"
          >
            <div className="shell flex h-[calc(100dvh-72px)] flex-col justify-between gap-8 overflow-y-auto pb-10 pt-10">
              <nav aria-label="Mobile" className="flex flex-col">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={reduced ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.06 * index,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="border-b border-ink/10"
                  >
                    <Link
                      href={link.href}
                      className="display flex items-baseline gap-4 py-5 text-[2.6rem] leading-none"
                    >
                      <span className="label text-stone">0{index + 1}</span>
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="space-y-5">
                <Link
                  href="/contact"
                  className="label flex w-full items-center justify-center border border-ink/25 px-5 py-4"
                >
                  Start a project
                </Link>
                <div className="label space-y-2 text-stone">
                  <p>{site.email}</p>
                  <p>{site.phone}</p>
                  <p>{site.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
