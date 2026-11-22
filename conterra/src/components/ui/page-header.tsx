import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/breadcrumbs";

type PageHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  crumbs: Crumb[];
  aside?: ReactNode;
};

/** Верхний блок внутренней страницы: крошки, крупный заголовок и лид. */
export function PageHeader({ eyebrow, title, lead, crumbs, aside }: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-canvas">
      <div className="shell pt-6 pb-12 md:pt-8 md:pb-16">
        <Breadcrumbs items={crumbs} />

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="eyebrow text-teal">{eyebrow}</p>
            <h1 className="h1 mt-4 max-w-[18ch] text-graphite">{title}</h1>
          </div>
          <div className="md:col-span-5 md:pl-8 lg:pl-12">
            <div className="max-w-lg border-t border-line pt-5 text-[1rem] leading-relaxed text-graphite/75 md:mt-1">
              {lead}
            </div>
            {aside ? <div className="mt-8">{aside}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
