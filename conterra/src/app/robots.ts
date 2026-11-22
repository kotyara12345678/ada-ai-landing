import type { MetadataRoute } from "next";

const basePath = process.env.WORKS_BASE_PATH ?? "";
const origin = process.env.WORKS_SITE_ORIGIN ?? "https://conterra.example";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${origin}${basePath}/sitemap.xml`,
  };
}
