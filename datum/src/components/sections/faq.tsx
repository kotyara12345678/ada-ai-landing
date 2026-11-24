"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section id="faq" className="border-t border-line bg-paper">
      <div className="shell grid gap-10 py-16 md:grid-cols-12 md:gap-12 md:py-24">
        <div className="md:col-span-4">
          <p className="label flex items-baseline gap-2.5 text-muted">
            <span className="text-cobalt">05</span>
            Вопросы
          </p>
          <h2 className="h2 mt-4">Коротко о главном</h2>
          <p className="lead mt-4 max-w-xs text-[0.875rem]">
            Не нашли ответ? Напишите — отвечаем в рабочий день, обычно быстрее.
          </p>
          <a
            href={`mailto:${"team@datum.example"}`}
            className="mt-5 inline-flex border-b border-ink/25 pb-0.5 text-[0.8125rem] text-ink transition-colors hover:border-cobalt hover:text-cobalt"
          >
            team@datum.example
          </a>
        </div>

        <div className="md:col-span-8">
          <div className="border-t border-line">
            {faq.map((item, index) => {
              const isOpen = open === index;
              return (
                <div key={item.question} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${index}`}
                    className="flex w-full items-start justify-between gap-5 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "text-[0.9375rem] font-medium leading-snug transition-colors",
                        isOpen ? "text-ink" : "text-ink/80",
                      )}
                    >
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border transition-colors",
                        isOpen ? "border-cobalt bg-cobalt text-white" : "border-line-strong text-muted",
                      )}
                    >
                      <Plus
                        className={cn("size-3.5 transition-transform duration-300", isOpen ? "rotate-45" : "")}
                        aria-hidden="true"
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        id={`faq-panel-${index}`}
                        initial={reduced ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-5 pr-10 text-[0.875rem] leading-relaxed text-muted">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
