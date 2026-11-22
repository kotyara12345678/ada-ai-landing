import type { Metadata } from "next";
import { Hero } from "@/components/hero/hero";
import { Intro } from "@/components/sections/intro";
import { Solutions } from "@/components/sections/solutions";
import { Projects } from "@/components/sections/projects";
import { Stack } from "@/components/sections/stack";
import { Process } from "@/components/sections/process";
import { Principles } from "@/components/sections/principles";
import { Company } from "@/components/sections/company";
import { FinalCta } from "@/components/sections/final-cta";
import { Contact } from "@/components/sections/contact";
import { canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "VECTORA — инженерия цифрового будущего",
  description:
    "Разрабатываем AI-продукты, цифровые системы и программные решения: веб-приложения, backend-инфраструктура, автоматизация и интеграции для российского бизнеса.",
  alternates: { canonical: canonical("/") },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <Solutions />
      <Projects />
      <Stack />
      <Process />
      <Principles />
      <Company />
      <FinalCta />
      <Contact />
    </>
  );
}
