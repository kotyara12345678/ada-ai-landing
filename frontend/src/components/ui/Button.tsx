import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[background-color,border-color,color,transform] duration-200 will-change-transform active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-emerald text-graphite hover:bg-[#25dd90] focus-visible:outline-emerald",
  secondary:
    "border border-[color-mix(in_srgb,var(--color-muted)_38%,transparent)] text-bone hover:border-emerald hover:text-emerald bg-transparent",
  ghost: "text-bone/80 hover:text-bone px-0",
  light:
    "bg-graphite text-bone hover:bg-forest border border-graphite/10",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
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
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
        <ArrowUpRight
          className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </button>
  );
}
