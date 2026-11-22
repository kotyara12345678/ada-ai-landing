import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";

import { Reveal } from "@/components/ui/reveal";

export function Cta() {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-paper">
      <Image
        src={asset("/images/cta-sunset.jpg")}
        alt="Contemporary residence silhouetted against an amber sunset sky, reflected in still water"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25" />

      <div className="relative z-10 shell flex min-h-[68vh] flex-col justify-end pb-14 pt-32 md:min-h-[72vh] md:pb-20">
        <Reveal>
          <p className="label text-paper/60">New commissions — 2026</p>
          <h2 className="display mt-6 max-w-[18ch] text-[clamp(2.6rem,6vw,6rem)]">
            Let&rsquo;s create something{" "}
            <span className="italic">timeless.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 flex flex-col gap-6 border-t border-paper/25 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[42ch] text-sm leading-relaxed text-paper/70">
            Tell us about the site, the life you want to live there, and the
            timeline you have in mind. We answer every enquiry personally.
          </p>
          <Link
            href="/contact"
            className="label group inline-flex w-fit items-center gap-4 border border-paper/45 px-7 py-4 transition-colors duration-300 hover:bg-paper hover:text-ink"
          >
            Start a conversation
            <span className="transition-transform duration-500 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
