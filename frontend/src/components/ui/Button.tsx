import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "success" | "light" | "lime" | "dark" | "outline-light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  secondary:
    "border border-line-strong bg-surface text-ink hover:border-ink hover:text-ink",
  ghost: "px-0 text-brand hover:text-brand-dark",
  success: "bg-success text-white hover:bg-[#12885a]",
  light: "bg-white text-ink hover:bg-white/90",
  lime: "bg-lime text-ink hover:bg-[#c9e84f]",
  dark: "bg-ink text-white hover:bg-ink-soft",
  "outline-light": "border border-white/25 text-white hover:border-white/60 hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-[0.9rem]",
  lg: "h-12 px-6 text-[0.95rem]",
};

type LinkButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  className?: string;
  external?: boolean;
};

export function LinkButton({
  href,
  children,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  external,
}: LinkButtonProps) {
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, variants[variant], sizes[size], className)}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)}>
      {content}
    </Link>
  );
}

type ButtonProps = ComponentProps<"button"> & {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  withArrow,
  className,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </button>
  );
}
