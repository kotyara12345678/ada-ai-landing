import { cn } from "@/lib/utils";

/** Знак CONTERRA: квадрат с линией застройки. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-9 shrink-0", className)}
      fill="none"
    >
      <rect width="32" height="32" fill="currentColor" opacity="0.96" />
      <path d="M9 22V10h9" stroke="#FFFFFF" strokeWidth="2.2" />
      <path d="M9 16h6.5" stroke="#5D9C98" strokeWidth="2.2" />
      <path d="M23 10v12" stroke="#FFFFFF" strokeWidth="2.2" />
    </svg>
  );
}

export function Logo({
  tone = "dark",
  className,
}: {
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className={tone === "light" ? "text-white/10" : "text-navy"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.0625rem] font-semibold tracking-[0.18em]",
            tone === "light" ? "text-white" : "text-graphite",
          )}
        >
          CONTERRA
        </span>
        <span
          className={cn(
            "mt-1.5 hidden text-[0.5625rem] font-medium uppercase tracking-[0.22em] sm:block",
            tone === "light" ? "text-white/55" : "text-muted",
          )}
        >
          проектирование · строительство
        </span>
      </span>
    </span>
  );
}
