import { SectionHeading } from "@/components/ui/SectionHeading";
import { trustPoints, techStack } from "@/config/home";
import { Reveal } from "@/components/ui/Reveal";

export function TechSection() {
  return (
    <section className="bg-bone py-16 text-graphite md:py-24">
      <div className="container-page">
        <SectionHeading
          tone="light"
          index="06"
          eyebrow="Технологии"
          title="Стек, который не придётся переписывать"
          description="Выбираем инструменты по задаче, а не по привычке. В основе — решения с активной экосистемой, документацией и специалистами на рынке."
          align="between"
        />

        <div className="mt-10 grid gap-x-10 gap-y-2 sm:grid-cols-2 lg:grid-cols-3 md:mt-14">
          {techStack.map((group, index) => (
            <Reveal key={group.group} delay={index * 0.03}>
              <div className="border-t border-graphite/15 py-5">
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-graphite/40">
                  {group.group}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-2 gap-y-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-graphite/12 px-2 py-1 font-mono text-[0.68rem] text-graphite/70"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 grid gap-6 border-t border-graphite/15 pt-8 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((point) => (
            <div key={point.label} className="flex gap-3">
              <point.icon className="mt-0.5 size-4 shrink-0 text-[#0c8a58]" strokeWidth={1.5} aria-hidden />
              <div>
                <p className="text-[0.82rem] font-medium text-graphite">{point.label}</p>
                <p className="mt-0.5 text-[0.78rem] leading-relaxed text-graphite/55">{point.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
