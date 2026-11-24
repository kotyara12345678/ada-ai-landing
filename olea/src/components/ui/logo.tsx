import { cn } from "@/lib/utils";

/** Оливковая ветвь: два листа и плод. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("size-8 shrink-0", className)}
      fill="none"
    >
      <path
        d="M5 26C9 18 16 11 27 6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M13.6 16.2c-3.4.3-5.6-1.2-6.3-4.4 3.3-.6 5.7.9 6.3 4.4Z"
        fill="var(--color-olive)"
      />
      <path
        d="M18.4 12.4c-.7-3.2.5-5.6 3.5-6.9 1 3.2-.2 5.7-3.5 6.9Z"
        fill="var(--color-olive)"
      />
      <circle cx="24.6" cy="21.4" r="2.6" fill="var(--color-clay)" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] font-normal tracking-[0.3em] text-ink">
          OLEA
        </span>
        <span className="label mt-1.5 text-[0.4375rem] tracking-[0.26em] text-muted">
          кухня · огонь · масло
        </span>
      </span>
    </span>
  );
}
