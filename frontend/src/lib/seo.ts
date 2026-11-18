import type { Metadata } from "next";
import { site } from "@/config/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  noindex,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const ogImage = `${site.url}/opengraph-image`;

  return {
    // Заголовки уже содержат бренд: отключаем шаблон из layout, чтобы не дублировать «| ADA»
    title: { absolute: title },
    description,
    keywords,
    alternates: { canonical: path === "/" ? "/" : path },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type,
      locale: site.locale,
      url,
      siteName: site.name,
      title,
      description,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name} — ${site.tagline}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export function absoluteUrl(path: string): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

export const jsonLdOrganization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}#organization`,
  name: site.name,
  alternateName: site.legalName,
  url: site.url,
  description: site.description,
  email: site.contacts.email,
  areaServed: { "@type": "Country", name: "Россия" },
  availableLanguage: ["ru"],
  priceRange: "от 7 000 ₽",
  currenciesAccepted: "RUB",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.contacts.email,
    availableLanguage: ["ru"],
    areaServed: "RU",
  },
  knowsAbout: [
    "Разработка сайтов",
    "Backend-разработка",
    "Искусственный интеллект",
    "AI-агенты",
    "Автоматизация бизнес-процессов",
    "Telegram-боты",
    "Голосовые AI-агенты",
  ],
  sameAs: [site.contacts.telegram],
} as const;

export const jsonLdWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "ru-RU",
  publisher: { "@id": `${site.url}#organization` },
} as const;

export function jsonLdBreadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function jsonLdService(input: {
  name: string;
  description: string;
  path: string;
  priceFrom: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    serviceType: input.name,
    url: absoluteUrl(input.path),
    provider: { "@id": `${site.url}#organization` },
    areaServed: { "@type": "Country", name: "Россия" },
    offers: {
      "@type": "Offer",
      priceCurrency: "RUB",
      price: input.priceFrom,
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "RUB",
        minPrice: input.priceFrom,
        description: "Стартовая стоимость, итоговая цена определяется объёмом работ",
      },
    },
  };
}

export function jsonLdFaq(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function jsonLdArticle(input: {
  title: string;
  description: string;
  path: string;
  publishedAt: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(input.path) },
    datePublished: input.publishedAt,
    dateModified: input.updatedAt ?? input.publishedAt,
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@id": `${site.url}#organization` },
    inLanguage: "ru-RU",
  };
}
