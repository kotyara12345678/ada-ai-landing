"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

/**
 * Техническая схема продукта. Сознательно абстрактная: показывает процесс
 * (запрос → решение → действие), а не конкретный интерфейс.
 */
export function SystemDiagram() {
  const reduce = useReducedMotion();
  const nodes = [
    { label: "Запрос", meta: "форма / бот / звонок", y: 34 },
    { label: "Логика", meta: "backend + правила", y: 104 },
    { label: "Модель", meta: "LLM · RAG · tools", y: 174 },
    { label: "Действие", meta: "CRM · БД · Telegram", y: 244 },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl border border-muted/20 bg-forest/60 p-5">
      <div className="mb-5 flex items-center justify-between border-b border-muted/15 pb-3">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted">product flow</span>
        <span className="flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.16em] text-emerald">
          <span className="size-1.5 rounded-full bg-emerald" />
          live
        </span>
      </div>

      <div className="relative h-[290px]">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 300 290"
          fill="none"
          aria-hidden
          preserveAspectRatio="none"
        >
          <motion.path
            d="M40 52 V290"
            stroke="rgba(155,170,161,0.25)"
            strokeWidth="1"
            strokeDasharray="2 4"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          {nodes.map((node, index) => (
            <motion.path
              key={node.label}
              d={`M40 ${node.y + 12} H 120`}
              stroke="rgba(32,201,130,0.45)"
              strokeWidth="1"
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.15 }}
            />
          ))}
          <motion.circle
            cx="40"
            cy="34"
            r="3"
            fill="#20C982"
            animate={reduce ? undefined : { cy: [34, 244, 34], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </svg>

        <div className="relative space-y-3">
          {nodes.map((node, index) => (
            <motion.div
              key={node.label}
              initial={reduce ? false : { opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + index * 0.15 }}
              className="ml-[62px] flex items-center justify-between gap-3 rounded-lg border border-muted/15 bg-graphite/70 px-3 py-2.5 backdrop-blur-sm"
            >
              <div>
                <p className="text-[0.8rem] font-medium text-bone">{node.label}</p>
                <p className="font-mono text-[0.6rem] tracking-wide text-muted">{node.meta}</p>
              </div>
              <span className="font-mono text-[0.6rem] text-muted/40">0{index + 1}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-muted/15 pt-3">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted/70">
          идея → архитектура → продукт
        </span>
        <ArrowDownRight className="size-3.5 text-emerald" aria-hidden />
      </div>
    </div>
  );
}
