"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { company } from "@/lib/content";
import { asset } from "@/lib/asset";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section id="top" className="relative isolate min-h-[92svh] overflow-hidden bg-dark text-paper">
      <motion.div
        className="absolute inset-0"
        initial={reduced ? false : { scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={asset("/images/hero-hall.jpg")}
          alt="Производственный цех с линиями промышленного оборудования"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_50%]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,24,22,0.97)_0%,rgba(21,24,22,0.82)_32%,rgba(21,24,22,0.34)_68%,rgba(21,24,22,0.62)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(21,24,22,0.72)_0%,rgba(21,24,22,0.1)_58%,rgba(21,24,22,0.35)_100%)]" />

      <div className="shell relative flex min-h-[92svh] flex-col justify-between pb-8 pt-24 md:pt-28">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-paper/15 pb-4">
          <div className="flex items-baseline gap-4">
            <span className="label text-accent">NL / 01</span>
            <span className="label text-paper/70">Промышленное оборудование</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <span className="label text-paper/70">{company.coordinates}</span>
            <span className="label text-paper/70">Российская Федерация</span>
          </div>
        </div>

        <div className="grid gap-10 py-14 lg:grid-cols-12 lg:items-end lg:gap-8 lg:py-16">
          <div className="lg:col-span-8">
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="display max-w-[19ch] text-[clamp(2.15rem,5.5vw,5.75rem)]"
            >
              Инженерные решения для промышленности{" "}
              <span className="text-accent">нового поколения</span>
            </motion.h1>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-8 lg:col-span-4 lg:pb-2"
          >
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-paper/75 md:text-base">
              Оборудование, комплектующие и комплексные решения для предприятий, где важны
              надёжность, точность и стабильность процессов.
            </p>

            <div className="flex flex-col gap-3">
              <a href="#equipment" className="btn btn-accent w-full">
                Подобрать оборудование
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a href="#directions" className="btn btn-outline w-full">
                Наши направления
              </a>
            </div>

            <dl className="grid grid-cols-2 gap-6 border-t border-paper/15 pt-5">
              <div>
                <dt className="label text-paper/70">Направлений</dt>
                <dd className="mt-2 text-xl font-semibold">04</dd>
              </div>
              <div>
                <dt className="label text-paper/70">Комплектация</dt>
                <dd className="mt-2 text-xl font-semibold">под задачу</dd>
              </div>
            </dl>
          </motion.div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/15 pt-5">
          <a
            href="#about"
            className="label group inline-flex items-center gap-3 text-paper/75 transition-colors hover:text-paper"
          >
            <ArrowDown
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
            Листайте вниз
          </a>
          <span className="label text-[0.5625rem] text-paper/50">
            Демонстрационный концепт · студия ADA
          </span>
        </div>
      </div>
    </section>
  );
}
