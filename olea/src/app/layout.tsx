import type { Metadata, Viewport } from "next";
import "@fontsource-variable/fraunces";
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
    default: "OLEA — ресторан на огне",
    template: "%s — OLEA",
  },
  description: site.description,
  keywords: [
    "ресторан на огне",
    "средиземноморская кухня",
    "сезонное меню",
    "ресторан в Москве",
    "открытая кухня",
    "натуральное вино",
  ],
  applicationName: site.name,
  alternates: { canonical: canonical("/") },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: canonical("/"),
    siteName: site.name,
    title: "OLEA — ресторан на огне",
    description: site.description,
    images: [
      {
        url: canonical("/images/hero-room.jpg"),
        width: 1392,
        height: 752,
        alt: "Тёплый зал ресторана OLEA с терракотовыми стенами и свечами",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OLEA — ресторан на огне",
    description: site.description,
    images: [canonical("/images/hero-room.jpg")],
  },
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: "image/svg+xml" }],
    apple: [{ url: `${basePath}/favicon.svg` }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f3eee3",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="relative min-h-screen bg-bone text-ink">
        {staticDemo ? <StaticNav /> : null}
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          К содержанию
        </a>
        <div className="relative z-10">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
