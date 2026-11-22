"use client";

import { useEffect } from "react";

/**
 * Статическая витрина живёт внутри другого Next-приложения (ada-ai.ru/works/nordline),
 * где клиентский роутер не знает этих маршрутов. Поэтому внутренние ссылки открываем
 * обычным переходом браузера. В обычной сборке компонент не подключается.
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
