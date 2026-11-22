import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center bg-ink text-paper">
      <div className="shell py-32">
        <Reveal>
          <p className="label text-paper/50">Error 404</p>
          <h1 className="display mt-6 max-w-[18ch] text-[clamp(3rem,8vw,8rem)]">
            This room <span className="italic">doesn&rsquo;t exist.</span>
          </h1>
          <p className="mt-8 max-w-[40ch] text-sm leading-relaxed text-paper/70">
            The page you were looking for has moved, or was never built. The
            projects are still where they should be.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="label border border-paper/40 px-6 py-4 transition-colors hover:bg-paper hover:text-ink"
            >
              Back to home
            </Link>
            <Link
              href="/projects"
              className="label border border-paper/20 px-6 py-4 text-paper/80 transition-colors hover:bg-paper hover:text-ink"
            >
              View projects
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
