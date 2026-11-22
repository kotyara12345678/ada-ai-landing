import Image from "next/image";
import { Link } from "@/components/ui/route-link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { primaryCta } from "@/lib/site";
import { asset } from "@/lib/asset";

const facts = [
  { value: "Полный цикл", label: "от концепции до эксплуатации" },
  { value: "Единый договор", label: "проект, стройка, инженерия" },
  { value: "По России", label: "коммерческие и промышленные объекты" },
];

export function Hero() {
  return (
    <section className="border-b border-line bg-canvas" aria-labelledby="hero-title">
      <div className="shell grid gap-10 pt-10 pb-12 md:grid-cols-12 md:gap-10 md:pt-14 md:pb-16 lg:pt-16">
        <div className="flex flex-col md:col-span-7 md:pr-4">
          <p className="eyebrow text-muted">
            Инженерное проектирование · Строительство
          </p>

          <h1 id="hero-title" className="h1 mt-5 max-w-[22ch] text-graphite">
            Проектируем пространство для развития бизнеса
          </h1>

          <p className="lead mt-6 max-w-xl">
            Комплексные инженерные и строительные решения для коммерческих и промышленных
            объектов.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href={primaryCta.href} className="btn btn-primary">
              {primaryCta.label}
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/services" className="btn btn-outline group">
              Посмотреть направления
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <dl className="mt-auto grid gap-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-4 md:mt-14">
            {facts.map((fact) => (
              <div key={fact.value}>
                <dt className="font-display text-[0.9375rem] font-semibold tracking-tight text-graphite">
                  {fact.value}
                </dt>
                <dd className="mt-1 text-[0.8125rem] leading-snug text-muted">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-5">
          <figure className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-line sm:aspect-[16/11] md:aspect-[4/5]">
              <Image
                src={asset("/images/hero-business-center.jpg")}
                alt="Современное коммерческое здание со светлым каменным фасадом и остеклением"
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-start justify-between gap-4 text-[0.6875rem] leading-relaxed text-muted">
              <span>Концептуальная визуализация объекта коммерческой недвижимости</span>
              <span className="shrink-0 tabular-nums">01 / 05</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
