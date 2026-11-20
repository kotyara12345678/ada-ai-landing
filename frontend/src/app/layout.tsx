import type { Metadata, Viewport } from "next";
// Шрифты лежат в пакетах и собираются вместе с бандлом: сборка не зависит от Google Fonts.
import "@fontsource-variable/inter";
import "@fontsource-variable/manrope";
import "./globals.css";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { Analytics } from "@/components/layout/Analytics";
import { JsonLd } from "@/components/ui/JsonLd";
import { site } from "@/config/site";
import { jsonLdOrganization, jsonLdWebSite } from "@/lib/seo";

const defaultTitle = `${site.name} — студия веб-разработки и AI-автоматизации`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: defaultTitle,
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
    title: defaultTitle,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
  },
  verification: {
    google: site.analytics.googleSiteVerification || undefined,
    yandex: site.analytics.yandexWebmaster || undefined,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={site.lang}>
      <body className="min-h-dvh bg-surface text-ink antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Перейти к содержимому
        </a>
        <JsonLd data={[jsonLdOrganization, jsonLdWebSite]} id="site-jsonld" />
        <SiteChrome>{children}</SiteChrome>
        <Analytics />
      </body>
    </html>
  );
}
