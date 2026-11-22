import { cn } from "@/lib/utils";

/** V-эмблема: две сходящиеся линии и точка вектора. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8 shrink-0", className)} fill="none">
      <path d="M4 6 16 27 28 6" stroke="currentColor" strokeWidth="2.2" />
      <path d="M10.5 6 16 15.6 21.5 6" stroke="#00B879" strokeWidth="2.2" />
      <circle cx="16" cy="27" r="1.7" fill="#A3FF70" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <LogoMark className="text-text" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.0625rem] font-semibold tracking-[0.28em] text-text">
          VECTORA
        </span>
        <span className="mono mt-1.5 text-[0.5rem] tracking-[0.3em] text-muted">
          Digital engineering
        </span>
      </span>
    </span>
  );
}
