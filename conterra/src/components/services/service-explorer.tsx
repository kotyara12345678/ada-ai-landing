"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { services } from "@/lib/services";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

/**
 * Интерактивный блок услуг: слева список направлений, справа детали выбранного.
 * Выбор синхронизирован с хешем адреса (/services#systems), поэтому ссылки
 * из шапки и подвала открывают нужное направление.
 */
export function ServiceExplorer() {
  const [active, setActive] = useState(services[0].slug);
  const reduced = useReducedMotion();
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    const fromHash = window.location.hash.replace("#", "");
    if (services.some((service) => service.slug === fromHash)) {
      setActive(fromHash);
    }

    const onHashChange = () => {
      const next = window.location.hash.replace("#", "");
      if (services.some((service) => service.slug === next)) setActive(next);
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const current = services.find((service) => service.slug === active) ?? services[0];
  const currentIndex = services.findIndex((service) => service.slug === current.slug);

  const select = (slug: string) => {
    setActive(slug);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${slug}`);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }
    event.preventDefault();
    const delta = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const nextIndex = (index + delta + services.length) % services.length;
    select(services[nextIndex].slug);
    tabsRef.current[nextIndex]?.focus();
  };

  return (
    <section className="border-b border-line bg-canvas py-12 md:py-16" aria-labelledby="services-explorer-title">
      <div className="shell">
        <h2 id="services-explorer-title" className="sr-only">
          Направления услуг
        </h2>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div
              role="tablist"
              aria-label="Направления услуг"
              aria-orientation="vertical"
              className="flex flex-col border-t border-line"
            >
              {services.map((service, index) => {
                const selected = service.slug === current.slug;
                return (
                  <button
                    key={service.slug}
                    ref={(node) => {
                      tabsRef.current[index] = node;
                    }}
                    type="button"
                    role="tab"
                    id={service.slug}
                    data-tab={`tab-${service.slug}`}
                    aria-selected={selected}
                    aria-controls={`panel-${service.slug}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => select(service.slug)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={cn(
                      "group relative flex scroll-mt-24 items-baseline gap-4 border-b border-line py-4 pl-4 pr-2 text-left transition-colors",
                      selected ? "bg-paper text-navy" : "text-graphite/70 hover:bg-paper/70 hover:text-graphite",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 left-0 w-0.5 transition-colors",
                        selected ? "bg-teal" : "bg-transparent",
                      )}
                    />
                    <span className={cn("eyebrow text-[0.625rem]", selected ? "text-teal" : "text-muted")}>
                      {service.index}
                    </span>
                    <span className="font-display text-[1.0625rem] font-medium tracking-tight">
                      {service.name}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-5 text-[0.8125rem] leading-relaxed text-muted">
              Выберите направление, чтобы увидеть состав работ и результат для заказчика.
            </p>
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.slug}
                id={`panel-${current.slug}`}
                role="tabpanel"
                aria-labelledby={`${current.slug}`}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 text-[0.75rem] text-muted">
                  <span className="tabular-nums">
                    {current.index} / {String(services.length).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-line" aria-hidden="true" />
                  <span className="hidden sm:inline">{current.tagline}</span>
                </div>

                <h3 className="h2 mt-4 max-w-[22ch] text-graphite">{current.name}</h3>
                <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-graphite/75">
                  {current.description}
                </p>

                <div className="mt-8 grid gap-6 md:grid-cols-12 md:gap-8">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-line md:col-span-5">
                    <Image
                      src={asset(current.image)}
                      alt={current.imageAlt}
                      fill
                      sizes="(min-width: 768px) 32vw, 100vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="md:col-span-7">
                    <h4 className="eyebrow text-muted">Перечень работ</h4>
                    <ul className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                      {current.works.map((work) => (
                        <li key={work} className="flex gap-2 text-[0.875rem] leading-snug text-graphite/75">
                          <Check className="mt-0.5 size-3.5 shrink-0 text-teal" aria-hidden="true" />
                          {work}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 grid gap-6 border-t border-line pt-6 md:grid-cols-12">
                  <div className="md:col-span-5">
                    <h4 className="eyebrow text-muted">Что остаётся у заказчика</h4>
                    <ul className="mt-3 space-y-1.5">
                      {current.deliverables.map((item) => (
                        <li key={item} className="text-[0.875rem] leading-snug text-graphite/70">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="border-l-2 border-teal pl-4 md:col-span-7">
                    <h4 className="eyebrow text-teal">Результат</h4>
                    <p className="mt-2 text-[0.9375rem] leading-relaxed text-graphite/80">
                      {current.result}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <p className="mt-6 text-[0.6875rem] text-muted">
              Направление {currentIndex + 1} из {services.length}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
