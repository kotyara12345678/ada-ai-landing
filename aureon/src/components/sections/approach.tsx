import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { approach } from "@/lib/content";

export function Approach({ index = "03" }: { index?: string }) {
  return (
    <section className="border-t border-ink/12 bg-paper-soft py-[clamp(5rem,9vw,9rem)]">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <SectionLabel index={index}>Approach</SectionLabel>
            <h2 className="display mt-5 text-[clamp(2.2rem,4vw,4rem)]">
              From first visit <br />
              <span className="italic text-stone">to final joint.</span>
            </h2>
          </div>
          <p className="body-copy max-w-[46ch] md:col-span-5 md:col-start-8">
            Four stages, one continuous conversation. The same people who draw the
            concept stay through construction, so intent survives contact with
            reality.
          </p>
        </div>

        <ol className="mt-14 md:mt-20">
          {approach.map((step, index) => (
            <Reveal
              as="li"
              key={step.number}
              delay={index * 0.05}
              className="group grid gap-4 border-t border-ink/15 py-7 transition-colors duration-500 hover:bg-ink/[0.03] md:grid-cols-12 md:gap-8 md:px-2 md:py-9"
            >
              <span className="label text-bronze md:col-span-1">{step.number}</span>
              <h3 className="display text-[clamp(1.6rem,2.4vw,2.4rem)] md:col-span-5">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink/70 md:col-span-5 md:col-start-8">
                {step.body}
              </p>
            </Reveal>
          ))}
          <li className="border-t border-ink/15" aria-hidden />
        </ol>
      </div>
    </section>
  );
}
