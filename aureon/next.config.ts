import type { NextConfig } from "next";

/**
 * Обычный запуск — свой dev/prod-сервер и оптимизированные изображения.
 * WORKS_EXPORT=1 — статическая сборка для витрины ADA (/works/aureon);
 * её собирает scripts/build-works.mjs в корне репозитория.
 */
const basePath = process.env.WORKS_BASE_PATH ?? "";
const isWorksExport = process.env.WORKS_EXPORT === "1";

const nextConfig: NextConfig = isWorksExport
  ? {
      output: "export",
      basePath,
      images: { unoptimized: true },
    }
  : {
      images: {
        formats: ["image/avif", "image/webp"],
        deviceSizes: [360, 420, 640, 768, 1024, 1280, 1440, 1920, 2560],
      },
    };

export default nextConfig;
