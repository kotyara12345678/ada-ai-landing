import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ProjectsGrid } from "@/components/projects/projects-grid";
import { FinalCta } from "@/components/sections/final-cta";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Проекты",
  description:
    "Демонстрационные кейсы CONTERRA: производственный комплекс, логистический центр, коммерческое здание и инженерная модернизация — задача, подход и результат.",
  alternates: { canonical: canonical("/projects") },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Проекты"
        title="Объекты, где инженерные решения работают на бизнес"
        lead={
          <>
            Четыре концептуальных кейса: производство, логистика, коммерческая недвижимость и
            модернизация действующего объекта. В каждом — задача, подход и результат, а не
            галерея фасадов.
          </>
        }
        crumbs={[{ label: "Главная", href: "/" }, { label: "Проекты" }]}
        aside={
          <p className="border-l-2 border-teal pl-4 text-[0.8125rem] leading-relaxed text-graphite/65">
            Все проекты на этой странице — демонстрационные концепты. Названия, локации, площади
            и сроки приведены для иллюстрации подхода; это не выполненные заказы и не реальные
            клиенты.
          </p>
        }
      />

      <ProjectsGrid />
      <FinalCta
        title="Ваш объект не похож на эти?"
        description="Так и должно быть. Пришлите задачу — покажем, какие решения имеют смысл именно в вашем случае, и с чего стоит начать."
      />
    </>
  );
}
