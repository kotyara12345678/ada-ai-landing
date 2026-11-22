import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Directions } from "@/components/sections/directions";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ProcessSection } from "@/components/sections/process";
import { Advantages } from "@/components/sections/advantages";
import { FinalCta } from "@/components/sections/final-cta";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "CONTERRA — проектируем пространство для развития бизнеса",
  description:
    "Инженерное проектирование и строительство коммерческих и промышленных объектов: концепция, проект, реализация, инженерные системы и техническое сопровождение.",
  alternates: { canonical: canonical("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Directions />
      <FeaturedProjects />
      <ProcessSection />
      <Advantages />
      <FinalCta />
    </>
  );
}
