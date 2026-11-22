import { Reveal } from "@/components/ui/reveal";

export function Intro() {
  return (
    <section id="intro" className="relative border-b border-line py-16 md:py-24">
      <div className="shell">
        <Reveal className="mono flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.5625rem] text-muted">
          <span className="text-lime">02 / Approach</span>
          <span>Engineering manifesto</span>
          <span className="ml-auto hidden sm:inline">Read 00:41</span>
        </Reveal>

        <Reveal delay={0.05} className="mt-8 md:mt-12">
          <h2 className="max-w-[26ch] font-display text-[clamp(1.9rem,4.6vw,4rem)] font-medium leading-[1.06] tracking-[-0.035em]">
            Технологии должны <span className="text-muted">решать задачи.</span>
            <br />
            Не создавать <span className="accent-text">новые</span>.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-4">
            <div className="mono space-y-2 border-l border-line pl-4 text-[0.5625rem] text-muted">
              {/* ENGINEERING / PRODUCT / AI */}<p>ENGINEERING / PRODUCT / AI</p>
              <p className="text-emerald">{/* no decorative complexity */}</p>
            </div>
          </Reveal>

          <Reveal delay={0.05} className="md:col-span-7 md:col-start-6">
            <p className="lead max-w-2xl">
              Мы объединяем инженерный подход, программную разработку и искусственный интеллект,
              чтобы создавать цифровые решения, которые работают на реальные бизнес-результаты.
            </p>
            <p className="mt-4 max-w-xl text-[0.875rem] leading-relaxed text-muted/80">
              Не добавляем технологии ради технологий: каждый компонент системы должен объяснять
              своё место в архитектуре и в процессе заказчика.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
