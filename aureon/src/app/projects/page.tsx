import type { Metadata } from "next";

import { PageIntro } from "@/components/layout/page-intro";
import { ProjectsGallery } from "@/components/projects/projects-gallery";
import { Cta } from "@/components/sections/cta";
import { projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected residential, commercial and interior architecture by AUREON — private residences, country houses and urban buildings.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — AUREON",
    description:
      "Selected residential, commercial and interior architecture by AUREON.",
    url: "/projects",
    images: ["/images/villa-solis.jpg"],
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageIntro
        index="01"
        label="Projects"
        title={
          <>
            Built work and <span className="italic text-stone">concepts.</span>
          </>
        }
        intro="A selection of residences, country houses and urban buildings. Each project begins with the site and ends with the quality of the light in a room."
        meta={[
          {
            label: "Projects",
            value: `${String(projects.length).padStart(2, "0")} selected`,
          },
          { label: "Period", value: "2022 — 2025" },
          { label: "Countries", value: "Italy · Portugal · Sweden · Denmark" },
        ]}
      />
      <ProjectsGallery projects={projects} />
      <Cta />
    </>
  );
}
