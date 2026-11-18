"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { HomeFaq } from "@/config/home";

export function FaqAccordion({ items }: { items: HomeFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line rounded-xl border border-line bg-surface">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question} className="px-5">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="group flex w-full items-start justify-between gap-4 py-4 text-left"
              >
                <span className="text-[0.95rem] font-medium leading-snug text-ink group-hover:text-brand">
                  {item.question}
                </span>
                <Plus
                  className={`mt-0.5 size-4 shrink-0 text-ink-muted transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-brand" : ""
                  }`}
                  aria-hidden
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-4 pr-6 text-[0.88rem] leading-relaxed text-ink-muted">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
