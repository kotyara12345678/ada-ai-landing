"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpRight,
  Copy,
  FileText,
  Loader2,
  Plus,
  Printer,
  RefreshCw,
  Trash2,
} from "lucide-react";
import { AdminApiError } from "@/lib/admin-api";
import {
  PROPOSAL_STATUSES,
  PROPOSAL_STATUS_LABELS,
  createProposal,
  deleteProposal,
  duplicateProposal,
  fetchProposals,
  type ProposalListItem,
  type ProposalStatus,
} from "@/lib/proposals-api";
import { currency } from "@/config/pricing";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-[#f1f2f4] text-[#5b6472]",
  sent: "bg-[#e7ecff] text-[#1e4bff]",
  accepted: "bg-[#ecf8f2] text-[#128050]",
  rejected: "bg-[#fdecec] text-[#b42525]",
};

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

export default function ProposalsPage() {
  const router = useRouter();
  const [items, setItems] = useState<ProposalListItem[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<ProposalStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(
    async (status: ProposalStatus | "all") => {
      try {
        const response = await fetchProposals({
          status: status === "all" ? undefined : status,
        });
        setItems(response.items);
        setTotal(response.total);
        setError(null);
      } catch (caught) {
        if (caught instanceof AdminApiError && caught.status === 401) {
          router.replace("/admin/login");
          return;
        }
        setError(caught instanceof Error ? caught.message : "Не удалось загрузить предложения");
      }
    },
    [router],
  );

  useEffect(() => {
    let active = true;

    async function boot() {
      try {
        await load("all");
      } finally {
        if (active) setLoading(false);
      }
    }

    void boot();
    return () => {
      active = false;
    };
  }, [load]);

  async function onRefresh() {
    setRefreshing(true);
    await load(filter);
    setRefreshing(false);
  }

  async function onCreate() {
    setCreating(true);
    setError(null);
    try {
      const proposal = await createProposal({});
      router.push(`/admin/proposals/${encodeURIComponent(proposal.public_id)}`);
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) {
        router.replace("/admin/login");
        return;
      }
      setError(caught instanceof Error ? caught.message : "Не удалось создать КП");
      setCreating(false);
    }
  }

  async function onDuplicate(item: ProposalListItem) {
    setBusy(item.public_id);
    setError(null);
    try {
      const copy = await duplicateProposal(item.public_id);
      router.push(`/admin/proposals/${encodeURIComponent(copy.public_id)}`);
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) {
        router.replace("/admin/login");
        return;
      }
      setError(caught instanceof Error ? caught.message : "Не удалось дублировать КП");
    } finally {
      setBusy(null);
    }
  }

  async function onDelete(item: ProposalListItem) {
    if (!window.confirm(`Удалить ${item.public_id}? Действие необратимо.`)) return;
    setBusy(item.public_id);
    setError(null);
    try {
      await deleteProposal(item.public_id);
      setItems((current) => current.filter((entry) => entry.public_id !== item.public_id));
      setTotal((current) => Math.max(0, current - 1));
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) {
        router.replace("/admin/login");
        return;
      }
      setError(caught instanceof Error ? caught.message : "Не удалось удалить КП");
    } finally {
      setBusy(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="size-5 animate-spin text-ink-muted" aria-hidden />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
        <div>
          <Link
            href="/admin"
            className="text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-brand"
          >
            ADA · админ-панель
          </Link>
          <h1 className="mt-1 font-display text-[1.6rem] font-semibold tracking-tight text-ink">
            Коммерческие предложения
          </h1>
          <p className="mt-1 text-[0.78rem] text-ink-muted">
            {total} документов · шаблон «Рост и автоматизация»
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 text-[0.82rem] text-ink transition-colors hover:border-line-strong disabled:opacity-60"
          >
            <RefreshCw className={cn("size-3.5", refreshing && "animate-spin")} aria-hidden />
            Обновить
          </button>
          <button
            type="button"
            onClick={onCreate}
            disabled={creating}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink-deep px-3 text-[0.82rem] font-medium text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
          >
            {creating ? (
              <Loader2 className="size-3.5 animate-spin" aria-hidden />
            ) : (
              <Plus className="size-3.5" aria-hidden />
            )}
            Новое КП
          </button>
        </div>
      </header>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {(["all", ...PROPOSAL_STATUSES] as const).map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setFilter(value);
              void load(value);
            }}
            className={cn(
              "h-8 rounded-lg border px-3 text-[0.78rem] transition-colors",
              filter === value
                ? "border-ink-deep bg-ink-deep text-white"
                : "border-line bg-surface text-ink-muted hover:border-line-strong hover:text-ink",
            )}
          >
            {value === "all" ? "Все" : PROPOSAL_STATUS_LABELS[value]}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-lg bg-[#fdecec] px-3 py-2 text-[0.8rem] text-[#b42525]">{error}</p>
      ) : null}

      <div className="mt-4 flex flex-col gap-2.5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
            <FileText className="size-6 text-ink-muted" aria-hidden />
            <p className="text-[0.88rem] text-ink">Предложений пока нет</p>
            <p className="text-[0.78rem] text-ink-muted">
              Создайте КП с нуля или из заявки в списке заявок.
            </p>
          </div>
        ) : null}

        {items.map((item) => (
          <article
            key={item.public_id}
            className="rounded-xl border border-line bg-surface p-4 sm:p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Link
                    href={`/admin/proposals/${encodeURIComponent(item.public_id)}`}
                    className="font-mono text-[0.74rem] text-ink-muted hover:text-brand"
                  >
                    {item.public_id}
                  </Link>
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-[0.7rem] font-medium",
                      STATUS_STYLES[item.status] ?? "bg-surface-muted text-ink-muted",
                    )}
                  >
                    {PROPOSAL_STATUS_LABELS[item.status as ProposalStatus] ?? item.status}
                  </span>
                  {item.lead_public_id ? (
                    <span className="text-[0.7rem] text-ink-muted">
                      из заявки {item.lead_public_id}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-1.5 font-display text-[1rem] font-semibold text-ink">
                  <Link
                    href={`/admin/proposals/${encodeURIComponent(item.public_id)}`}
                    className="hover:text-brand"
                  >
                    {item.client_company || item.client_name || item.title}
                  </Link>
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] text-ink-muted">
                  {item.client_company && item.client_name ? <span>{item.client_name}</span> : null}
                  <span>{item.title}</span>
                  <span>{formatDate(item.created_at)}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-display text-[1rem] font-semibold text-ink">
                  {currency.format(item.total)}
                </span>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-line pt-2.5">
              <Link
                href={`/admin/proposals/${encodeURIComponent(item.public_id)}`}
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-[0.78rem] text-ink transition-colors hover:border-line-strong"
              >
                Открыть
                <ArrowUpRight className="size-3" aria-hidden />
              </Link>
              <Link
                href={`/admin/proposals/${encodeURIComponent(item.public_id)}/print`}
                target="_blank"
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-[0.78rem] text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
              >
                <Printer className="size-3.5" aria-hidden />
                PDF
              </Link>
              <button
                type="button"
                onClick={() => onDuplicate(item)}
                disabled={busy === item.public_id}
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-[0.78rem] text-ink-muted transition-colors hover:border-line-strong hover:text-ink disabled:opacity-60"
              >
                <Copy className="size-3.5" aria-hidden />
                Дублировать
              </button>
              <button
                type="button"
                onClick={() => onDelete(item)}
                disabled={busy === item.public_id}
                className="ml-auto inline-flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-[0.78rem] text-ink-muted transition-colors hover:border-[#e7b4b4] hover:text-[#b42525] disabled:opacity-60"
              >
                <Trash2 className="size-3.5" aria-hidden />
                Удалить
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
