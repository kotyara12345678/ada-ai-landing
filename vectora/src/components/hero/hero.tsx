"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { SphereCanvas } from "@/components/hero/sphere-canvas";
import { primaryCta, site } from "@/lib/site";

const capabilities = ["AI / Software", "Infrastructure", "Automation", "Digital products"];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  const reduced = useReducedMotion();
  const motionProps = (delay: number) => (reduced ? {} : fade(delay));

  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-line">
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[52%] md:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_45%,rgba(0,184,121,0.16),transparent_58%)]" />
        <SphereCanvas className="opacity-90" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-void)_0%,transparent_38%)]" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-[38%] z-0 h-[52%] opacity-70 md:hidden">
        <SphereCanvas className="opacity-55" />
      </div>

      <div className="shell relative z-10 flex min-h-[92svh] flex-col pb-8 pt-8 md:pt-10">
        <motion.div
          {...motionProps(0.05)}
          className="mono flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-line pb-4 text-[0.5625rem] text-muted"
        >
          <span className="text-lime">01 / Digital engineering</span>
          <span className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-lime" />
            </span>
            System status: active
          </span>
          <span className="ml-auto hidden sm:inline">AI / Software / Infrastructure</span>
        </motion.div>

        <div className="grid flex-1 content-center gap-10 py-12 md:grid-cols-12 md:items-end md:gap-8 md:py-16">
          <div className="md:col-span-8 lg:col-span-7">
            <motion.h1 {...motionProps(0.12)} className="display">
              <span className="block">Инженерия</span>
              <span className="block text-[color:var(--color-muted)]/85">цифрового</span>
              <span className="accent-text block drop-shadow-[0_0_36px_rgba(163,255,112,0.18)]">
                будущего
              </span>
            </motion.h1>
          </div>

          <motion.div {...motionProps(0.3)} className="md:col-span-4 md:pb-3">
            <p className="max-w-md border-l border-line pl-5 text-[0.9375rem] leading-relaxed text-muted">
              Разрабатываем AI-продукты, цифровые системы и программные решения, которые помогают
              бизнесу расти, автоматизировать процессы и работать эффективнее.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href={primaryCta.href} className="btn btn-primary group">
                {primaryCta.label}
                <ArrowUpRight
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
              <a href="#solutions" className="btn btn-ghost">
                Наши решения
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...motionProps(0.45)}
          className="flex flex-col gap-5 border-t border-line pt-5 md:flex-row md:items-center md:justify-between"
        >
          <ul className="mono flex flex-wrap gap-x-6 gap-y-2 text-[0.5625rem] text-muted">
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="size-1 rounded-full bg-emerald" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-6 md:justify-end">
            <span className="mono text-[0.5625rem] text-muted">
              {site.label} · 2026
            </span>
            <a
              href="#intro"
              className="mono group inline-flex items-center gap-2 text-[0.5625rem] text-text"
            >
              Scroll
              <ArrowDown
                className="size-3.5 text-lime transition-transform group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
