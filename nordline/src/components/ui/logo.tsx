import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <rect x="0.5" y="0.5" width="31" height="31" stroke="currentColor" strokeOpacity="0.35" />
      <path d="M8 25V7h3.2l9.6 13.4V7H24v18h-3.2L11.2 11.6V25H8Z" fill="currentColor" />
      <rect x="8" y="27.2" width="16" height="1.6" fill="#E66B35" />
    </svg>
  );
}
