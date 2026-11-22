import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource-variable/inter";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StaticNav } from "@/components/system/static-nav";
import { site } from "@/lib/site";

/**
 * В статической сборке для витрины ADA сайт живёт по адресу
 * https://ada-ai.ru/works/conterra, поэтому origin и basePath берутся из env.
 */
const basePath = process.env.WORKS_BASE_PATH ?? "";
const origin = process.env.WORKS_SITE_ORIGIN ?? "https://conterra.example";
const staticDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === "1";

const asset = (path: string) => `${origin}${basePath}${path}`;

export const metadata: Metadata = {
  metadataBase: new URL(origin),
  title: {
    default: "CONTERRA — инженерное проектирование и строительство",
    template: "%s — CONTERRA",
  },
  description: site.description,
  keywords: [
    "инженерное проектирование",
    "строительство промышленных зданий",
    "реконструкция объектов",
    "инженерные системы",
    "техническое сопровождение проектов",
    "коммерческая недвижимость",
  ],
  applicationName: site.name,
  alternates: { canonical: `${origin}${basePath || "/"}` },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: `${origin}${basePath || "/"}`,
    siteName: site.name,
    title: "CONTERRA — проектируем пространство для развития бизнеса",
    description:
      "Комплексные инженерные и строительные решения для коммерческих и промышленных объектов: проектирование, строительство, реконструкция, инженерные системы.",
    images: [
      {
        url: asset("/images/hero-business-center.jpg"),
        width: 1248,
        height: 832,
        alt: "Современное коммерческое здание со светлым фасадом",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CONTERRA — инженерное проектирование и строительство",
    description: site.description,
    images: [asset("/images/hero-business-center.jpg")],
  },
  icons: {
    icon: [{ url: `${basePath}/favicon.svg`, type: "image/svg+xml" }],
    apple: [{ url: `${basePath}/favicon.svg` }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f5f6f3",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="flex min-h-screen flex-col bg-canvas text-graphite">
        {staticDemo ? <StaticNav /> : null}
        <Header />
        <main id="content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
