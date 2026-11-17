import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Direction } from "@/config/services";
import { formatRub } from "@/lib/utils";
import { DirectionIcon } from "@/components/services/DirectionIcon";

export function DirectionGrid({ items }: { items: Direction[] }) {
  return (
    <div className="grid border-t border-muted/15 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <Link
          key={item.slug}
          href={`/${item.slug}`}
          className="group relative flex flex-col gap-4 border-b border-muted/15 px-0 py-7 transition-colors sm:px-6 lg:px-7 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:nth-child(3n)]:pr-0 [&:nth-child(odd)]:sm:border-r lg:[&:nth-child(3n)]:border-r-0 [&:nth-child(3n+1)]:border-r-0 lg:[&:nth-child(3n+1)]:border-r"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="flex size-10 items-center justify-center rounded-lg border border-muted/20 text-emerald transition-colors group-hover:border-emerald/50 group-hover:bg-emerald/5">
              <DirectionIcon name={item.icon} />
            </span>
            <span className="font-mono text-[0.66rem] text-muted/50">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h3 className="font-display text-[1.08rem] font-medium text-bone">{item.name}</h3>
            <p className="text-[0.86rem] leading-relaxed text-muted">{item.short}</p>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="font-mono text-[0.7rem] text-bone/70">{formatRub(item.priceFrom)}</span>
            <ArrowUpRight
              className="size-4 text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald"
              aria-hidden
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
