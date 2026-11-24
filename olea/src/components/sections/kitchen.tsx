import { Reveal } from "@/components/ui/reveal";
import { principles } from "@/lib/content";

export function Kitchen() {
  return (
    <section id="kitchen" className="shell py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-3">
          <Reveal className="rule pt-4">
            <p className="label flex items-baseline gap-3 text-muted">
              <span className="text-clay">01</span>
              Кухня
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-9 lg:col-span-7">
          <Reveal>
            <h2 className="h2">
              Мы не придумываем кухню.
              <br />
              <span className="text-muted">Мы её слушаем.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-8 grid gap-5 sm:grid-cols-2">
            <p className="text-[0.9375rem] leading-relaxed text-ink/80">
              OLEA начинался как бар на четырнадцать мест, где на кухне стояла одна печь и два
              человека. Через год появился зал, через три — меню из шести подач и винная карта,
              в которой нет ни одного случайного бокала.
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-muted">
              Мы по-прежнему небольшие: одна смена, одна кухня, один шеф. Поэтому можем позволить
              себе менять меню каждые две недели и готовить только то, что действительно привезли
              утром с рынка.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 grid gap-px border-t border-line md:mt-20 md:grid-cols-3">
        {principles.map((principle, index) => (
          <Reveal
            key={principle.index}
            delay={index * 0.08}
            className="border-b border-line py-7 md:border-b-0 md:border-r md:px-8 md:py-9 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
          >
            <div className="flex items-baseline gap-3">
              <span className="label text-clay">{principle.index}</span>
              <h3 className="h3">{principle.title}</h3>
            </div>
            <p className="mt-4 max-w-sm text-[0.875rem] leading-relaxed text-muted">
              {principle.text}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
