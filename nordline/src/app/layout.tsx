import type { Metadata, Viewport } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "./globals.css";

import { StaticNav } from "@/components/system/static-nav";

/** В статической сборке для витрины ADA меняются origin и канонический адрес. */
const worksBasePath = process.env.WORKS_BASE_PATH ?? "";
const staticDemo = process.env.NEXT_PUBLIC_STATIC_DEMO === "1";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.WORKS_SITE_ORIGIN ?? "https://example.com"),
  title: {
    default: "NORDLINE — инженерные решения и оборудование для промышленности",
    template: "%s — NORDLINE",
  },
  description:
    "Поставка промышленного оборудования, гидравлических систем, конвейерных решений и комплектующих для производственных предприятий России. Подбор под задачу, проверка совместимости, сопровождение поставки.",
  keywords: [
    "промышленное оборудование",
    "гидравлические системы",
    "конвейерное оборудование",
    "комплектующие для производства",
    "комплектация предприятий",
  ],
  alternates: { canonical: worksBasePath || "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "/",
    siteName: "NORDLINE",
    title: "NORDLINE — инженерные решения и оборудование для промышленности",
    description:
      "Оборудование, комплектующие и комплексные решения для предприятий, где важны надёжность, точность и стабильность процессов.",
    images: [
      {
        url: `${worksBasePath}/images/hero-hall.jpg`,
        width: 1392,
        height: 752,
        alt: "Промышленный цех NORDLINE",
      },
    ],
  },
  icons: {
    icon: [{ url: `${worksBasePath}/favicon.svg`, type: "image/svg+xml" }],
    apple: [{ url: `${worksBasePath}/favicon.svg` }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#151816",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        {staticDemo ? <StaticNav /> : null}
        {children}
      </body>
    </html>
  );
}
