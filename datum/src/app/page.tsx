import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Logos } from "@/components/sections/logos";
import { Features } from "@/components/sections/features";
import { Workflow } from "@/components/sections/workflow";
import { Integrations } from "@/components/sections/integrations";
import { Pricing } from "@/components/sections/pricing";
import { Faq } from "@/components/sections/faq";
import { Demo } from "@/components/sections/demo";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "DATUM — операционная аналитика для команд",
  description:
    "Дашборд с живыми метриками из базы, платежей и рекламы: сегменты, алерты, SQL и отчёты. Попробуйте 14 дней без карты.",
  alternates: { canonical: canonical("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Logos />
      <Features />
      <Workflow />
      <Integrations />
      <Pricing />
      <Faq />
      <Demo />
    </>
  );
}
