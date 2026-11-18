import { permanentRedirect } from "next/navigation";

/**
 * Раздел портфолио выведен из коммерческого позиционирования сайта.
 * Исходные материалы сохранены в репозитории:
 *   - frontend/src/config/portfolio.ts
 *   - frontend/src/components/home/ProjectsShowcase.tsx
 *   - frontend/src/components/portfolio/ProjectPreview.tsx
 *
 * URL сохранён и отвечает постоянным редиректом, чтобы не терять внешние ссылки
 * и не отдавать 404 по адресу, который мог индексироваться ранее.
 */
export default function PortfolioPage() {
  permanentRedirect("/about");
}
