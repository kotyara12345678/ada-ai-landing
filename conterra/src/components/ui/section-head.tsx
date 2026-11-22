import { Link } from "@/components/ui/route-link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadProps = {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  link?: { label: string; href: string };
  tone?: "light" | "dark";
  className?: string;
};

/** Заголовок секции в редакционной сетке: подпись слева, текст и описание справа. */
export function SectionHead({
  eyebrow,
  index,
  title,
  description,
  link,
  tone = "light",
  className,
}: SectionHeadProps) {
  const dark = tone === "dark";

  return (
    <div className={cn("border-t pt-6 md:pt-8", dark ? "border-white/15" : "border-line", className)}>
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="flex items-baseline gap-3 md:col-span-3">
          {index ? (
            <span className={cn("eyebrow", dark ? "text-teal" : "text-teal")}>{index}</span>
          ) : null}
          <span className={cn("eyebrow", dark ? "text-white/55" : "text-muted")}>{eyebrow}</span>
        </div>

        <div className="md:col-span-9 lg:col-span-6">
          <h2 className={cn("h2", dark ? "text-white" : "text-graphite")}>{title}</h2>
          {description ? (
            <div
              className={cn(
                "mt-4 max-w-xl text-[0.9375rem] leading-relaxed",
                dark ? "text-white/65" : "text-graphite/65",
              )}
            >
              {description}
            </div>
          ) : null}
        </div>

        {link ? (
          <div className="md:col-span-12 lg:col-span-3 lg:pt-2 lg:text-right">
            <Link
              href={link.href}
              className={cn(
                "group inline-flex items-center gap-2 text-[0.875rem] font-medium transition-colors",
                dark ? "text-white/80 hover:text-white" : "text-navy hover:text-teal",
              )}
            >
              {link.label}
              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
