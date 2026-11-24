"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { menus } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Menu() {
  const [active, setActive] = useState(menus[0].id);
  const reduced = useReducedMotion();
  const current = menus.find((section) => section.id === active) ?? menus[0];

  return (
    <section id="menu" className="relative border-t border-line bg-paper">
      <div className="paper-grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="shell relative py-16 md:py-24">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-3">
            <p className="label flex items-baseline gap-3 text-muted">
              <span className="text-clay">02</span>
              Меню
            </p>
          </div>

          <div className="md:col-span-6">
            <h2 className="h2">Коротко и по сезону</h2>
            <p className="lead mt-5 max-w-md">
              Три формата одного вечера: ужин по меню, бар до закрытия и дегустация, где выбор
              оставляем шефу.
            </p>
          </div>

          <div className="md:col-span-3 md:text-right">
            <span className="label text-[0.5rem] text-muted">обновлено 12 ноября</span>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-4 md:mt-14">
          {menus.map((section) => {
            const isActive = section.id === active;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActive(section.id)}
                aria-pressed={isActive}
                className={cn(
                  "rounded-full border px-5 py-2.5 text-[0.8125rem] transition-colors",
                  isActive
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink/70 hover:border-ink/50 hover:text-ink",
                )}
              >
                {section.label}
                <span className="ml-2 text-[0.625rem] opacity-60">{section.items.length}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8 lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={current.id}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {current.items.map((item) => (
                  <li
                    key={item.name}
                    className="group grid grid-cols-[1fr_auto] items-baseline gap-x-5 gap-y-1 border-b border-line/70 py-5 transition-colors hover:border-ink/40"
                  >
                    <div className="min-w-0">
                      <p className="font-display text-[1.25rem] leading-tight text-ink">
                        {item.name}
                        {item.mark ? (
                          <span className="label ml-3 inline-block translate-y-[-2px] rounded-full border border-clay/40 px-2 py-0.5 align-middle text-[0.4375rem] tracking-[0.14em] text-clay">
                            {item.mark}
                          </span>
                        ) : null}
                      </p>
                      <p className="mt-1 text-[0.8125rem] leading-relaxed text-muted">{item.note}</p>
                    </div>
                    <span className="text-[0.9375rem] tabular-nums text-ink/80">{item.price}</span>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <div className="border border-line bg-bone/60 p-6">
              <p className="label text-clay">{current.caption}</p>
              <p className="mt-4 text-[0.875rem] leading-relaxed text-ink/75">{current.note}</p>
              <div className="mt-6 space-y-2 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-muted">
                <p>Аллергии и ограничения — скажите при брони, кухня подстроится.</p>
                <p>Счёт на компанию до шести человек включён в обслуживание.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
