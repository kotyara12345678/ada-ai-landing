"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const lines = ["Architecture shaped", "by nature."];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.2]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-paper"
      aria-label="AUREON — architecture shaped by nature"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -bottom-[12%]">
        <Image
          src="/images/hero-villa.jpg"
          alt="A concrete, glass and stone residence cantilevered over a pine forest at dusk, warm interior light reflected in a still pool"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/10 to-ink/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/45 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex min-h-[100svh] flex-col justify-between shell pb-6 pt-24 md:pb-8 md:pt-32"
      >
        <div className="flex items-start justify-between gap-6">
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="label text-paper/70"
          >
            Architecture studio — est. 2012
          </motion.p>
          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="label hidden text-right text-paper/70 sm:block"
          >
            Como · Lisbon · Copenhagen
          </motion.p>
        </div>

        <div className="mt-10 flex flex-1 flex-col justify-end md:mt-12">
          <h1 className="display max-w-[17ch] text-[clamp(2.6rem,5.7vw,5.8rem)] text-paper">
            {lines.map((line, index) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={reduced ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{
                    duration: 1.15,
                    delay: 0.15 + index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden">
              <motion.span
                className="block italic text-paper/85"
                initial={reduced ? false : { y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.15, delay: 0.39, ease: [0.16, 1, 0.3, 1] }}
              >
                Designed for life.
              </motion.span>
            </span>
          </h1>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid gap-6 border-t border-paper/25 pt-5 md:grid-cols-12 md:items-end"
          >
            <p className="max-w-[42ch] text-sm leading-relaxed text-paper/75 md:col-span-5">
              We create thoughtful spaces where contemporary architecture meets
              the natural environment — residences shaped by light, material and
              the rhythm of the land.
            </p>

            <div className="md:col-span-4 md:col-start-7">
              <Link
                href="/projects"
                className="label group inline-flex items-center gap-4 border border-paper/40 px-6 py-4 text-paper transition-colors duration-300 hover:bg-paper hover:text-ink"
              >
                Explore projects
                <span className="transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            <div className="flex items-center justify-between gap-6 md:col-span-2 md:justify-end">
              <span className="label text-paper/50">Scroll</span>
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/30">
                <motion.span
                  animate={reduced ? undefined : { y: [0, 4, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown size={14} strokeWidth={1.3} />
                </motion.span>
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
