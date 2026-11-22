"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { SectionHead } from "@/components/ui/section-head";
import { solutions } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Solutions() {
  const [open, setOpen] = useState<string | null>(solutions[0].id);
  const reduced = useReducedMotion();

  return (
    <section id="solutions" className="relative border-b border-line py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="03"
          label="Решения"
          title="От идеи до работающей системы"
          description="Шесть направлений, которые можно взять по отдельности или как один продуктовый цикл."
          aside={
            <span className="mono text-[0.5625rem] text-muted">
              06 directions / one team
            </span>
          }
        />

        <ul className="mt-10 md:mt-14">
          {solutions.map((solution) => {
            const isOpen = open === solution.id;
            return (
              <li key={solution.id} className="border-t border-line last:border-b">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : solution.id)}
                  aria-expanded={isOpen}
                  aria-controls={`solution-${solution.id}`}
                  className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-4 gap-y-3 py-5 text-left transition-colors hover:bg-white/[0.015] md:grid-cols-12 md:items-baseline md:gap-6 md:py-6"
                >
                  <span className="mono text-[0.5625rem] text-muted md:col-span-1">
                    {solution.index}
                  </span>

                  <span className="md:col-span-5">
                    <span
                      className={cn(
                        "block font-display text-[1.375rem] font-medium tracking-tight transition-colors md:text-[1.75rem]",
                        isOpen ? "text-lime" : "text-text group-hover:text-lime/90",
                      )}
                    >
                      {solution.name}
                    </span>
                    <span className="mono mt-2 block text-[0.5rem] tracking-[0.24em] text-muted">
                      {solution.subtitle}
                    </span>
                  </span>

                  <span className="col-span-2 text-[0.875rem] leading-relaxed text-muted md:col-span-5 md:text-[0.9375rem]">
                    {solution.summary}
                  </span>

                  <span className="col-start-3 row-start-1 flex size-8 items-center justify-center justify-self-end rounded-full border border-line text-muted transition-colors group-hover:border-lime/40 group-hover:text-lime md:col-span-1">
                    {isOpen ? (
                      <Minus className="size-3.5" aria-hidden="true" />
                    ) : (
                      <Plus className="size-3.5" aria-hidden="true" />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`solution-${solution.id}`}
                      initial={reduced ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 border-t border-line/60 bg-white/[0.012] px-0 py-6 md:grid-cols-12 md:gap-8 md:pl-[calc(8.333%+1.5rem)]">
                        <ul className="grid gap-2.5 md:col-span-7">
                          {solution.items.map((item) => (
                            <li key={item} className="flex items-baseline gap-3 text-[0.875rem] text-muted">
                              <span className="size-1 shrink-0 translate-y-[-2px] rounded-full bg-emerald" aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>

                        <div className="md:col-span-4">
                          <p className="mono text-[0.5rem] text-muted/70">Stack</p>
                          <ul className="mt-3 flex flex-wrap gap-1.5">
                            {solution.tech.map((tech) => (
                              <li
                                key={tech}
                                className="rounded-full border border-line px-2.5 py-1 text-[0.6875rem] text-muted"
                              >
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
