import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WorksSection } from "@/components/home/WorksSection";

export const metadata: Metadata = buildMetadata({
  title: "Работы — концепт-сайты студии ADA",
  description:
    "Демонстрационные сайты, сделанные целиком: промышленный лендинг NORDLINE и многостраничный сайт архитектурного бюро AUREON. Структура, дизайн, вёрстка, анимации и адаптив.",
  path: "/works",
  keywords: ["портфолио веб-студии", "примеры сайтов", "концепт-сайты", "работы студии"],
});

export default function WorksPage() {
  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-page py-8 md:py-12">
          <Breadcrumbs items={[{ name: "Работы", path: "/works" }]} />
          <h1 className="mt-6 max-w-4xl text-h2 text-ink">Работы</h1>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <p className="max-w-2xl text-[0.98rem] leading-relaxed text-ink-muted md:text-[1.02rem]">
              Концепт-сайты для вымышленных брендов, сделанные целиком: структура, дизайн, вёрстка,
              анимации и адаптив. Каждый открывается как отдельная страница этого сайта, без
              редиректов на сторонние домены.
            </p>
            <div className="rounded-xl border border-line bg-surface-muted p-5">
              <p className="text-[0.88rem] leading-relaxed text-ink">
                Это демонстрация подхода, а не клиентские кейсы: бренды и данные вымышлены. Формы в
                демо не отправляют заявки — они показывают сценарий.
              </p>
              <Link
                href="/contacts"
                className="mt-4 inline-flex items-center gap-1 text-[0.86rem] font-semibold text-brand hover:text-brand-dark"
              >
                Обсудить похожий проект
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <WorksSection showHeading={false} />
    </>
  );
}
