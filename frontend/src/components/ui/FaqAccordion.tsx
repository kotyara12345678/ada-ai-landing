"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { HomeFaq } from "@/config/home";

export function FaqAccordion({ items }: { items: HomeFaq[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-muted/15 border-y border-muted/15">
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors"
              >
                <span className="flex gap-4">
                  <span className="mt-1 hidden font-mono text-[0.7rem] text-muted/60 sm:block">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[1.02rem] leading-snug text-bone transition-colors group-hover:text-emerald">
                    {item.question}
                  </span>
                </span>
                <Plus
                  className={`mt-0.5 size-4 shrink-0 text-muted transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-emerald" : "group-hover:text-bone"
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
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 pl-0 text-[0.94rem] leading-relaxed text-muted sm:pl-9">
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
