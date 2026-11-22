"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import {
  categoryToInterest,
  productCategories,
  products,
  type Product,
  type ProductCategory,
} from "@/lib/content";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/modal";

export function Catalog() {
  const [filter, setFilter] = useState<ProductCategory | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const visible = useMemo(
    () => (filter === "all" ? products : products.filter((item) => item.category === filter)),
    [filter],
  );

  const active = products.find((item) => item.id === activeId) ?? null;

  const requestQuote = (product: Product) => {
    const interest = categoryToInterest[product.category];
    setActiveId(null);
    window.dispatchEvent(new CustomEvent<string>("nordline:interest", { detail: interest }));

    window.setTimeout(() => {
      document.getElementById("contacts")?.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    }, 60);
  };

  return (
    <section id="equipment" className="bg-dark py-20 text-paper md:py-28">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className="flex items-baseline gap-4">
              <span className="label text-accent">04</span>
              <span className="label text-paper/75">Каталог</span>
            </div>
            <h2 className="display mt-6 text-[clamp(2rem,4.4vw,4.25rem)]">
              Оборудование
              <br />
              и решения
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-12">
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-paper/70">
              Каталог показывает структуру поставки, а не склад. Позиции подбираются под задачу:
              по среде, нагрузке, присоединительным размерам и режиму работы.
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-label="Фильтр каталога по категориям"
          className="mt-10 flex flex-wrap items-center gap-2 md:mt-14"
        >
          <span className="label mr-2 hidden text-paper/50 md:inline">Фильтр</span>
          {productCategories.map((category) => {
            const isActive = filter === category.id;
            const count =
              category.id === "all"
                ? products.length
                : products.filter((item) => item.category === category.id).length;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setFilter(category.id)}
                aria-pressed={isActive}
                className={cn(
                  "label flex min-h-10 items-center gap-2 border px-3.5 py-2 text-[0.5625rem] tracking-[0.1em] transition-colors",
                  isActive
                    ? "border-accent bg-accent text-graphite"
                    : "border-paper/18 text-paper/70 hover:border-paper/45 hover:text-paper",
                )}
              >
                {category.label}
                <span className={cn("text-[0.5rem]", isActive ? "text-graphite/70" : "text-paper/30")}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div
          key={filter}
          className="mt-8 grid gap-px border-t border-l border-paper/10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((product, index) => (
            <motion.article
              key={product.id}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: reduced ? 0 : Math.min(index * 0.05, 0.2),
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group flex flex-col border-r border-b border-paper/10 bg-dark"
            >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper/5">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                  <span className="label absolute left-4 top-4 bg-dark/80 px-2 py-1 text-[0.5rem] text-paper/70">
                    {product.categoryLabel}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="text-[1.0625rem] font-bold leading-snug tracking-tight md:text-[1.1875rem]">
                    {product.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-[0.8125rem] leading-relaxed text-paper/75">
                    {product.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveId(product.id)}
                    className="mt-6 inline-flex w-fit items-center gap-2 border-b border-paper/25 pb-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
                  >
                    Подробнее
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </motion.article>
          ))}
        </div>

        <p className="label mt-6 max-w-3xl text-[0.5625rem] leading-relaxed tracking-[0.1em] text-paper/50">
          Демонстрационный каталог. Наименования, характеристики и состав поставки приведены как
          пример структуры и не являются публичной офертой.
        </p>
      </div>

      <Modal open={Boolean(active)} onClose={() => setActiveId(null)} labelledBy="product-dialog-title">
        {active ? (
          <div className="grid md:grid-cols-2">
            <div className="relative aspect-[4/3] w-full bg-mist md:aspect-auto md:h-full md:min-h-[26rem]">
              <Image
                src={active.image}
                alt={active.alt}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col p-6 pt-12 md:p-10 md:pt-12">
              <span className="label text-accent">{active.categoryLabel}</span>
              <h3
                id="product-dialog-title"
                className="mt-3 text-[1.75rem] font-bold leading-tight tracking-tight"
              >
                {active.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite/70">{active.summary}</p>

              <dl className="mt-6 grid gap-x-6 sm:grid-cols-2">
                {active.specs.map((spec) => (
                  <div key={spec.label} className="border-t border-graphite/12 py-3">
                    <dt className="label text-[0.5rem] text-graphite/70">{spec.label}</dt>
                    <dd className="mt-1 text-sm font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6">
                <span className="label text-graphite/70">В состав поставки</span>
                <ul className="mt-3 flex flex-col gap-2">
                  {active.scope.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-graphite/75">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button type="button" onClick={() => requestQuote(active)} className="btn btn-dark">
                  Запросить КП
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="label text-[0.5rem] text-graphite/70">
                  Уточним параметры перед расчётом
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
