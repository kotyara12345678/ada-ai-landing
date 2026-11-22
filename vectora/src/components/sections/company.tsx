import { Reveal } from "@/components/ui/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { companyFacts } from "@/lib/content";
import { site } from "@/lib/site";

export function Company() {
  return (
    <section id="company" className="relative border-b border-line py-16 md:py-24">
      <div className="shell">
        <SectionHead
          index="08"
          label="Компания"
          title="Небольшая команда с инженерным мышлением"
          description="VECTORA — инженерная группа, которая собирается под задачу: архитектура, разработка, инфраструктура и запуск."
          aside={<span className="mono text-[0.5625rem] text-muted">Small team / deep focus</span>}
        />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
          <Reveal className="md:col-span-6">
            <div className="space-y-4 text-[0.9375rem] leading-relaxed text-muted">
              <p>
                Мы работаем с бизнесом, у которого есть процесс, требующий автоматизации, или
                гипотеза, которую нужно быстро проверить продуктом. Вместо большой команды на
                входе — небольшой состав, который глубоко понимает задачу.
              </p>
              <p>
                На проекте остаются те, кто принимает решения: архитектор, ведущий разработчик и
                инженер по инфраструктуре. Это экономит месяцы переговоров между подрядчиками и
                сохраняет контекст до запуска.
              </p>
              <p className="text-muted/75">
                Позиционирование компании — «{site.tagline}».
              </p>
            </div>

            <blockquote className="mt-8 border-l border-lime/40 pl-5">
              <p className="font-display text-[1.125rem] leading-snug tracking-tight text-text">
                Сложные задачи не решаются добавлением технологий. Они решаются ясной архитектурой.
              </p>
              <footer className="mono mt-3 text-[0.5rem] tracking-[0.22em] text-muted/60">
{/* Engineering note / {site.name} */}
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={0.06} className="md:col-span-5 md:col-start-8">
            <dl className="border-t border-line">
              {companyFacts.map((fact) => (
                <div key={fact.label} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                  <dt className="mono text-[0.5rem] tracking-[0.2em] text-muted/65">{fact.label}</dt>
                  <dd className="text-right text-[0.875rem] text-text/85">{fact.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mono mt-6 rounded-xl border border-line bg-surface/40 p-4 text-[0.5rem] leading-relaxed tracking-[0.16em] text-muted/70">
              <p className="text-lime">{/* working format */}</p>
              <p className="mt-2">{/* Discovery → Architecture → Build → Test → Launch */}Discovery → Architecture → Build → Test → Launch</p>
              <p className="mt-2">{/* Отчётность по этапам, доступ к задачам и репозиторию. */}Отчётность по этапам, доступ к задачам и репозиторию.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
