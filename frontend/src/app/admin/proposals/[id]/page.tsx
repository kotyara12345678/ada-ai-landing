"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { AdminApiError } from "@/lib/admin-api";
import { fetchProposal, type ProposalDetail } from "@/lib/proposals-api";
import ProposalEditor from "@/components/admin/proposal-editor";

export default function ProposalPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const publicId = String(params.id ?? "");
  const [proposal, setProposal] = useState<ProposalDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const loaded = await fetchProposal(publicId);
        if (active) setProposal(loaded);
      } catch (caught) {
        if (!active) return;
        if (caught instanceof AdminApiError && caught.status === 401) {
          router.replace("/admin/login");
          return;
        }
        setError(caught instanceof Error ? caught.message : "Не удалось загрузить КП");
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, [publicId, router]);

  if (error) {
    return (
      <div className="mx-auto w-full max-w-xl px-4 py-16 text-center">
        <p className="rounded-lg bg-[#fdecec] px-3 py-2 text-[0.82rem] text-[#b42525]">{error}</p>
        <Link
          href="/admin/proposals"
          className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          К списку предложений
        </Link>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="size-5 animate-spin text-ink-muted" aria-hidden />
      </div>
    );
  }

  return <ProposalEditor initial={proposal} />;
}
