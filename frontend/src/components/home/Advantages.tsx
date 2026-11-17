import { SectionHeading } from "@/components/ui/SectionHeading";
import { advantages } from "@/config/home";
import { Reveal } from "@/components/ui/Reveal";

export function Advantages() {
  return (
    <section className="bg-bone py-16 text-graphite md:py-24">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              tone="light"
              index="02"
              eyebrow="Почему мы"
              title={
                <>
                  Не продаём технологии.
                  <br />
                  Решаем задачи.
                </>
              }
              description="Мы не изображаем крупную корпорацию. Работаем небольшой командой, поэтому отвечаем за результат лично и не теряем смысл задачи между отделами."
            />
            <div className="mt-8 hidden border-t border-graphite/15 pt-5 lg:block">
              <p className="max-w-sm text-[0.82rem] leading-relaxed text-graphite/55">
                Прямое общение с разработчиком, прозрачная смета и понятные этапы. Если задача решается
                проще — мы скажем об этом до начала работ.
              </p>
            </div>
          </div>

          <div className="grid gap-x-10 sm:grid-cols-2">
            {advantages.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.04}>
                <div className="border-t border-graphite/15 py-6">
                  <div className="flex items-center gap-3">
                    <item.icon className="size-[18px] text-[#0c8a58]" strokeWidth={1.5} aria-hidden />
                    <span className="font-mono text-[0.62rem] tracking-[0.14em] text-graphite/35">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display text-[1rem] font-semibold text-graphite">{item.title}</h3>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-graphite/60">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
