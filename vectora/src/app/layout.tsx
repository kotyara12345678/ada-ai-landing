import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
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
    default: "VECTORA — инженерия цифрового будущего",
    template: "%s — VECTORA",
  },
  description: site.description,
  keywords: [
    "разработка AI-продуктов",
    "веб-приложения на заказ",
    "backend разработка",
    "автоматизация бизнеса",
    "интеграции с LLM",
    "digital engineering",
  ],
  applicationName: site.name,
  alternates: { canonical: canonical("/") },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: canonical("/"),
    siteName: site.name,
    title: "VECTORA — инженерия цифрового будущего",
    description: site.description,
    images: [
      {
        url: canonical("/images/og-vectora.jpg"),
        width: 1536,
        height: 864,
        alt: "Абстрактная вычислительная структура VECTORA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VECTORA — инженерия цифрового будущего",
    description: site.description,
    images: [canonical("/images/og-vectora.jpg")],
  },
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: "image/svg+xml" }],
    apple: [{ url: `${basePath}/favicon.svg` }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#080b09",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="relative min-h-screen bg-void text-text">
        {staticDemo ? <StaticNav /> : null}
        <a
          href="#main"
          className="mono sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-lime focus:px-4 focus:py-3 focus:text-void"
        >
          К содержанию
        </a>
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
          <div className="grid-lines absolute inset-0 opacity-[0.55]" />
          <div className="grain absolute inset-0" />
          <div className="absolute -left-[18%] top-[-10%] h-[52vw] w-[52vw] rounded-full bg-[radial-gradient(circle,rgba(0,184,121,0.16),transparent_62%)] blur-[60px]" />
          <div className="absolute right-[-12%] top-[38%] h-[40vw] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(163,255,112,0.08),transparent_65%)] blur-[70px]" />
        </div>

        <div className="relative z-10">
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
