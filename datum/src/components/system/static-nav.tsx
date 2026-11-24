"use client";

import { useEffect } from "react";

/**
 * В статической витрине ADA клиентский роутер не знает маршрутов демо,
 * поэтому внутренние ссылки открываем обычным переходом браузера.
 */
export function StaticNav() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!anchor || anchor.getAttribute("target") === "_blank") return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;

      event.preventDefault();
      window.location.assign(href);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}
