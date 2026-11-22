import NextLink, { type LinkProps } from "next/link";
import type { AnchorHTMLAttributes } from "react";

type RouteLinkProps = LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

/**
 * Внутренняя ссылка без RSC-префетча: статическая витрина отдаётся через
 * rewrites, поэтому запросы вида /works/conterra/about.txt?_rsc=... дают 404.
 * В собственной сборке префетч тоже не нужен — страницы статические.
 */
export function Link(props: RouteLinkProps) {
  return <NextLink {...props} prefetch={false} />;
}
