import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  titleClassName?: string;
};

export function SectionHead({
  index,
  label,
  title,
  description,
  className,
  titleClassName,
}: SectionHeadProps) {
  const muted = "text-graphite/70";

  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
      <div className="lg:col-span-8">
        <div className="flex items-baseline gap-4">
          <span className="label text-accent">{index}</span>
          <span className={cn("label", muted)}>{label}</span>
        </div>
        <h2
          className={cn(
            "display mt-6 text-[clamp(2rem,4.4vw,4.25rem)]",
            titleClassName,
          )}
        >
          {title}
        </h2>
      </div>
      {description ? (
        <div className={cn("lg:col-span-4 lg:col-start-9 lg:pt-12", muted)}>
          <div className="max-w-md text-[0.9375rem] leading-relaxed">{description}</div>
        </div>
      ) : null}
    </div>
  );
}
