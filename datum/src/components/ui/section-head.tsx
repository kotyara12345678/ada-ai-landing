import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  aside?: ReactNode;
  className?: string;
};

export function SectionHead({ index, label, title, description, aside, className }: SectionHeadProps) {
  return (
    <div className={cn("flex flex-col gap-6 md:flex-row md:items-end md:justify-between", className)}>
      <div className="max-w-2xl">
        <p className="label flex items-baseline gap-2.5 text-muted">
          <span className="text-cobalt">{index}</span>
          {label}
        </p>
        <h2 className="h2 mt-4">{title}</h2>
        {description ? <p className="lead mt-4 max-w-xl">{description}</p> : null}
      </div>
      {aside ? <div className="shrink-0">{aside}</div> : null}
    </div>
  );
}
