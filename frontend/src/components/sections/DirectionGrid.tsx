import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Direction } from "@/config/services";
import { formatRub } from "@/lib/utils";
import { DirectionIcon } from "@/components/services/DirectionIcon";

export function DirectionGrid({ items }: { items: Direction[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`/${item.slug}`}
          className="group flex flex-col gap-3 rounded-xl border border-line bg-surface p-5 transition-all hover:border-brand/40 hover:shadow-card"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <DirectionIcon name={item.icon} />
            </span>
            <span className="rounded-md bg-surface-muted px-2 py-1 text-[0.7rem] text-ink-muted">
              {item.group === "maintenance" ? "обслуживание" : "разработка"}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1.5">
            <h3 className="font-display text-[1.02rem] font-semibold text-ink group-hover:text-brand">
              {item.name}
            </h3>
            <p className="text-[0.86rem] leading-relaxed text-ink-muted">{item.short}</p>
          </div>
          <div className="flex items-center justify-between border-t border-line pt-3">
            <span className="text-[0.8rem] font-medium text-ink">{formatRub(item.priceFrom)}</span>
            <ArrowRight
              className="size-4 text-ink-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
              aria-hidden
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
