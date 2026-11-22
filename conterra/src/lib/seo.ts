/**
 * Канонические адреса страниц. В обычной сборке origin — демо-домен,
 * в витрине ADA — https://ada-ai.ru/works/conterra.
 */
const basePath = process.env.WORKS_BASE_PATH ?? "";
const origin = process.env.WORKS_SITE_ORIGIN ?? "https://conterra.example";

export function canonical(path = "/") {
  return `${origin}${basePath}${path}`;
}
