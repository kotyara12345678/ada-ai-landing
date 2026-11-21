"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Printer } from "lucide-react";
import { AdminApiError } from "@/lib/admin-api";
import { PROPOSAL_STATUS_LABELS, fetchProposal, type ProposalDetail } from "@/lib/proposals-api";
import { currency } from "@/config/pricing";
import { scopeTotal } from "@/config/proposal-templates";

function formatDate(value: string | null) {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

function Paragraphs({ text }: { text: string }) {
  if (!text.trim()) return <p className="text-ink-muted">—</p>;
  return (
    <>
      {text.split(/\n{2,}/).map((block, index) => (
        <p key={index} className="whitespace-pre-line">
          {block}
        </p>
      ))}
    </>
  );
}

export default function ProposalPrintPage() {
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
          href={`/admin/proposals/${encodeURIComponent(publicId)}`}
          className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Вернуться к редактированию
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

  const content = proposal.content;
  const total = scopeTotal(content.scope);
  const clientLabel = proposal.client_company || proposal.client_name || "клиенту";
  const documentDate = formatDate(proposal.sent_at ?? proposal.created_at);

  return (
    <div className="min-h-dvh bg-surface-muted py-6 print:bg-white print:py-0">
      <div className="no-print mx-auto mb-4 flex w-full max-w-[820px] flex-wrap items-center justify-between gap-2 px-4">
        <Link
          href={`/admin/proposals/${encodeURIComponent(proposal.public_id)}`}
          className="inline-flex items-center gap-1.5 text-[0.82rem] text-ink-muted hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          К редактированию
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-[0.78rem] text-ink-muted">
            {PROPOSAL_STATUS_LABELS[proposal.status as keyof typeof PROPOSAL_STATUS_LABELS] ??
              proposal.status}
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink-deep px-3 text-[0.82rem] font-medium text-white transition-colors hover:bg-ink-soft"
          >
            <Printer className="size-3.5" aria-hidden />
            Печать / сохранить PDF
          </button>
        </div>
      </div>

      <article className="print-doc mx-auto w-full max-w-[820px] bg-white px-8 py-10 text-[0.86rem] leading-relaxed text-ink shadow-[0_24px_60px_-40px_rgba(10,15,26,0.5)] sm:px-12 print:px-0 print:py-0 print:shadow-none">
        <header className="flex items-start justify-between gap-6 border-b-2 border-ink pb-4">
          <div>
            <p className="font-display text-[1.5rem] font-bold tracking-tight">ADA</p>
            <p className="mt-0.5 text-[0.76rem] text-ink-muted">
              Сайты, автоматизация, AI-инструменты
            </p>
          </div>
          <div className="text-right text-[0.76rem] text-ink-muted">
            <p className="font-mono text-[0.8rem] text-ink">{proposal.public_id}</p>
            <p className="mt-0.5">{documentDate}</p>
          </div>
        </header>

        <div className="print-section mt-6">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-brand">
            Коммерческое предложение
          </p>
          <h1 className="mt-1.5 font-display text-[1.6rem] font-semibold tracking-tight">
            {proposal.title}
          </h1>
          <p className="mt-1 text-[0.9rem] text-ink-muted">Для {clientLabel}</p>
        </div>

        <section className="print-section mt-6 grid gap-3 rounded-lg border border-line bg-surface-muted px-4 py-3 sm:grid-cols-2 print:bg-white">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.08em] text-ink-muted">Клиент</p>
            <p className="mt-0.5 font-medium">{proposal.client_company || "—"}</p>
            <p className="text-ink-muted">{proposal.client_name || "—"}</p>
          </div>
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.08em] text-ink-muted">Контакты</p>
            <p className="mt-0.5">{proposal.client_contact || "—"}</p>
            <p className="text-ink-muted">{proposal.client_email || "—"}</p>
          </div>
        </section>

        <section className="print-section mt-6">
          <h2 className="font-display text-[1.05rem] font-semibold">1. Задача клиента</h2>
          <div className="mt-2 space-y-2 text-ink-muted">
            <Paragraphs text={content.problem} />
          </div>
        </section>

        <section className="print-section mt-6">
          <h2 className="font-display text-[1.05rem] font-semibold">2. Предлагаемое решение</h2>
          <div className="mt-2 space-y-2 text-ink-muted">
            <Paragraphs text={content.solution} />
          </div>
          {content.deliverables.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {content.deliverables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : null}
        </section>

        <section className="mt-6">
          <h2 className="print-section font-display text-[1.05rem] font-semibold">
            3. Состав работ и стоимость
          </h2>
          {content.scope.length === 0 ? (
            <p className="mt-2 text-ink-muted">Состав работ не заполнен.</p>
          ) : (
            <table className="print-table mt-2 w-full border-collapse text-[0.82rem]">
              <colgroup>
                <col style={{ width: "46%" }} />
                <col style={{ width: "12%" }} />
                <col style={{ width: "10%" }} />
                <col style={{ width: "16%" }} />
                <col style={{ width: "16%" }} />
              </colgroup>
              <thead>
                <tr className="border-b border-ink text-left">
                  <th className="py-1.5 pr-2 font-semibold">Работа</th>
                  <th className="py-1.5 px-2 text-right font-semibold">Кол-во</th>
                  <th className="py-1.5 px-2 font-semibold">Ед.</th>
                  <th className="py-1.5 px-2 text-right font-semibold">Цена</th>
                  <th className="py-1.5 pl-2 text-right font-semibold">Сумма</th>
                </tr>
              </thead>
              <tbody>
                {content.scope.map((item) => (
                  <tr key={item.id} className="border-b border-line">
                    <td className="py-1.5 pr-2">
                      <p className="font-medium">{item.title}</p>
                      {item.description ? (
                        <p className="text-[0.76rem] text-ink-muted">{item.description}</p>
                      ) : null}
                    </td>
                    <td className="py-1.5 px-2 text-right">{item.quantity}</td>
                    <td className="py-1.5 px-2">{item.unit}</td>
                    <td className="py-1.5 px-2 text-right">{currency.format(item.unit_price)}</td>
                    <td className="py-1.5 pl-2 text-right">
                      {currency.format(item.quantity * item.unit_price)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-ink">
                  <td className="py-2 pr-2 font-semibold" colSpan={4}>
                    Итого
                  </td>
                  <td className="py-2 pl-2 text-right font-display text-[1rem] font-semibold">
                    {currency.format(total)}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
          <p className="mt-2 text-[0.76rem] text-ink-muted">
            Цены зафиксированы в документе на дату формирования. Итоговая стоимость
            подтверждается после согласования состава работ.
          </p>
        </section>

        {content.stages.length > 0 ? (
          <section className="mt-6">
            <h2 className="print-section font-display text-[1.05rem] font-semibold">
              4. Этапы реализации
            </h2>
            <table className="print-table mt-2 w-full border-collapse text-[0.82rem]">
              <colgroup>
                <col style={{ width: "8%" }} />
                <col style={{ width: "46%" }} />
                <col style={{ width: "22%" }} />
                <col style={{ width: "24%" }} />
              </colgroup>
              <thead>
                <tr className="border-b border-ink text-left">
                  <th className="py-1.5 pr-2 font-semibold">№</th>
                  <th className="py-1.5 px-2 font-semibold">Этап</th>
                  <th className="py-1.5 px-2 font-semibold">Результат</th>
                  <th className="py-1.5 pl-2 font-semibold">Срок</th>
                </tr>
              </thead>
              <tbody>
                {content.stages.map((stage, index) => (
                  <tr key={index} className="border-b border-line">
                    <td className="py-1.5 pr-2">{index + 1}</td>
                    <td className="py-1.5 px-2 font-medium">{stage.title}</td>
                    <td className="py-1.5 px-2 text-ink-muted">{stage.description || "—"}</td>
                    <td className="py-1.5 pl-2">{stage.duration || "по согласованию"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : null}

        <section className="print-section mt-6">
          <h2 className="font-display text-[1.05rem] font-semibold">
            {content.stages.length > 0 ? "5" : "4"}. Условия оплаты
          </h2>
          <div className="mt-2 space-y-2 text-ink-muted">
            <Paragraphs text={content.payment_terms} />
          </div>
        </section>

        {content.notes.trim() ? (
          <section className="print-section mt-6">
            <h2 className="font-display text-[1.05rem] font-semibold">
              {content.stages.length > 0 ? "6" : "5"}. Примечания
            </h2>
            <div className="mt-2 space-y-2 text-ink-muted">
              <Paragraphs text={content.notes} />
            </div>
          </section>
        ) : null}

        <footer className="print-section mt-8 flex flex-wrap items-end justify-between gap-3 border-t border-line pt-4 text-[0.78rem] text-ink-muted">
          <div>
            <p className="font-medium text-ink">ADA · команда разработки</p>
            <p>Telegram: @Savvachca</p>
            <p>Почта: savva.toch@gmail.com</p>
          </div>
          <p className="font-mono text-[0.72rem]">{proposal.public_id}</p>
        </footer>
      </article>
    </div>
  );
}
