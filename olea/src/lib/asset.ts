/**
 * При статическом экспорте next/image не добавляет basePath к путям,
 * поэтому префикс подставляем сами.
 */
const basePath = process.env.NEXT_PUBLIC_WORKS_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
