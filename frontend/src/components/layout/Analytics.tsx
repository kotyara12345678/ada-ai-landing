"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { site } from "@/config/site";

declare global {
  interface Window {
    ym?: (id: number, method: string, ...args: unknown[]) => void;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Аналитика подключается только если заданы ID в переменных окружения.
 * Никаких трекеров по умолчанию — это осознанная настройка приватности.
 */
export function Analytics() {
  const pathname = usePathname();
  const { yandexMetrikaId, googleAnalyticsId } = site.analytics;

  useEffect(() => {
    if (yandexMetrikaId && typeof window.ym === "function") {
      window.ym(Number(yandexMetrikaId), "hit", window.location.href);
    }
    if (googleAnalyticsId && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_location: window.location.href,
      });
    }
  }, [pathname, yandexMetrikaId, googleAnalyticsId]);

  if (!yandexMetrikaId && !googleAnalyticsId) return null;

  return (
    <>
      {googleAnalyticsId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${googleAnalyticsId}',{send_page_view:false});`}
          </Script>
        </>
      ) : null}

      {yandexMetrikaId ? (
        <>
          <Script id="ym-init" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${Number(yandexMetrikaId)},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`}
          </Script>
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`}
                style={{ position: "absolute", left: "-9999px" }}
                alt=""
              />
            </div>
          </noscript>
        </>
      ) : null}
    </>
  );
}
