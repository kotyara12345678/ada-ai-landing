import { Reveal } from "@/components/ui/reveal";
import { advantages } from "@/lib/content";

/** Преимущества подхода: крупный заголовок слева, список справа. */
export function Advantages() {
  return (
    <section className="border-b border-line bg-paper py-14 md:py-20" aria-labelledby="advantages-title">
      <div className="shell grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-4">
          <p className="eyebrow text-teal">Подход</p>
          <h2 id="advantages-title" className="h2 mt-4 max-w-[14ch]">
            Что получает заказчик
          </h2>
          <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-graphite/70">
            Мы не продаём отдельные работы — мы отвечаем за результат, который можно
            эксплуатировать и развивать.
          </p>
        </div>

        <dl className="md:col-span-7 md:col-start-6">
          {advantages.map((item, index) => (
            <Reveal
              key={item.title}
              delay={index * 0.05}
              className="grid gap-2 border-t border-line py-6 last:border-b md:grid-cols-12 md:gap-6 md:py-7"
            >
              <dt className="font-display text-[1.0625rem] font-medium tracking-tight text-graphite md:col-span-5">
                {item.title}
              </dt>
              <dd className="text-[0.875rem] leading-relaxed text-graphite/65 md:col-span-7">
                {item.text}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
