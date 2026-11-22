const basePath = process.env.WORKS_BASE_PATH ?? "";
const origin = process.env.WORKS_SITE_ORIGIN ?? "https://vectora.example";

export function canonical(path = "/") {
  return `${origin}${basePath}${path}`;
}
