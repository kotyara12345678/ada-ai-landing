import { readFileSync } from "node:fs";
import type { NextConfig } from "next";

/**
 * В production запросы к `/api` проксирует nginx напрямую в FastAPI.
 * В development используется rewrite, чтобы фронтенд и API жили на одном origin.
 */
const backendUrl = process.env.BACKEND_INTERNAL_URL ?? "http://127.0.0.1:8000";

/**
 * Концепт-сайты AUREON и NORDLINE собираются в статику отдельными приложениями
 * и лежат в public/works/<slug>. Файл маршрутов пишет scripts/build-works.mjs:
 * статика Next отдаёт только точные пути, поэтому каждый html-файл получает rewrite.
 */
type WorksRoutes = Record<string, string[]>;

function readWorksRoutes(): WorksRoutes {
  try {
    return JSON.parse(
      readFileSync(new URL("./works-routes.json", import.meta.url), "utf8"),
    ) as WorksRoutes;
  } catch {
    return {};
  }
}

const worksRoutes = Object.entries(readWorksRoutes());

const worksRewrites = worksRoutes.flatMap(([slug, routes]) => [
  ...routes.map((route) => ({
    source: `/works/${slug}${route}`,
    destination: `/works/${slug}${route === "" ? "/index" : route}.html`,
  })),
  // Клиентский роутер ADA запрашивает RSC-полезную нагрузку корневой страницы
  // витрины как /works/<slug>.txt — отдаём её из экспортированного index.txt.
  {
    source: `/works/${slug}.txt`,
    destination: `/works/${slug}/index.txt`,
  },
]);

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  async rewrites() {
    if (process.env.NODE_ENV === "production" && process.env.API_PROXY_DISABLED === "1") {
      return worksRewrites;
    }
    return [
      ...worksRewrites,
      {
        source: "/api/:path*",
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
  async headers() {
    const headers = [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];

    // В dev имена чанков не хешируются, поэтому immutable-кэш ломает hot reload.
    if (process.env.NODE_ENV === "production") {
      headers.push({
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      });
    }

    return headers;
  },
};

export default nextConfig;
