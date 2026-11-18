import type { Metadata } from "next";
import { buildMetadata, jsonLdBreadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stages } from "@/config/home";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "О команде и подходе к работе | ADA",
  description:
    "Технологическая команда разработки и технического сопровождения: как мы разбираем задачу, выбираем архитектуру, фиксируем стоимость и обслуживаем продукт после запуска.",
  path: "/about",
});

const principles = [
  {
    title: "Сначала задача, потом технология",
    text: "Прежде чем выбрать стек, выясняем, какой процесс нужно изменить и что считается успехом. Технология — следствие, а не отправная точка.",
  },
  {
    title: "Архитектура без переусложнения",
    text: "Не добавляем сервисы и слои, которые не решают конкретную проблему. Простое решение, которое можно поддерживать, лучше сложного, которое выглядит солидно.",
  },
  {
    title: "Прозрачная смета",
    text: "Вы видите, из чего складывается стоимость. Если объём изменился, обсуждаем это до работы, а не выставляем счёт после.",
  },
  {
    title: "Честные ограничения",
    text: "Если задача не решается в рамках бюджета, если AI не даст выигрыша или если сроки нереальны — говорим об этом прямо.",
  },
  {
    title: "Код остаётся у вас",
    text: "После передачи проекта вы получаете исходники, доступы и документацию. Мы не создаём искусственную зависимость от нас.",
  },
  {
    title: "Ответственность за эксплуатацию",
    text: "Запуск — не финал. Следим за доступностью, обновлениями и резервными копиями, если продукт остаётся на сопровождении.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={jsonLdBreadcrumbs([
          { name: "Главная", path: "/" },
          { name: "О нас", path: "/about" },
        ])}
        id="about-jsonld"
      />

      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs items={[{ name: "О нас", path: "/about" }]} />
          <h1 className="mt-6 max-w-4xl text-h2 text-ink">
            Технологии должны решать задачи, а не создавать новые
          </h1>
          <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <p className="max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted md:text-[1.02rem]">
              Мы — технологическая команда, которая занимается разработкой и техническим
              сопровождением IT-продуктов: сайтов, веб-сервисов, серверной части, AI-решений и
              автоматизации. Работаем с бизнесом напрямую, без посредников и длинных цепочек
              согласований.
            </p>
            <div className="rounded-xl border border-line bg-surface-muted p-5">
              <p className="text-[0.88rem] leading-relaxed text-ink">
                Не публикуем количество сотрудников, офисы и годы существования — эти сведения не
                влияют на качество работы. Вместо этого показываем подход, состав услуг и то, как
                выглядит процесс — от разбора задачи до эксплуатации.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface py-12 md:py-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Подход"
            title="Как устроена работа"
            description="Разбираем задачу до того, как писать код. Так дешевле: изменения в архитектуре на старте стоят меньше, чем переделка после запуска."
          />

          <ol className="mt-8 grid gap-3 md:grid-cols-2">
            {stages.map((stage, index) => (
              <Reveal key={stage.step} as="li" delay={index * 0.03}>
                <div className="flex h-full gap-4 rounded-xl border border-line p-4">
                  <span className="text-[0.8rem] font-semibold text-brand">{stage.step}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                      <h2 className="text-[0.95rem] font-medium text-ink">{stage.title}</h2>
                      <span className="text-[0.74rem] text-ink-muted">{stage.duration}</span>
                    </div>
                    <p className="mt-1 text-[0.84rem] leading-relaxed text-ink-muted">{stage.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-line bg-surface-muted py-12 md:py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Принципы" title="Правила, которых придерживаемся" />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.03}>
                <div className="h-full rounded-xl border border-line bg-surface p-5">
                  <span className="text-[0.74rem] font-semibold text-line-strong">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-[0.95rem] font-semibold text-ink">{principle.title}</h3>
                  <p className="mt-1.5 text-[0.84rem] leading-relaxed text-ink-muted">
                    {principle.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12 md:py-16">
        <div className="container-page flex flex-col gap-6 border-t border-line pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-display text-[1.4rem] font-semibold text-ink">Что можно обсудить</h2>
            <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-ink-muted">
              Даже если у вас есть только идея — опишите её. Поможем определить объём первой версии
              и скажем, с чего начать. Если продукт уже работает — начнём с аудита и тарифа
              обслуживания.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[0.78rem] text-ink-muted">
              <span>Сайты и веб-приложения</span>
              <span>Backend и API</span>
              <span>AI-агенты</span>
              <span>Обслуживание и поддержка</span>
            </div>
          </div>
          <LinkButton href="/contacts" withArrow>
            Обсудить задачу
          </LinkButton>
        </div>
      </section>
    </>
  );
}
