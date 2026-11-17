import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "between";
  className?: string;
  tone?: "dark" | "light";
};

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
  tone = "dark",
}: SectionHeadingProps) {
  const muted = tone === "dark" ? "text-muted" : "text-graphite/55";
  const strong = tone === "dark" ? "text-bone" : "text-graphite";

  return (
    <div className={cn("grid gap-8", className)}>
      <div className="flex items-center gap-4">
        {index ? <span className={cn("eyebrow tabular-nums", muted)}>{index}</span> : null}
        <span className={cn("h-px flex-1 max-w-16", tone === "dark" ? "bg-muted/30" : "bg-graphite/20")} />
        <span className={cn("eyebrow", muted)}>{eyebrow}</span>
      </div>
      <div
        className={cn(
          "grid gap-6",
          align === "between" && "lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-16",
        )}
      >
        <h2 className={cn("text-h2 max-w-3xl", strong)}>{title}</h2>
        {description ? (
          <div className={cn("max-w-xl text-[0.98rem] leading-relaxed", muted, align === "between" && "lg:pb-2")}>
            {description}
          </div>
        ) : null}
      </div>
    </div>
  );
}
