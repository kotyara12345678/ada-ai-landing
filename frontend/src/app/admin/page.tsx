"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowUpRight,
  Loader2,
  LogOut,
  Mail,
  RefreshCw,
  Send,
  Inbox,
} from "lucide-react";
import {
  AdminApiError,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  type AdminLead,
  type LeadStatus,
  fetchLeads,
  fetchSession,
  logout,
  updateLeadStatus,
} from "@/lib/admin-api";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, string> = {
  new: "bg-[#e7ecff] text-[#1e4bff]",
  in_progress: "bg-[#fff4d6] text-[#8a5b00]",
  contacted: "bg-[#e3f7f4] text-[#0a7f73]",
  won: "bg-[#ecf8f2] text-[#128050]",
  lost: "bg-[#f1f2f4] text-[#5b6472]",
  spam: "bg-[#fdecec] text-[#b42525]",
};

function formatDate(value: string) {
  try {
    return new Date(value).toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return value;
  }
}

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [leads, setLeads] = useState<AdminLead[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  const load = useCallback(
    async (status: LeadStatus | "all") => {
      try {
        const response = await fetchLeads({
          status: status === "all" ? undefined : status,
          limit: 200,
        });
        setLeads(response.items);
        setTotal(response.total);
        setError(null);
      } catch (caught) {
        if (caught instanceof AdminApiError && caught.status === 401) {
          router.replace("/admin/login");
          return;
        }
        setError(caught instanceof Error ? caught.message : "Не удалось загрузить заявки");
      }
    },
    [router],
  );

  useEffect(() => {
    let active = true;

    async function boot() {
      try {
        const session = await fetchSession();
        if (!active) return;
        setEmail(session.email);
        await load("all");
      } catch (caught) {
        if (caught instanceof AdminApiError && caught.status === 401) {
          router.replace("/admin/login");
          return;
        }
        if (active) setError("Сервер недоступен. Обновите страницу позже.");
      } finally {
        if (active) setLoading(false);
      }
    }

    void boot();
    return () => {
      active = false;
    };
  }, [load, router]);

  async function onRefresh() {
    setRefreshing(true);
    await load(filter);
    setRefreshing(false);
  }

  async function onChangeStatus(lead: AdminLead, status: LeadStatus) {
    setUpdating(lead.public_id);
    try {
      const updated = await updateLeadStatus(lead.public_id, status);
      setLeads((items) =>
        items.map((item) => (item.public_id === lead.public_id ? updated : item)),
      );
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Не удалось изменить статус");
    } finally {
      setUpdating(null);
    }
  }

  async function onLogout() {
    try {
      await logout();
    } finally {
      router.replace("/admin/login");
    }
  }

  const stats = useMemo(() => {
    return {
      total,
      new: leads.filter((lead) => lead.status === "new").length,
      inProgress: leads.filter((lead) => lead.status === "in_progress").length,
      won: leads.filter((lead) => lead.status === "won").length,
    };
  }, [leads, total]);

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
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            ADA · админ-панель
          </p>
          <h1 className="mt-1 font-display text-[1.6rem] font-semibold tracking-tight text-ink">
            Заявки с сайта
          </h1>
          {email ? <p className="mt-1 text-[0.78rem] text-ink-muted">{email}</p> : null}
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
            onClick={onLogout}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 text-[0.82rem] text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            <LogOut className="size-3.5" aria-hidden />
            Выйти
          </button>
        </div>
      </header>

      <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {[
          { label: "Всего", value: stats.total },
          { label: "Новые", value: stats.new },
          { label: "В работе", value: stats.inProgress },
          { label: "Сделки", value: stats.won },
        ].map((card) => (
          <div key={card.label} className="rounded-xl border border-line bg-surface px-4 py-3">
            <p className="text-[0.72rem] uppercase tracking-[0.08em] text-ink-muted">{card.label}</p>
            <p className="mt-1 font-display text-[1.4rem] font-semibold text-ink">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {(["all", ...LEAD_STATUSES] as const).map((value) => (
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
            {value === "all" ? "Все" : LEAD_STATUS_LABELS[value]}
          </button>
        ))}
      </div>

      {error ? (
        <p className="mt-4 rounded-lg bg-[#fdecec] px-3 py-2 text-[0.8rem] text-[#b42525]">{error}</p>
      ) : null}

      <div className="mt-4 flex flex-col gap-2.5">
        {leads.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line bg-surface px-6 py-12 text-center">
            <Inbox className="size-6 text-ink-muted" aria-hidden />
            <p className="text-[0.88rem] text-ink">Заявок пока нет</p>
            <p className="text-[0.78rem] text-ink-muted">
              Как только форма на сайте отправит заявку, она появится здесь.
            </p>
          </div>
        ) : null}

        {leads.map((lead) => (
          <article key={lead.public_id} className="rounded-xl border border-line bg-surface p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[0.74rem] text-ink-muted">{lead.public_id}</span>
                  <span
                    className={cn(
                      "rounded-md px-1.5 py-0.5 text-[0.7rem] font-medium",
                      STATUS_STYLES[lead.status] ?? "bg-surface-muted text-ink-muted",
                    )}
                  >
                    {LEAD_STATUS_LABELS[lead.status as LeadStatus] ?? lead.status}
                  </span>
                  {lead.telegram_sent ? (
                    <span className="inline-flex items-center gap-1 text-[0.7rem] text-success">
                      <Send className="size-3" aria-hidden /> в Telegram
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-1.5 font-display text-[1rem] font-semibold text-ink">
                  {lead.name}
                </h2>
                <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] text-ink-muted">
                  <span>{lead.contact}</span>
                  {lead.email ? (
                    <a
                      href={`mailto:${lead.email}`}
                      className="inline-flex items-center gap-1 hover:text-brand"
                    >
                      <Mail className="size-3" aria-hidden />
                      {lead.email}
                    </a>
                  ) : null}
                  <span>{lead.direction}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[0.72rem] text-ink-muted">{formatDate(lead.created_at)}</span>
                <select
                  value={lead.status}
                  disabled={updating === lead.public_id}
                  onChange={(event) => onChangeStatus(lead, event.target.value as LeadStatus)}
                  className="h-8 rounded-lg border border-line bg-surface px-2 text-[0.78rem] text-ink outline-none focus:border-brand disabled:opacity-60"
                >
                  {LEAD_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {LEAD_STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p className="mt-3 whitespace-pre-line text-[0.86rem] leading-relaxed text-ink-muted">
              {lead.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-2.5 text-[0.74rem] text-ink-muted">
              {lead.budget ? <span>Бюджет: {lead.budget}</span> : null}
              {lead.deadline ? <span>Срок: {lead.deadline}</span> : null}
              <span>Источник: {lead.source}</span>
              {lead.page ? (
                <Link
                  href={lead.page}
                  className="inline-flex items-center gap-0.5 hover:text-brand"
                  target="_blank"
                >
                  {lead.page}
                  <ArrowUpRight className="size-3" aria-hidden />
                </Link>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
