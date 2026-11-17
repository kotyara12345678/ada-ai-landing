import type { Metadata } from "next";
import { buildMetadata, jsonLdBreadcrumbs } from "@/lib/seo";
import { JsonLd } from "@/components/ui/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { stages } from "@/config/home";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = buildMetadata({
  title: "О подходе к разработке | ADA",
  description:
    "Как мы работаем: разбираем задачу, выбираем архитектуру, фиксируем стоимость и сроки, разрабатываем, тестируем и передаём продукт. Без вымышленной истории компании.",
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
    title: "Ответственность за результат",
    text: "Проверяем не только «работает у разработчика», но и поведение на мобильных, обработку ошибок и понятность интерфейса.",
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

      <section className="relative overflow-hidden border-b border-muted/15 pt-28 md:pt-32">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" aria-hidden />
        <div className="container-page relative pb-14 md:pb-20">
          <Breadcrumbs items={[{ name: "О нас", path: "/about" }]} />
          <h1 className="mt-8 max-w-4xl text-h2 text-bone">
            Технологии должны решать задачи, а не создавать новые
          </h1>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <p className="max-w-2xl text-[1rem] leading-relaxed text-muted md:text-[1.05rem]">
              Мы — команда разработки, которая занимается сайтами, серверной частью и AI-решениями.
              Работаем с бизнесом напрямую: без посредников, длинных цепочек согласований и обещаний,
              которые некому выполнять.
            </p>
            <div className="border-l border-emerald/30 pl-5">
              <p className="text-[0.88rem] leading-relaxed text-bone/75">
                Не публикуем количество сотрудников, офисы и годы существования — эти сведения не влияют
                на качество кода. Вместо этого показываем подход, проекты и то, как выглядит процесс.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-muted/15 py-14 md:py-20">
        <div className="container-page">
          <SectionHeading
            index="01"
            eyebrow="Подход"
            title="Как устроена работа"
            description="Разбираем задачу до того, как писать код. Так дешевле: изменения в архитектуре на старте стоят меньше, чем переделка после запуска."
          />

          <ol className="mt-10 grid gap-0 border-t border-muted/15 md:grid-cols-2 md:gap-x-14">
            {stages.map((stage, index) => (
              <Reveal key={stage.step} as="li" delay={index * 0.03}>
                <div className="flex gap-5 border-b border-muted/15 py-6">
                  <span className="font-mono text-[0.7rem] text-emerald/70">{stage.step}</span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h2 className="font-display text-[1.02rem] font-medium text-bone">{stage.title}</h2>
                      <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted/50">
                        {stage.duration}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">{stage.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-bone py-14 text-graphite md:py-20">
        <div className="container-page">
          <SectionHeading
            tone="light"
            index="02"
            eyebrow="Принципы"
            title="Правила, которых придерживаемся"
          />
          <div className="mt-10 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.03}>
                <div className="border-t border-graphite/15 py-6">
                  <span className="font-mono text-[0.62rem] text-graphite/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-[1rem] font-semibold text-graphite">
                    {principle.title}
                  </h3>
                  <p className="mt-1.5 text-[0.84rem] leading-relaxed text-graphite/60">{principle.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-page grid gap-8 border-t border-muted/15 pt-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h2 className="font-display text-[1.6rem] font-medium text-bone">Что можно обсудить</h2>
            <p className="mt-2 max-w-xl text-[0.9rem] leading-relaxed text-muted">
              Даже если у вас есть только идея — опишите её. Мы поможем определить объём первой версии
              и скажем, с чего начать.
            </p>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.64rem] uppercase tracking-[0.14em] text-muted/60">
              <span>Сайты и веб-приложения</span>
              <span>Backend и API</span>
              <span>AI-агенты</span>
              <span>Автоматизация</span>
            </div>
          </div>
          <LinkButton href="/contacts" withArrow>
            Обсудить проект
          </LinkButton>
        </div>
      </section>
    </>
  );
}
