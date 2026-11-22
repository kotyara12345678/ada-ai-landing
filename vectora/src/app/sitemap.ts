import type { MetadataRoute } from "next";
import { canonical } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: canonical("/"), priority: 1, changeFrequency: "monthly" },
    { url: canonical("/contacts"), priority: 0.6, changeFrequency: "yearly" },
  ];
}
