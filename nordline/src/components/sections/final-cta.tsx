import { ArrowUpRight } from "lucide-react";
import { company } from "@/lib/content";

export function FinalCta() {
  return (
    <section className="bg-accent text-graphite">
      <div className="shell py-16 md:py-24">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-graphite/25 pb-4">
          <span className="label text-graphite/70">07 / Запрос предложения</span>
          <span className="label text-graphite/70">
            NL-04 · {company.coordinates}
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 className="display max-w-[17ch] text-[clamp(2.25rem,5.4vw,5.25rem)]">
              Подберём оборудование под вашу задачу
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-4">
            <p className="max-w-md text-[0.9375rem] leading-relaxed text-graphite/80">
              Расскажите о производственной задаче. Мы поможем определить подходящее направление
              оборудования и подготовить запрос на коммерческое предложение.
            </p>
            <a href="#contacts" className="btn btn-dark w-full sm:w-fit">
              Обсудить задачу
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
