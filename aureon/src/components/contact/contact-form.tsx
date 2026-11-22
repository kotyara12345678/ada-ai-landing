"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const fieldClass =
  "w-full border-b border-ink/20 bg-transparent pb-3 pt-2 text-sm text-ink outline-none transition-colors placeholder:text-stone/70 focus:border-bronze";

const labelClass = "label block text-stone";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("loading");
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await response.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!response.ok || !payload?.ok) {
        throw new Error(payload?.message ?? "We could not send your enquiry.");
      }

      form.reset();
      setStatus("success");
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "We could not send your enquiry. Please try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col justify-center border border-ink/15 bg-paper p-8 md:p-12">
        <p className="label text-bronze">Enquiry received</p>
        <h2 className="display mt-5 text-[clamp(1.9rem,3vw,2.8rem)]">
          Thank you — we have your note.
        </h2>
        <p className="body-copy mt-5 max-w-[42ch] text-sm">
          A member of the studio will reply within two working days. If your
          project is time-sensitive, write to{" "}
          <a className="underline decoration-ink/30 underline-offset-4" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="label mt-8 w-fit border border-ink/25 px-6 py-3 transition-colors hover:bg-ink hover:text-paper"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="border border-ink/15 bg-paper p-6 md:p-10"
      aria-describedby="form-status"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={cn(fieldClass, "mt-2")}
          />
        </div>

        <div className="sm:col-span-1">
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={cn(fieldClass, "mt-2")}
          />
        </div>

        <div className="sm:col-span-1">
          <label className={labelClass} htmlFor="projectType">
            Project type
          </label>
          <div className="relative">
            <select
              id="projectType"
              name="projectType"
              required
              defaultValue=""
              className={cn(fieldClass, "mt-2 appearance-none rounded-none bg-paper pr-8")}
            >
              <option value="" disabled>
                Select a type
              </option>
              {site.projectTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              size={16}
              strokeWidth={1.4}
              className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-stone"
            />
          </div>
        </div>

        <div className="sm:col-span-1">
          <label className={labelClass} htmlFor="budget">
            Approximate budget
          </label>
          <div className="relative">
            <select
              id="budget"
              name="budget"
              defaultValue=""
              className={cn(fieldClass, "mt-2 appearance-none rounded-none bg-paper pr-8")}
            >
              <option value="" disabled>
                Select a range
              </option>
              {site.budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              size={16}
              strokeWidth={1.4}
              className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-stone"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="message">
            About the project
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Site, location, ambition, timeline…"
            className={cn(fieldClass, "mt-2 resize-none")}
          />
        </div>
      </div>

      <div className="sr-only" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-10 flex flex-col gap-5 border-t border-ink/12 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[36ch] text-xs leading-relaxed text-stone">
          We reply to every enquiry within two working days. Your details are used
          only to answer this message.
        </p>
        <button
          type="submit"
          disabled={status === "loading"}
          className="label inline-flex items-center justify-center gap-3 bg-ink px-7 py-4 text-paper transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Sending…" : "Send enquiry"}
          <span aria-hidden>→</span>
        </button>
      </div>

      <div id="form-status" aria-live="polite" className="min-h-[1.5rem]">
        {status === "error" && error ? (
          <p className="mt-4 text-sm text-[#8a3b2a]">{error}</p>
        ) : null}
        {status === "loading" ? (
          <p className="mt-4 text-sm text-stone">Sending your enquiry…</p>
        ) : null}
      </div>
    </form>
  );
}
