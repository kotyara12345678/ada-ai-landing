import type { MetadataRoute } from "next";
import { site } from "@/config/site";

/**
 * Поисковые краулеры и AI-агенты, которым нужен доступ к страницам.
 * `/api/` закрыт, служебные ассеты `/_next/` открыты: без CSS и JS
 * Google и Яндекс рендерят страницу неполностью.
 */
const allowedAgents = [
  "*",
  "Googlebot",
  "Googlebot-Image",
  "YandexBot",
  "YandexImages",
  "Bingbot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Amazonbot",
  "Mail.RU_Bot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: allowedAgents,
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
