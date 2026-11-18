import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "@/components/ui/JsonLd";
import { jsonLdBreadcrumbs } from "@/lib/seo";

type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const full = [{ name: "Главная", path: "/" }, ...items];

  return (
    <nav aria-label="Хлебные крошки">
      <JsonLd data={jsonLdBreadcrumbs(full)} />
      <ol className="flex flex-wrap items-center gap-1.5 text-[0.78rem] text-ink-muted">
        {full.map((item, index) => {
          const isLast = index === full.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {index > 0 ? <ChevronRight className="size-3 text-ink-muted/60" aria-hidden /> : null}
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition-colors hover:text-brand">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
