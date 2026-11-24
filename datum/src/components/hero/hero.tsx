"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { DashboardMock } from "@/components/hero/dashboard-mock";
import { primaryCta } from "@/lib/site";

const assurances = ["14 дней без карты", "Данные в России", "Настройка за вечер"];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  const reduced = useReducedMotion();
  const motionProps = (delay: number) => (reduced ? {} : fade(delay));

  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_70%_at_50%_0%,rgba(43,65,234,0.14),transparent_70%)]"
      />
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-[0.45] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

      <div className="shell relative pt-14 md:pt-20">
        <div className="mx-auto max-w-3xl text-center">
          <motion.a
            {...motionProps(0.02)}
            href="#product"
            className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white px-3 py-1.5 text-[0.6875rem] text-muted shadow-sm transition-colors hover:border-cobalt/40 hover:text-ink"
          >
            <span className="rounded-full bg-acid px-1.5 py-0.5 text-[0.5625rem] font-semibold text-ink">new</span>
            Алерты в Telegram и единый слой метрик
            <ArrowRight className="size-3" aria-hidden="true" />
          </motion.a>

          <motion.h1 {...motionProps(0.08)} className="display mt-6">
            Все цифры компании
            <br />
            <span className="text-cobalt">на одном экране</span>
          </motion.h1>

          <motion.p {...motionProps(0.16)} className="lead mx-auto mt-6 max-w-xl">
            DATUM собирает данные из продукта, продаж и финансов в один живой дашборд. Без
            аналитика в штате и без недель на настройку.
          </motion.p>

          <motion.div {...motionProps(0.24)} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={primaryCta.href} className="btn btn-primary w-full sm:w-auto">
              {primaryCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </a>
            <a href="#product" className="btn btn-ghost w-full sm:w-auto">
              Посмотреть, как выглядит
            </a>
          </motion.div>

          <motion.ul
            {...motionProps(0.3)}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.75rem] text-muted"
          >
            {assurances.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="size-3.5 text-cobalt" aria-hidden="true" />
                {item}
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          {...motionProps(0.36)}
          className="relative mx-auto mt-12 max-w-[1080px] pb-12 md:mt-14 md:pb-16"
        >
          <div aria-hidden="true" className="absolute inset-x-10 -top-4 bottom-8 rounded-2xl bg-cobalt/10 blur-2xl" />
          <div className="relative">
            <DashboardMock />
          </div>
          <p className="mt-4 text-center text-[0.6875rem] text-muted">
            Интерфейс демонстрационный — цифры вымышлены
          </p>
        </motion.div>
      </div>
    </section>
  );
}
