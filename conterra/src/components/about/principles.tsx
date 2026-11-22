import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/lib/content";

export function Principles() {
  return (
    <section className="border-b border-line bg-paper py-14 md:py-20" aria-labelledby="principles-title">
      <div className="shell">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-teal">Принципы</p>
            <h2 id="principles-title" className="h2 mt-4 max-w-[12ch]">
              Пять правил, по которым мы работаем
            </h2>
          </div>
          <p className="max-w-xl text-[0.9375rem] leading-relaxed text-graphite/70 md:col-span-6 md:col-start-7 md:pt-3">
            Принципы — не декларация, а фильтр решений: если предложение не проходит ни один из
            пунктов, мы его не предлагаем заказчику.
          </p>
        </div>

        <ol className="mt-10 border-t border-line">
          {principles.map((item, index) => (
            <Reveal
              as="li"
              key={item.index}
              delay={index * 0.04}
              className="grid gap-3 border-b border-line py-6 md:grid-cols-12 md:gap-6 md:py-7"
            >
              <span className="eyebrow text-teal md:col-span-1">{item.index}</span>
              <h3 className="font-display text-[1.125rem] font-medium tracking-tight text-graphite md:col-span-3 md:text-[1.25rem]">
                {item.title}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-graphite/65 md:col-span-7 md:col-start-6">
                {item.text}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
