import Link from "next/link";

import { navLinks, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-paper/80">
      <div className="shell pb-10 pt-16 md:pb-14 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-[15px] font-semibold tracking-[0.34em] text-paper">
              AUREON
            </p>
            <p className="mt-6 max-w-[34ch] text-sm leading-relaxed text-paper/60">
              An architecture studio for private residences, contemporary rural
              homes and considered commercial work.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="label mb-5 text-paper/40">Navigate</p>
            <ul className="space-y-3 text-sm">
              <li>
                <Link className="transition-opacity hover:opacity-60" href="/projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link className="transition-opacity hover:opacity-60" href="/studio">
                  Studio
                </Link>
              </li>
              <li>
                <Link className="transition-opacity hover:opacity-60" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="transition-opacity hover:opacity-60" href="/#philosophy">
                  Philosophy
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="label mb-5 text-paper/40">Studio</p>
            <address className="space-y-2 text-sm not-italic text-paper/70">
              <p>{site.address}</p>
              <p>
                <a className="transition-opacity hover:opacity-60" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
              <p>{site.phone}</p>
            </address>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
              {site.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="label text-paper/50 transition-colors hover:text-paper"
                    aria-label={`${social.label} (placeholder link)`}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/15 pt-6 md:mt-24 md:flex-row md:items-center md:justify-between">
          <p className="label text-paper/40">
            © {new Date().getFullYear()} AUREON — Concept studio
          </p>
          <p className="label text-paper/40">
            Design &amp; build by{" "}
            <a
              href="https://ada-ai.ru"
              className="text-paper/70 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
            >
              ADA
            </a>
          </p>
        </div>

        <p className="mt-6 max-w-[80ch] text-[11px] leading-relaxed text-paper/30">
          AUREON is a fictional architecture brand created for demonstration
          purposes. Projects, figures, people and contacts shown on this site are
          conceptual. Photography: original generated imagery and free-licence
          photographs from Pexels.
        </p>
      </div>
    </footer>
  );
}
