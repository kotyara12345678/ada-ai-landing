"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AIConsultant } from "@/components/ai/AIConsultant";

/**
 * Админ-панель живёт без публичной шапки, подвала и AI-консультанта:
 * остальным страницам обвязка нужна как раньше.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <main id="main">{children}</main>;
  }

  return (
    <>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <AIConsultant />
    </>
  );
}
