import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/cormorant-garamond/300.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "./globals.css";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StaticNav } from "@/components/system/static-nav";
import { site } from "@/lib/site";

/** В статической сборке для витрины ADA меняются origin и basePath. */
const worksBasePath = process.env.WORKS_BASE_PATH ?? "";
const staticDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === "1";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.WORKS_SITE_ORIGIN ?? site.url),
  title: {
    default: "AUREON — Architecture shaped by nature",
    template: "%s — AUREON",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "AUREON — Architecture shaped by nature",
    description: site.description,
    url: site.url,
    images: [
      {
        url: `${worksBasePath}/images/hero-villa.jpg`,
        width: 1392,
        height: 752,
        alt: "Concrete and glass residence at dusk among pines",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AUREON — Architecture shaped by nature",
    description: site.description,
    images: [`${worksBasePath}/images/hero-villa.jpg`],
  },
  icons: {
    icon: [{ url: `${worksBasePath}/favicon.svg`, type: "image/svg+xml" }],
    apple: [{ url: `${worksBasePath}/favicon.svg` }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="noise">
        {staticDemo ? <StaticNav /> : null}
        <a
          href="#main"
          className="label sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
