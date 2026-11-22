import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { materials } from "@/lib/content";
import { cn } from "@/lib/utils";
import { asset } from "@/lib/asset";

const tiles = [
  { span: "md:col-span-5", ratio: "aspect-[4/5]" },
  { span: "md:col-span-4", ratio: "aspect-[4/3]" },
  { span: "md:col-span-3", ratio: "aspect-[3/4]" },
  { span: "md:col-span-4", ratio: "aspect-[4/3]" },
  { span: "md:col-span-3", ratio: "aspect-[3/4]" },
];

export function Materials() {
  return (
    <section className="border-t border-ink/12 py-[clamp(5rem,9vw,9rem)]">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel index="04">Materials &amp; details</SectionLabel>
            <h2 className="display mt-5 text-[clamp(2.2rem,4vw,4rem)]">
              Honest surfaces, <br />
              <span className="italic text-stone">precisely joined.</span>
            </h2>
          </div>
          <p className="body-copy max-w-[44ch] md:col-span-4 md:col-start-8 md:self-end">
            We work with a narrow palette, chosen for how it behaves at the scale
            of a wall and at the scale of a hand. Nothing is applied for effect.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-x-4 gap-y-10 md:mt-20 md:grid-cols-12 md:gap-x-5 md:gap-y-14">
          {materials.map((material, index) => {
            const tile = tiles[index % tiles.length];
            return (
              <Reveal
                key={material.name}
                delay={index * 0.04}
                className={cn("group", tile.span)}
              >
                <figure>
                  <div className={cn("media relative w-full", tile.ratio)}>
                    <Image
                      src={asset(material.image)}
                      alt={material.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/12 pt-3">
                    <span className="label">{material.name}</span>
                    <span className="label text-right text-stone">{material.detail}</span>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}

          <Reveal className="md:col-span-5 md:self-end">
            <div className="border-t border-ink/15 pt-5">
              <p className="body-copy max-w-[38ch] text-sm">
                Each material is sampled, mocked up at full size and reviewed on
                site before specification. Joints, tolerances and patina are part
                of the design, not an afterthought.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
