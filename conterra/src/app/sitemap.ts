import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";

const basePath = process.env.WORKS_BASE_PATH ?? "";
const origin = process.env.WORKS_SITE_ORIGIN ?? "https://conterra.example";
const url = (path: string) => `${origin}${basePath}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), priority: 1, changeFrequency: "monthly" },
    { url: url("/about"), priority: 0.7, changeFrequency: "monthly" },
    { url: url("/services"), priority: 0.9, changeFrequency: "monthly" },
    { url: url("/projects"), priority: 0.8, changeFrequency: "monthly" },
    { url: url("/contacts"), priority: 0.7, changeFrequency: "yearly" },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: url(`/projects/${project.slug}`),
    priority: 0.6,
    changeFrequency: "yearly",
  }));

  return [...staticRoutes, ...projectRoutes];
}
