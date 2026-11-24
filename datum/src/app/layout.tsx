import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StaticNav } from "@/components/system/static-nav";
import { canonical } from "@/lib/seo";
import { site } from "@/lib/site";

const basePath = process.env.WORKS_BASE_PATH ?? "";
const staticDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === "1";

export const metadata: Metadata = {
  metadataBase: new URL(canonical("/")),
  title: {
    default: "DATUM — операционная аналитика для команд",
    template: "%s — DATUM",
  },
  description: site.description,
  keywords: [
    "аналитика для команд",
    "дашборд метрик",
    "BI для SaaS",
    "сквозная аналитика",
    "отчётность",
    "продуктовые метрики",
  ],
  applicationName: site.name,
  alternates: { canonical: canonical("/") },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: canonical("/"),
    siteName: site.name,
    title: "DATUM — операционная аналитика для команд",
    description: site.description,
    images: [
      {
        url: canonical("/images/studio-sheets.jpg"),
        width: 1392,
        height: 752,
        alt: "Студийная композиция из полупрозрачных голубых панелей — обложка DATUM",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DATUM — операционная аналитика для команд",
    description: site.description,
    images: [canonical("/images/studio-sheets.jpg")],
  },
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: "image/svg+xml" }],
    apple: [{ url: `${basePath}/favicon.svg` }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f6f7f3",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="relative min-h-screen bg-paper text-ink">
        {staticDemo ? <StaticNav /> : null}
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-white"
        >
          К содержанию
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
