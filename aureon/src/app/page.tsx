import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { Philosophy } from "@/components/sections/philosophy";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Approach } from "@/components/sections/approach";
import { Materials } from "@/components/sections/materials";
import { Stats } from "@/components/sections/stats";
import { Cta } from "@/components/sections/cta";

export const metadata: Metadata = {
  title: "Architecture shaped by nature",
  description:
    "AUREON designs private residences, contemporary rural homes and commercial architecture. Light, material and landscape held in balance.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Philosophy />
      <FeaturedProjects />
      <Approach />
      <Materials />
      <Stats />
      <Cta />
    </>
  );
}
