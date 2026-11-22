import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/asset";

import { PageIntro } from "@/components/layout/page-intro";
import { Approach } from "@/components/sections/approach";
import { Cta } from "@/components/sections/cta";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { principles, team } from "@/lib/content";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "AUREON is a concept architecture studio working between Como, Lisbon and Copenhagen — a small team, a narrow material palette and a long-term view of building.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "Studio — AUREON",
    description:
      "A small architecture studio working between Como, Lisbon and Copenhagen.",
    url: "/studio",
    images: ["/images/studio.jpg"],
  },
};

export default function StudioPage() {
  return (
    <>
      <PageIntro
        index="01"
        label="Studio"
        title={
          <>
            A small studio, <span className="italic text-stone">deliberately.</span>
          </>
        }
        intro="We take on a limited number of projects each year so that every one receives the attention of the people who designed it. No layers, no hand-offs."
        meta={[
          { label: "Founded", value: "2012, Como" },
          { label: "Team", value: "Nine people" },
          { label: "Studios", value: "Como · Lisbon · Copenhagen" },
        ]}
      />

      <Reveal className="shell">
        <div className="media relative aspect-[16/9] w-full">
          <Image
            src={asset("/images/studio.jpg")}
            alt="Architecture studio interior with oak table, white physical models and material samples"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <section className="shell py-[clamp(4rem,7vw,7rem)]">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <SectionLabel index="02">Mission</SectionLabel>
            <h2 className="display mt-5 text-[clamp(1.9rem,3.2vw,3.2rem)]">
              Architecture that belongs where it stands.
            </h2>
          </div>
          <div className="space-y-6 md:col-span-7 md:col-start-6">
            <Reveal>
              <p className="body-copy">
                AUREON was founded on a simple conviction: the most valuable thing
                a building can do is belong — to its landscape, its climate and the
                people who use it every day.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="body-copy">
                That means fewer projects, closer collaboration and a refusal to
                apply style for its own sake. We test ideas in models and
                full-size mock-ups, and we stay involved until the last surface is
                finished.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="body-copy">
                The studio works across residential, commercial and interior
                architecture, with engineers and makers chosen per project rather
                than kept on retainer.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/12 py-[clamp(4rem,7vw,7rem)]">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionLabel index="03">Principles</SectionLabel>
              <h2 className="display mt-5 text-[clamp(1.9rem,3.2vw,3.2rem)]">
                Four rules we <span className="italic text-stone">keep returning to.</span>
              </h2>
            </div>
            <div className="md:col-span-8">
              <dl className="grid gap-px bg-ink/12 sm:grid-cols-2">
                {principles.map((principle, index) => (
                  <Reveal
                    key={principle.number}
                    delay={index * 0.04}
                    className="bg-paper p-6 md:p-8"
                  >
                    <dt className="flex items-baseline gap-4">
                      <span className="label text-bronze">{principle.number}</span>
                      <span className="display text-[clamp(1.35rem,1.7vw,1.7rem)]">
                        {principle.title}
                      </span>
                    </dt>
                    <dd className="mt-4 text-sm leading-relaxed text-ink/70">
                      {principle.body}
                    </dd>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      <Approach index="04" />

      <section className="border-t border-ink/12 py-[clamp(4rem,7vw,7rem)]">
        <div className="shell">
          <div className="grid gap-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionLabel index="05">Team</SectionLabel>
              <p className="body-copy mt-5 max-w-[34ch]">
                The people you meet at the first site visit are the people who
                deliver the building.
              </p>
            </div>
            <div className="md:col-span-8">
              <ul className="grid gap-px bg-ink/12 sm:grid-cols-3">
                {team.map((person, index) => (
                  <Reveal
                    as="li"
                    key={person.name}
                    delay={index * 0.05}
                    className="flex flex-col justify-between bg-paper p-6 md:p-7"
                  >
                    <div>
                      <span className="display flex h-14 w-14 items-center justify-center rounded-full border border-ink/20 text-lg tracking-wide">
                        {person.initials}
                      </span>
                      <h3 className="display mt-6 text-[1.5rem] leading-tight">
                        {person.name}
                      </h3>
                      <p className="label mt-2 text-stone">{person.role}</p>
                    </div>
                    <p className="mt-6 text-sm leading-relaxed text-ink/70">
                      {person.bio}
                    </p>
                  </Reveal>
                ))}
              </ul>
              <p className="mt-6 text-[11px] text-stone">
                Team members are fictional, created for this concept brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
}
