import { Link } from "@/components/ui/route-link";
import { ArrowUpRight } from "lucide-react";
import { primaryCta, site } from "@/lib/site";

type FinalCtaProps = {
  title?: string;
  description?: string;
};

/** Финальный призыв: тёмная секция, используется на всех страницах. */
export function FinalCta({
  title = "Обсудим ваш объект",
  description = "Расскажите задачу — предложим формат работы, состав этапов и предварительную оценку. Ответим по существу, без презентаций на сорок слайдов.",
}: FinalCtaProps) {
  return (
    <section className="bg-navy text-white" aria-labelledby="final-cta-title">
      <div className="shell grid gap-8 py-14 md:grid-cols-12 md:items-end md:gap-8 md:py-18">
        <div className="md:col-span-7">
          <p className="eyebrow text-teal">Следующий шаг</p>
          <h2 id="final-cta-title" className="h2 mt-4 max-w-[20ch] text-white">
            {title}
          </h2>
          <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-white/65">
            {description}
          </p>
        </div>

        <div className="flex flex-col gap-3 md:col-span-4 md:col-start-9 md:items-end">
          <Link href={primaryCta.href} className="btn btn-inverse w-full md:w-auto">
            {primaryCta.label}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          <a
            href={`mailto:${site.demoEmail}`}
            className="text-center text-[0.8125rem] text-white/55 transition-colors hover:text-white md:text-right"
          >
            {site.demoEmail}
          </a>
          <p className="text-[0.6875rem] leading-relaxed text-white/35 md:text-right">
            Демонстрационная почта концепта — реальные контакты не указаны
          </p>
        </div>
      </div>
    </section>
  );
}
