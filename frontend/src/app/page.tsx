import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Advantages } from "@/components/home/Advantages";
import { ServicesShowcase } from "@/components/sections/ServicesShowcase";
import { ProcessSection } from "@/components/home/ProcessSection";
import { PricingPreview } from "@/components/home/PricingPreview";
import { MaintenanceSection } from "@/components/home/MaintenanceSection";
import { CtaBlock } from "@/components/home/CtaBlock";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { homeFaq } from "@/config/home";
import { buildMetadata, jsonLdFaq, jsonLdOrganization } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Разработка сайтов, сервисов и AI для бизнеса | ADA",
  description:
    "Сайты, веб-приложения, AI-боты и автоматизация под ключ. Фиксируем цену и срок до старта, передаём код и остаёмся на поддержке. Разработка от 7 000 ₽, обслуживание от 1 490 ₽/мес.",
  path: "/",
  keywords: [
    "разработка сайтов",
    "разработка программного обеспечения",
    "обслуживание сайтов",
    "администрирование серверов",
    "обслуживание PostgreSQL",
    "техническая поддержка",
    "AI-разработка",
    "автоматизация бизнеса",
  ],
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={[jsonLdFaq(homeFaq), jsonLdOrganization]} id="home-jsonld" />
      <Hero />
      <Advantages />
      <ServicesShowcase />
      <ProcessSection />
      <PricingPreview />
      <MaintenanceSection />

      <section className="border-t border-line bg-surface py-14 md:py-24">
        <div className="container-page grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Вопросы"
              title="Коротко о главном"
              description="Цены, сроки, права на код и обслуживание. Если ответа нет — спросите AI-консультанта в правом нижнем углу."
            />
            <Link
              href="/contacts"
              className="mt-5 inline-flex items-center gap-1 text-[0.86rem] font-semibold text-brand hover:text-brand-dark"
            >
              Задать вопрос
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
          <FaqAccordion items={homeFaq.slice(0, 6)} />
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
