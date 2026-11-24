#!/usr/bin/env node
/**
 * Собирает концепт-сайты из списка apps в статику и монтирует их
 * в frontend/public/works/<slug>.
 *
 * Основной сайт ADA отдаёт их как собственные страницы:
 *   https://ada-ai.ru/works/<slug>
 *
 * Запуск из корня репозитория: node scripts/build-works.mjs
 * Результат коммитится: Docker-сборка frontend копирует public целиком.
 */
import { execFileSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
// На Windows npm — это .cmd, который запускается только через shell.
const needsShell = process.platform === "win32";

const apps = [
  { dir: "conterra", slug: "conterra", cover: "public/images/hero-business-center.jpg" },
  { dir: "aureon", slug: "aureon", cover: "public/images/hero-villa.jpg" },
  { dir: "nordline", slug: "nordline", cover: "public/images/hero-hall.jpg" },
  { dir: "olea", slug: "olea", cover: "public/images/hero-room.jpg" },
];

function collectRoutes(dir, prefix = "") {
  const routes = [];

  for (const entry of readdirSync(dir)) {
    const full = path.join(dir, entry);

    if (statSync(full).isDirectory()) {
      if (entry === "_next") continue;
      routes.push(...collectRoutes(full, `${prefix}/${entry}`));
      continue;
    }

    if (!entry.endsWith(".html") || entry === "404.html") continue;
    routes.push(entry === "index.html" ? prefix : `${prefix}/${entry.slice(0, -5)}`);
  }

  return routes.sort();
}

const allRoutes = {};

for (const app of apps) {
  const appDir = path.join(root, app.dir);
  const parkedDir = path.join(appDir, ".works-parked");
  const outDir = path.join(appDir, "out");
  const targetDir = path.join(root, "frontend", "public", "works", app.slug);

  // output: export не поддерживает Route Handlers и динамические sitemap/robots.
  // На время сборки убираем их из приложения, затем возвращаем на место.
  const parked = [];
  for (const rel of ["src/app/api", "src/app/sitemap.ts", "src/app/robots.ts"]) {
    const from = path.join(appDir, rel);
    if (!existsSync(from)) continue;
    const to = path.join(parkedDir, rel);
    mkdirSync(path.dirname(to), { recursive: true });
    renameSync(from, to);
    parked.push({ from, to });
  }

  try {
    console.log(`\n[works] ${app.dir}: статическая сборка для /works/${app.slug}`);
    execFileSync(npm, ["run", "build"], {
      cwd: appDir,
      stdio: "inherit",
      shell: needsShell,
      env: {
        ...process.env,
        WORKS_EXPORT: "1",
        WORKS_BASE_PATH: `/works/${app.slug}`,
        // Публичный вариант нужен next/image в клиентских компонентах:
        // при export он не добавляет basePath к путям картинок.
        NEXT_PUBLIC_WORKS_BASE_PATH: `/works/${app.slug}`,
        WORKS_SITE_ORIGIN: "https://ada-ai.ru",
        NEXT_PUBLIC_STATIC_DEMO: "1",
      },
    });
  } finally {
    for (const { from, to } of parked) renameSync(to, from);
    rmSync(parkedDir, { recursive: true, force: true });
  }

  if (!existsSync(outDir)) throw new Error(`[works] нет каталога ${outDir}`);
  if (!existsSync(path.join(outDir, "index.html"))) {
    throw new Error(`[works] ${app.dir}: индексная страница не собралась`);
  }

  rmSync(targetDir, { recursive: true, force: true });
  mkdirSync(path.dirname(targetDir), { recursive: true });
  cpSync(outDir, targetDir, { recursive: true });

  const coversDir = path.join(root, "frontend", "public", "works-covers");
  mkdirSync(coversDir, { recursive: true });
  cpSync(path.join(appDir, app.cover), path.join(coversDir, `${app.slug}.jpg`));

  allRoutes[app.slug] = collectRoutes(outDir);
  console.log(`[works] ${app.slug}: ${allRoutes[app.slug].length} страниц(ы) скопировано`);
}

writeFileSync(
  path.join(root, "frontend", "works-routes.json"),
  `${JSON.stringify(allRoutes, null, 2)}\n`,
  "utf8",
);

console.log("\n[works] готово, маршруты записаны в frontend/works-routes.json");
