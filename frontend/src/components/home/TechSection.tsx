import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { techStack } from "@/config/home";

export function TechSection() {
  return (
    <section className="border-t border-line bg-surface-muted py-16 md:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src="/visuals/workspace-code.jpg"
              alt="Рабочее место разработчика: ноутбук с открытым кодом проекта"
              width={1400}
              height={1000}
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="h-60 w-full object-cover sm:h-80"
            />
          </div>
          <div className="absolute -bottom-5 right-4 hidden rounded-xl border border-line bg-surface px-4 py-3 shadow-card sm:block">
            <p className="text-[0.76rem] font-medium text-ink">Распространённый стек</p>
            <p className="text-[0.68rem] text-ink-muted">проект легко передать другой команде</p>
          </div>
        </div>

        <div>
          <SectionHeading
            eyebrow="Технологии"
            title="Стек, который можно поддерживать"
            description="Выбираем распространённые технологии: по проекту легко найти разработчиков, а решения не требуют редких специалистов."
          />

          <div className="mt-7 grid gap-x-8 gap-y-0 sm:grid-cols-2">
            {techStack.map((group) => (
              <div key={group.group} className="border-t border-line py-3.5">
                <p className="text-[0.74rem] font-semibold uppercase tracking-[0.08em] text-ink">
                  {group.group}
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-line bg-surface px-2 py-1 text-[0.74rem] text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
