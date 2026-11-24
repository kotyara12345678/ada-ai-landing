"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/asset";
import { heroFacts } from "@/lib/content";
import { primaryCta, site } from "@/lib/site";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function Hero() {
  const reduced = useReducedMotion();
  const motionProps = (delay: number) => (reduced ? {} : fade(delay));

  return (
    <section id="top" className="relative">
      <div className="shell pt-3 md:pt-5">
        <div className="relative h-[76svh] min-h-[520px] overflow-hidden bg-ink">
          <Image
            src={asset("/images/hero-room.jpg")}
            alt="Тёплый зал ресторана OLEA: терракотовые стены, оливковые банкетки и свечи на столах"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(18,16,12,0.88)_0%,rgba(18,16,12,0.28)_46%,rgba(18,16,12,0.18)_100%)]" />

          <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-9 lg:p-11">
            <motion.div
              {...motionProps(0.05)}
              className="label flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-paper/75"
            >
              <span>Средиземноморская кухня</span>
              <span className="hidden sm:inline">Открытый огонь · сезонное меню</span>
              <span>с 2019</span>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-8">
              <div className="md:col-span-8">
                <motion.p {...motionProps(0.12)} className="label text-paper/65">
                  {site.address}
                </motion.p>
                <motion.h1 {...motionProps(0.18)} className="display mt-4 text-paper">
                  Огонь, олива
                  <br />
                  и немного тишины
                </motion.h1>
              </div>

              <motion.div {...motionProps(0.32)} className="md:col-span-4 md:pb-1">
                <p className="max-w-sm border-l border-paper/25 pl-5 text-[0.9375rem] leading-relaxed text-paper/85">
                  Готовим на углях и в печи, работаем с сезоном и не усложняем то, что уже хорошо.
                  Меню меняется каждые две недели.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={primaryCta.href}
                    className="btn bg-paper text-ink hover:bg-clay hover:text-paper"
                  >
                    {primaryCta.label}
                    <ArrowUpRight className="size-4" aria-hidden="true" />
                  </a>
                  <a
                    href="#menu"
                    className="btn border border-paper/35 text-paper hover:border-paper"
                  >
                    Смотреть меню
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          {...motionProps(0.42)}
          className="flex flex-col gap-4 border-b border-line py-5 sm:flex-row sm:items-center sm:justify-between"
        >
          <ul className="label flex flex-wrap gap-x-8 gap-y-2 text-[0.5625rem] text-muted">
            {heroFacts.map((fact) => (
              <li key={fact.label} className="flex items-baseline gap-2">
                <span className="text-ink/40">{fact.label}</span>
                <span className="text-ink">{fact.value}</span>
              </li>
            ))}
          </ul>

          <a href="#kitchen" className="label group inline-flex items-center gap-2 text-ink/70 hover:text-ink">
            Ниже — о кухне
            <ArrowDown className="size-3.5 text-clay transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
