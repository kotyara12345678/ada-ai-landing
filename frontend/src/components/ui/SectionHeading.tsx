import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  /** Оставлен для обратной совместимости вызовов; визуально не используется */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "between";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("grid gap-4", className)}>
      <div className="flex items-center gap-2.5">
        <span className="h-px w-6 bg-brand" aria-hidden="true" />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <div
        className={cn(
          "grid gap-4",
          align === "between" && "lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-14",
        )}
      >
        <h2 className="text-h2 max-w-2xl text-ink">{title}</h2>
        {description ? (
          <div
            className={cn(
              "max-w-xl text-[0.98rem] leading-relaxed text-ink-muted",
              align === "between" && "lg:pb-1",
            )}
          >
            {description}
          </div>
        ) : null}
      </div>
    </div>
  );
}
