import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { ServiceExplorer } from "@/components/services/service-explorer";
import { Formats } from "@/components/services/formats";
import { ProcessSection } from "@/components/sections/process";
import { FinalCta } from "@/components/sections/final-cta";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Проектирование, строительство, реконструкция и инженерные системы для коммерческих и промышленных объектов: состав работ, результаты и форматы сотрудничества.",
  alternates: { canonical: canonical("/services") },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Услуги"
        title="Проектирование, строительство и инженерия в одной системе"
        lead={
          <>
            Четыре направления закрывают путь объекта от первой концепции до эксплуатации.
            Направления можно комбинировать: мы подключаемся к тому этапу, где нужна
            инженерная ответственность.
          </>
        }
        crumbs={[{ label: "Главная", href: "/" }, { label: "Услуги" }]}
        aside={
          <ul className="grid gap-2 text-[0.8125rem] text-graphite/70">
            <li className="flex items-baseline gap-2">
              <span className="size-1 shrink-0 bg-teal" aria-hidden="true" />
              Проект и стройка — по одному договору
            </li>
            <li className="flex items-baseline gap-2">
              <span className="size-1 shrink-0 bg-teal" aria-hidden="true" />
              Работа на действующих объектах
            </li>
            <li className="flex items-baseline gap-2">
              <span className="size-1 shrink-0 bg-teal" aria-hidden="true" />
              Документация для эксплуатации
            </li>
          </ul>
        }
      />

      <ServiceExplorer />
      <Formats />
      <ProcessSection />
      <FinalCta
        title="Нужна оценка направления?"
        description="Опишите объект и этап, на котором вы находитесь. Скажем, что можно сделать в вашем случае и какие данные понадобятся для оценки."
      />
    </>
  );
}
