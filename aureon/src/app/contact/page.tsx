import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { ContactForm } from "@/components/contact/contact-form";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with AUREON about a residence, country house or commercial project. Concept studio contact page.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — AUREON",
    description: "Start a conversation about a new architectural project.",
    url: "/contact",
    images: ["/images/cta-sunset.jpg"],
  },
};

const details = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Telephone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "Studio", value: site.address },
  { label: "Hours", value: site.hours },
];

export default function ContactPage() {
  return (
    <div className="shell pb-[clamp(4rem,8vw,8rem)] pt-32 md:pt-44">
      <div className="grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <Reveal>
            <SectionLabel index="01">Contact</SectionLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="display mt-6 text-[clamp(2.8rem,5.4vw,5.2rem)]">
              Start a <span className="italic text-stone">conversation.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-copy mt-6 max-w-[40ch]">
              Tell us about the site and what you want the building to do. We will
              come back with an honest view of scope, sequence and cost.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <dl className="mt-12 divide-y divide-ink/12 border-y border-ink/12">
              {details.map((detail) => (
                <div key={detail.label} className="grid grid-cols-3 gap-4 py-4">
                  <dt className="label pt-1 text-stone">{detail.label}</dt>
                  <dd className="col-span-2 text-sm">
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="link-line inline-flex text-ink"
                      >
                        {detail.value}
                        <ArrowUpRight size={14} strokeWidth={1.4} />
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-[40ch] text-xs leading-relaxed text-stone">
              This is a fictional studio. Contact details are illustrative and are
              not monitored — enquiries sent from this form are stored by the demo
              application only.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
