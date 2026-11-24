import { cn } from "@/lib/utils";

/** Знак DATUM: опорная линия, точка отсчёта и столбики данных. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
      fill="none"
    >
      <rect width="32" height="32" rx="8" fill="var(--color-cobalt)" />
      <path d="M8 21.5h16" stroke="white" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
      <rect x="9" y="14" width="3.4" height="5.6" rx="1" fill="white" />
      <rect x="14.3" y="10" width="3.4" height="9.6" rx="1" fill="white" fillOpacity="0.75" />
      <rect x="19.6" y="12" width="3.4" height="7.6" rx="1" fill="var(--color-acid)" />
      <circle cx="21.3" cy="7.4" r="1.6" fill="white" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-bold tracking-[0.14em] text-ink">
          DATUM
        </span>
        <span className="mt-1 text-[0.5625rem] font-medium tracking-[0.08em] text-muted">
          операционная аналитика
        </span>
      </span>
    </span>
  );
}
