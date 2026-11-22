import { cn } from "@/lib/utils";

export function SectionLabel({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index?: string;
}) {
  return (
    <div
      className={cn(
        "label flex items-center gap-3 text-stone",
        className,
      )}
    >
      {index ? <span className="text-bronze">{index}</span> : null}
      {index ? <span aria-hidden className="h-px w-8 bg-current opacity-40" /> : null}
      <span>{children}</span>
    </div>
  );
}
