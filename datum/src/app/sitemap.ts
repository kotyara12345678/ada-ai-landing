import type { MetadataRoute } from "next";
import { canonical } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: canonical("/"), priority: 1, changeFrequency: "monthly" }];
}
