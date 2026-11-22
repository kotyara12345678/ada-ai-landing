import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function PageIntro({
  label,
  index,
  title,
  intro,
  meta,
}: {
  label: string;
  index: string;
  title: React.ReactNode;
  intro?: string;
  meta?: Array<{ label: string; value: string }>;
}) {
  return (
    <header className="shell pb-12 pt-32 md:pb-16 md:pt-44">
      <Reveal>
        <SectionLabel index={index}>{label}</SectionLabel>
      </Reveal>
      <Reveal delay={0.06}>
        <h1 className="display mt-6 max-w-[20ch] text-[clamp(2.8rem,6.4vw,6.4rem)]">
          {title}
        </h1>
      </Reveal>

      {(intro || meta) && (
        <div className="mt-10 grid gap-8 border-t border-ink/12 pt-6 md:mt-14 md:grid-cols-12">
          {intro ? (
            <Reveal delay={0.1} className="md:col-span-5">
              <p className="body-copy max-w-[46ch]">{intro}</p>
            </Reveal>
          ) : null}
          {meta?.length ? (
            <Reveal delay={0.14} className="md:col-span-6 md:col-start-7">
              <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-3">
                {meta.map((item) => (
                  <div key={item.label}>
                    <dt className="label text-stone">{item.label}</dt>
                    <dd className="mt-1 text-sm">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          ) : null}
        </div>
      )}
    </header>
  );
}
