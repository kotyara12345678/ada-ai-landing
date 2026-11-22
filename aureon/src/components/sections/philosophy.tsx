import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

export function Philosophy() {
  return (
    <section id="philosophy" className="shell scroll-mt-24 py-[clamp(5rem,9vw,9rem)]">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <SectionLabel index="01">Philosophy</SectionLabel>
        </div>

        <div className="md:col-span-9">
          <Reveal>
            <h2 className="display max-w-[22ch] text-[clamp(2.4rem,4.9vw,4.8rem)]">
              Beyond the structure.{" "}
              <span className="italic text-stone">Into the experience.</span>
            </h2>
          </Reveal>
        </div>
      </div>

      <div className="mt-14 grid gap-10 md:mt-24 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 md:col-start-1">
          <Reveal className="space-y-6">
            <p className="body-copy max-w-[46ch]">
              Architecture is not an object placed on a site — it is a
              conversation with it. We begin with the movement of the sun, the
              direction of prevailing wind, the trees that were already there.
              The building follows.
            </p>
            <p className="body-copy max-w-[46ch]">
              Proportion, material and light do the quiet work. A room should feel
              inevitable: correctly sized, correctly lit, correctly still. That
              restraint is what makes a house calm to live in and expensive-looking
              without decoration.
            </p>
            <div className="pt-2">
              <Link href="/studio" className="label link-line text-ink">
                Our approach
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-12 border-t border-ink/15 pt-4">
            <p className="display text-[clamp(1.5rem,2vw,1.9rem)] leading-snug">
              “A house should become more itself as it ages.”
            </p>
            <p className="label mt-4 text-stone">Elena Marchetti, founding partner</p>
          </Reveal>
        </div>

        <div className="md:col-span-5 md:col-start-7 md:mt-24">
          <Reveal delay={0.1}>
            <figure>
              <div className="media relative aspect-[3/4] w-full">
                <Image
                  src={asset("/images/philosophy.jpg")}
                  alt="Daylight falling through a tall opening onto a curved plaster wall beside a stone stair"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                <span className="label text-stone">Light study — guest stair</span>
                <span className="label text-stone/60">Villa Solis, 2024</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>

      </div>
    </section>
  );
}
