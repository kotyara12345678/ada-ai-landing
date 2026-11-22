"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionHead } from "@/components/ui/section-head";
import { stack } from "@/lib/content";
import { cn } from "@/lib/utils";

const total = stack.reduce((sum, group) => sum + group.items.length, 0);

export function Stack() {
  const [active, setActive] = useState(stack[0].id);
  const reduced = useReducedMotion();

  return (
    <section id="stack" className="relative border-b border-line py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="05"
          label="Технологии"
          title="Инструменты для создания сложных систем"
          description="Стек выбирается под задачу, а не под моду. Ниже — то, на чём мы строим продукты и инфраструктуру."
          aside={
            <span className="mono text-[0.5625rem] text-muted">
              {total} technologies / 04 layers
            </span>
          }
        />

        <div className="mt-10 md:mt-14">
          <div className="relative mx-auto hidden h-12 w-full max-w-3xl md:block" aria-hidden="true">
            <svg viewBox="0 0 600 48" className="h-full w-full" fill="none" preserveAspectRatio="none">
              <path d="M300 44V22M300 22H90M300 22H510M90 22V6M510 22V6" stroke="rgba(255,255,255,0.12)" />
              <path d="M300 44V22" stroke="rgba(163,255,112,0.55)" strokeDasharray="3 4" />
              <circle cx="300" cy="22" r="3.5" fill="#A3FF70" />
            </svg>
          </div>

          <div className="overflow-hidden rounded-xl border border-line bg-surface/40">
            <div className="mono flex items-center justify-between gap-4 border-b border-line px-5 py-3 text-[0.5rem] tracking-[0.22em] text-muted">
              <span className="flex items-center gap-2 text-lime">
                <span className="size-1.5 rounded-full bg-lime shadow-[0_0_10px_rgba(163,255,112,0.9)]" />
                Core / vectora
              </span>
              <span className="hidden sm:inline">Select a layer</span>
            </div>

            <div className="grid lg:grid-cols-4">
              {stack.map((group) => {
                const isActive = active === group.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onMouseEnter={() => setActive(group.id)}
                    onFocus={() => setActive(group.id)}
                    onClick={() => setActive(group.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative border-b border-line p-5 text-left transition-colors last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0",
                      isActive ? "bg-[rgba(163,255,112,0.045)]" : "hover:bg-white/[0.02]",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 top-0 h-px transition-opacity",
                        isActive ? "bg-lime/60 opacity-100" : "opacity-0",
                      )}
                    />

                    <span className="flex items-baseline justify-between gap-2">
                      <span className={cn("mono text-[0.5rem]", isActive ? "text-lime" : "text-muted/70")}>
                        {group.index}
                      </span>
                      <span className="mono text-[0.5rem] text-muted/50">{group.items.length}</span>
                    </span>

                    <span
                      className={cn(
                        "mt-3 block font-display text-[1.125rem] font-medium tracking-tight transition-colors",
                        isActive ? "text-text" : "text-muted",
                      )}
                    >
                      {group.name}
                    </span>
                    <span className="mt-1 block text-[0.75rem] leading-relaxed text-muted/70">{group.note}</span>

                    <ul className="mt-4 flex flex-col gap-1.5">
                      {group.items.map((item, index) => (
                        <motion.li
                          key={item}
                          initial={false}
                          animate={
                            reduced
                              ? undefined
                              : { opacity: isActive ? 1 : 0.5, x: isActive ? 0 : -2 }
                          }
                          transition={{ duration: 0.25, delay: index * 0.02 }}
                          className={cn(
                            "flex items-center gap-2 text-[0.8125rem] transition-colors",
                            isActive ? "text-text" : "text-muted",
                          )}
                        >
                          <span
                            className={cn(
                              "size-1 rounded-full transition-colors",
                              isActive ? "bg-lime" : "bg-white/15",
                            )}
                            aria-hidden="true"
                          />
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mono mt-4 text-[0.5rem] tracking-[0.2em] text-muted/60">{/* stack is a tool, not a position */}</p>
        </div>
      </div>
    </section>
  );
}
