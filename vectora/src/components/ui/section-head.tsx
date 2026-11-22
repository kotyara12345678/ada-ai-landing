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
    <div className={cn("hairline pt-6", className)}>
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="flex items-baseline gap-4 md:col-span-3">
          <span className="mono text-lime">{index}</span>
          <span className="mono text-muted">{label}</span>
        </div>

        <div className="md:col-span-9 lg:col-span-6">
          <h2 className="h2">{title}</h2>
          {description ? <p className="lead mt-5 max-w-xl text-[0.9375rem]">{description}</p> : null}
        </div>

        {aside ? <div className="md:col-span-12 lg:col-span-3 lg:pt-2 lg:text-right">{aside}</div> : null}
      </div>
    </div>
  );
}
