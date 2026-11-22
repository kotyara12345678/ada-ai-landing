import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <section className="shell pb-[clamp(4rem,7vw,7rem)]">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-2">
          <SectionLabel index="05">Studio</SectionLabel>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:col-span-10 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.06} className="border-t border-ink/15 pt-5">
              <p className="display text-[clamp(2.6rem,4.4vw,4.4rem)] leading-none">
                {stat.value}
              </p>
              <p className="label mt-4 text-stone">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <p className="mt-10 text-[11px] text-stone md:mt-14 md:pl-[16.666%]">
        Figures describe the fictional AUREON concept brand and are not claims
        about ADA.
      </p>
    </section>
  );
}
