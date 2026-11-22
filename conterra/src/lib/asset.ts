/**
 * Витрина ADA живёт по адресу /works/conterra. При output: "export" next/image
 * не добавляет basePath к путям картинок, поэтому префикс подставляем сами.
 * В собственной сборке переменная пустая.
 */
const basePath = process.env.NEXT_PUBLIC_WORKS_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
