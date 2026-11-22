/**
 * Концепт-сайты студии. Собираются в статику и живут на этом же домене
 * как самостоятельные страницы: /works/aureon и /works/nordline.
 * Исходники — каталоги aureon/ и nordline/, сборка — scripts/build-works.mjs.
 */
export type Work = {
  slug: string;
  name: string;
  /** Что за проект и в каком формате */
  discipline: string;
  summary: string;
  tags: string[];
  href: string;
  cover: string;
  coverAlt: string;
};

export const works: Work[] = [
  {
    slug: "nordline",
    name: "NORDLINE",
    discipline: "Промышленная B2B-компания · одностраничный сайт",
    summary:
      "Лендинг поставщика оборудования: четыре направления, каталог с фильтрами и карточками товаров, инженерный подход, отрасли и форма подбора.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    href: "/works/nordline",
    cover: "/works-covers/nordline.jpg",
    coverAlt: "Первый экран концепт-сайта NORDLINE с промышленным цехом",
  },
  {
    slug: "aureon",
    name: "AUREON",
    discipline: "Архитектурное бюро · многостраничный сайт",
    summary:
      "Сайт бюро на английском: каталог из шести объектов, страницы проектов, раздел о студии и форма запроса с бюджетом и типом проекта.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    href: "/works/aureon",
    cover: "/works-covers/aureon.jpg",
    coverAlt: "Первый экран концепт-сайта AUREON с домом среди сосен",
  },
];
