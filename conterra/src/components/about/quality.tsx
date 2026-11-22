import { Reveal } from "@/components/ui/reveal";
import { qualityLayers } from "@/lib/content";

const roles = [
  { title: "Проектная группа", text: "архитекторы и ГИП, ведут концепцию и документацию" },
  { title: "Инженеры", text: "конструкторы, инженеры систем, специалисты по обследованию" },
  { title: "Площадка", text: "организация работ, контроль объёмов и сроков" },
  { title: "Надзор", text: "авторский надзор и приёмка по контрольным точкам" },
];

export function Quality() {
  return (
    <section className="border-b border-line bg-canvas py-14 md:py-20" aria-labelledby="quality-title">
      <div className="shell">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <p className="eyebrow text-teal">Контроль качества</p>
            <h2 id="quality-title" className="h2 mt-4 max-w-[15ch]">
              Качество — это процедура, а не обещание
            </h2>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-graphite/70">
              На каждом объекте действуют три уровня контроля. Замечания фиксируются письменно и
              закрываются до перехода к следующему этапу.
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <ol>
              {qualityLayers.map((layer, index) => (
                <Reveal
                  as="li"
                  key={layer.title}
                  delay={index * 0.05}
                  className="flex gap-4 border-t border-line py-5 last:border-b"
                >
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center border border-line bg-paper text-[0.6875rem] tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[1rem] font-medium tracking-tight text-graphite">
                      {layer.title}
                    </h3>
                    <p className="mt-1 text-[0.875rem] leading-relaxed text-graphite/65">{layer.text}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-8 md:mt-16">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-display text-[1.125rem] font-medium tracking-tight text-graphite">
              Кто ведёт проект
            </h3>
            <p className="max-w-md text-[0.8125rem] leading-relaxed text-muted">
              Команда подбирается под объект; у заказчика один ответственный за результат.
            </p>
          </div>

          <dl className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role) => (
              <div key={role.title} className="border-t border-line pt-3">
                <dt className="text-[0.875rem] font-medium text-graphite">{role.title}</dt>
                <dd className="mt-1 text-[0.8125rem] leading-relaxed text-graphite/60">{role.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
