import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Analytics } from "@/components/layout/Analytics";
import { AIConsultant } from "@/components/ai/AIConsultant";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/config/site";
import { jsonLdOrganization } from "@/lib/seo";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — разработка сайтов, ПО и AI-решений`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — разработка сайтов, ПО и AI-решений`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — разработка сайтов, ПО и AI-решений`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  verification: {
    google: site.analytics.googleSiteVerification || undefined,
    yandex: site.analytics.yandexWebmaster || undefined,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#101512",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang} className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-graphite text-bone antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-emerald focus:px-4 focus:py-2 focus:text-sm focus:text-graphite"
        >
          Перейти к содержимому
        </a>
        <JsonLd data={jsonLdOrganization} id="organization-jsonld" />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <AIConsultant />
        <Analytics />
      </body>
    </html>
  );
}
