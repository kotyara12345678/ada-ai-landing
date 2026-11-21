"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  CheckCheck,
  Loader2,
  Plus,
  Printer,
  Save,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { currency } from "@/config/pricing";
import { PROPOSAL_TEMPLATE, newCustomScopeItem, newScopeItemFromCatalog, proposalCatalog, scopeTotal } from "@/config/proposal-templates";
import { AdminApiError } from "@/lib/admin-api";
import {
  PROPOSAL_STATUS_LABELS,
  saveProposal,
  sendProposal,
  type ProposalContent,
  type ProposalDetail,
  type ProposalScopeItem,
  type ProposalStatus,
} from "@/lib/proposals-api";

type Draft = {
  title: string;
  client_company: string;
  client_name: string;
  client_contact: string;
  client_email: string;
  content: ProposalContent;
};

type SaveState = "saved" | "dirty" | "saving" | "error" | "conflict";

const SAVE_LABELS: Record<SaveState, string> = {
  saved: "Все изменения сохранены",
  dirty: "Есть несохранённые изменения",
  saving: "Сохраняем…",
  error: "Не удалось сохранить",
  conflict: "Конфликт версий",
};

const LOCAL_PREFIX = "ada-proposal-draft:";
const AUTOSAVE_DELAY = 1200;

const inputClass =
  "h-10 w-full rounded-lg border border-line bg-surface px-3 text-[0.88rem] text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-brand";
const textareaClass =
  "w-full rounded-lg border border-line bg-surface px-3 py-2.5 text-[0.88rem] leading-relaxed text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-brand";

function toDraft(proposal: ProposalDetail): Draft {
  return {
    title: proposal.title,
    client_company: proposal.client_company,
    client_name: proposal.client_name,
    client_contact: proposal.client_contact,
    client_email: proposal.client_email,
    content: proposal.content,
  };
}

function formatDate(value: string | null): string {
  if (!value) return "—";
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

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-line bg-surface p-4 sm:p-5">
      <div className="mb-3">
        <h2 className="font-display text-[1rem] font-semibold text-ink">{title}</h2>
        {hint ? <p className="mt-0.5 text-[0.76rem] text-ink-muted">{hint}</p> : null}
      </div>
      {children}
    </section>
  );
}

export default function ProposalEditor({ initial }: { initial: ProposalDetail }) {
  const router = useRouter();
  const localKey = `${LOCAL_PREFIX}${initial.public_id}`;

  const [draft, setDraft] = useState<Draft>(() => toDraft(initial));
  const [status, setStatus] = useState<ProposalStatus>(initial.status as ProposalStatus);
  const [sentAt, setSentAt] = useState(initial.sent_at);
  const [revision, setRevision] = useState(initial.revision);
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [notice, setNotice] = useState<string | null>(null);
  const [recovered, setRecovered] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);

  const draftRef = useRef(draft);
  const savedRef = useRef<Draft>(toDraft(initial));
  const revisionRef = useRef(initial.revision);
  const saveStateRef = useRef<SaveState>("saved");
  const savingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const flushRef = useRef<() => Promise<void>>(async () => {});

  const markSaveState = useCallback((state: SaveState) => {
    saveStateRef.current = state;
    setSaveState(state);
  }, []);

  const total = useMemo(() => scopeTotal(draft.content.scope), [draft.content.scope]);

  // Локальная копия на случай закрытия вкладки до сохранения на сервере.
  const persistLocal = useCallback(
    (value: Draft) => {
      if (persistTimerRef.current) clearTimeout(persistTimerRef.current);
      persistTimerRef.current = setTimeout(() => {
        try {
          window.localStorage.setItem(
            localKey,
            JSON.stringify({ revision: revisionRef.current, savedAt: Date.now(), draft: value }),
          );
        } catch {
          // Хранилище может быть недоступно — автосохранение на сервере продолжает работать.
        }
      }, 400);
    },
    [localKey],
  );

  const flush = useCallback(async () => {
    const current = draftRef.current;
    if (JSON.stringify(current) === JSON.stringify(savedRef.current)) {
      markSaveState("saved");
      return;
    }
    if (savingRef.current) return;
    // После конфликта не перезаписываем чужую версию автоматически.
    if (saveStateRef.current === "conflict") return;

    savingRef.current = true;
    markSaveState("saving");
    setNotice(null);

    try {
      const updated = await saveProposal(initial.public_id, {
        revision: revisionRef.current,
        title: current.title,
        client_company: current.client_company,
        client_name: current.client_name,
        client_contact: current.client_contact,
        client_email: current.client_email,
        content: current.content,
      });

      revisionRef.current = updated.revision;
      setRevision(updated.revision);
      setStatus(updated.status as ProposalStatus);
      savedRef.current = current;

      if (JSON.stringify(draftRef.current) === JSON.stringify(current)) {
        markSaveState("saved");
        try {
          window.localStorage.removeItem(localKey);
        } catch {
          // не критично
        }
      } else {
        markSaveState("dirty");
      }
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) {
        router.replace("/admin/login");
        return;
      }
      if (caught instanceof AdminApiError && caught.status === 409) {
        markSaveState("conflict");
        setNotice(
          "Документ изменён в другой вкладке. Черновик сохранён в браузере — обновите страницу, чтобы не потерять чужие правки.",
        );
        return;
      }
      markSaveState("error");
      setNotice(caught instanceof Error ? caught.message : "Не удалось сохранить КП");
    } finally {
      savingRef.current = false;
      // Пока шёл запрос, пользователь мог продолжить печатать.
      if (
        JSON.stringify(draftRef.current) !== JSON.stringify(savedRef.current) &&
        saveStateRef.current === "dirty"
      ) {
        timerRef.current = setTimeout(() => {
          void flushRef.current();
        }, AUTOSAVE_DELAY);
      }
    }
  }, [initial.public_id, localKey, markSaveState, router]);

  useEffect(() => {
    flushRef.current = flush;
  }, [flush]);

  // Автосохранение с задержкой после последней правки.
  useEffect(() => {
    draftRef.current = draft;
    if (JSON.stringify(draft) === JSON.stringify(savedRef.current)) {
      markSaveState("saved");
      return;
    }

    markSaveState("dirty");
    persistLocal(draft);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      void flushRef.current();
    }, AUTOSAVE_DELAY);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [draft, markSaveState, persistLocal]);

  // Предупреждение при закрытии вкладки с несохранёнными правками.
  useEffect(() => {
    function onBeforeUnload(event: BeforeUnloadEvent) {
      if (saveStateRef.current === "dirty" || saveStateRef.current === "saving") {
        event.preventDefault();
        event.returnValue = "";
      }
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, []);

  // Восстановление черновика, если вкладку закрыли до автосохранения.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(localKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as { revision?: number; draft?: Draft };
      if (!parsed.draft) return;
      if ((parsed.revision ?? 0) < initial.revision) return;
      if (JSON.stringify(parsed.draft) === JSON.stringify(toDraft(initial))) {
        window.localStorage.removeItem(localKey);
        return;
      }
      setRecovered(parsed.draft);
    } catch {
      // повреждённая запись не должна мешать редактированию
    }
  }, [initial, localKey]);

  function updateDraft(updater: (current: Draft) => Draft) {
    setDraft((current) => updater(current));
  }

  function setField<K extends keyof Draft>(key: K, value: Draft[K]) {
    updateDraft((current) => ({ ...current, [key]: value }));
  }

  function setContent<K extends keyof ProposalContent>(key: K, value: ProposalContent[K]) {
    updateDraft((current) => ({ ...current, content: { ...current.content, [key]: value } }));
  }

  function updateScopeItem(id: string, patch: Partial<ProposalScopeItem>) {
    updateDraft((current) => ({
      ...current,
      content: {
        ...current.content,
        scope: current.content.scope.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      },
    }));
  }

  function removeScopeItem(id: string) {
    updateDraft((current) => ({
      ...current,
      content: {
        ...current.content,
        scope: current.content.scope.filter((item) => item.id !== id),
      },
    }));
  }

  async function onSaveNow() {
    if (timerRef.current) clearTimeout(timerRef.current);
    await flushRef.current();
  }

  async function onChangeStatus(next: "draft" | "accepted" | "rejected") {
    setBusy(true);
    setNotice(null);
    try {
      await flushRef.current();
      const updated = await saveProposal(initial.public_id, {
        revision: revisionRef.current,
        status: next,
      });
      revisionRef.current = updated.revision;
      setRevision(updated.revision);
      setStatus(updated.status as ProposalStatus);
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) {
        router.replace("/admin/login");
        return;
      }
      setNotice(caught instanceof Error ? caught.message : "Не удалось изменить статус");
    } finally {
      setBusy(false);
    }
  }

  async function onSend() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBusy(true);
    setNotice(null);
    try {
      await flushRef.current();
      if (saveStateRef.current !== "saved") {
        setNotice("Сначала нужно сохранить изменения, затем фиксируйте отправку.");
        return;
      }
      const confirmed = window.confirm(
        "Зафиксировать текущую версию как отправленную клиенту? Последующие правки не изменят сохранённую копию.",
      );
      if (!confirmed) return;

      const updated = await sendProposal(initial.public_id);
      setStatus(updated.status as ProposalStatus);
      setSentAt(updated.sent_at);
      setNotice("Версия отправлена: копия документа сохранена в КП.");
    } catch (caught) {
      if (caught instanceof AdminApiError && caught.status === 401) {
        router.replace("/admin/login");
        return;
      }
      setNotice(caught instanceof Error ? caught.message : "Не удалось зафиксировать отправку");
    } finally {
      setBusy(false);
    }
  }

  const printHref = `/admin/proposals/${encodeURIComponent(initial.public_id)}/print`;

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Link
          href="/admin/proposals"
          className="inline-flex items-center gap-1.5 text-[0.8rem] text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft className="size-3.5" aria-hidden />
          Все предложения
        </Link>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onSaveNow}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 text-[0.82rem] text-ink transition-colors hover:border-line-strong disabled:opacity-60"
            disabled={busy || saveState === "saving"}
          >
            <Save className="size-3.5" aria-hidden />
            Сохранить
          </button>
          <Link
            href={printHref}
            target="_blank"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-ink-deep px-3 text-[0.82rem] font-medium text-white transition-colors hover:bg-ink-soft"
          >
            <Printer className="size-3.5" aria-hidden />
            PDF / печать
          </Link>
        </div>
      </div>

      <header className="mt-4 flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
        <div>
          <p className="font-mono text-[0.74rem] text-ink-muted">{initial.public_id}</p>
          <h1 className="mt-1 font-display text-[1.35rem] font-semibold tracking-tight text-ink">
            {draft.title || "Коммерческое предложение"}
          </h1>
          <p className="mt-1 text-[0.78rem] text-ink-muted">
            Шаблон «{PROPOSAL_TEMPLATE.name}» · ревизия {revision}
            {sentAt ? ` · отправлено ${formatDate(sentAt)}` : ""}
          </p>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[0.75rem] font-medium",
            saveState === "saved" && "bg-[#ecf8f2] text-[#128050]",
            saveState === "saving" && "bg-[#e7ecff] text-[#1e4bff]",
            saveState === "dirty" && "bg-[#fff4d6] text-[#8a5b00]",
            (saveState === "error" || saveState === "conflict") && "bg-[#fdecec] text-[#b42525]",
          )}
        >
          {saveState === "saving" ? (
            <Loader2 className="size-3 animate-spin" aria-hidden />
          ) : saveState === "saved" ? (
            <Check className="size-3" aria-hidden />
          ) : (
            <AlertTriangle className="size-3" aria-hidden />
          )}
          {SAVE_LABELS[saveState]}
        </span>
      </header>

      {notice ? (
        <p className="mt-3 rounded-lg bg-[#fdecec] px-3 py-2 text-[0.8rem] text-[#b42525]">
          {notice}
        </p>
      ) : null}

      {recovered ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-[#f0d9a8] bg-[#fff4d6] px-3 py-2 text-[0.8rem] text-[#8a5b00]">
          <span>Найдена несохранённая версия из этой вкладки.</span>
          <span className="flex gap-2">
            <button
              type="button"
              className="rounded-md bg-[#8a5b00] px-2.5 py-1 text-[0.76rem] font-medium text-white"
              onClick={() => {
                setDraft(recovered);
                setRecovered(null);
              }}
            >
              Восстановить
            </button>
            <button
              type="button"
              className="rounded-md border border-[#e5c98f] px-2.5 py-1 text-[0.76rem]"
              onClick={() => {
                setRecovered(null);
                try {
                  window.localStorage.removeItem(localKey);
                } catch {
                  // не критично
                }
              }}
            >
              Отклонить
            </button>
          </span>
        </div>
      ) : null}

      <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_290px]">
        <div className="flex flex-col gap-4">
          <Section title="Клиент" hint="Название компании и контакт попадут в шапку документа.">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5">
                <span className="text-[0.76rem] font-medium text-ink">Название КП</span>
                <input
                  className={inputClass}
                  value={draft.title}
                  onChange={(event) => setField("title", event.target.value)}
                  maxLength={200}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[0.76rem] font-medium text-ink">Компания</span>
                <input
                  className={inputClass}
                  value={draft.client_company}
                  onChange={(event) => setField("client_company", event.target.value)}
                  placeholder="ООО «Клиент»"
                  maxLength={200}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[0.76rem] font-medium text-ink">Контактное лицо</span>
                <input
                  className={inputClass}
                  value={draft.client_name}
                  onChange={(event) => setField("client_name", event.target.value)}
                  placeholder="Имя"
                  maxLength={160}
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[0.76rem] font-medium text-ink">Телефон / Telegram</span>
                <input
                  className={inputClass}
                  value={draft.client_contact}
                  onChange={(event) => setField("client_contact", event.target.value)}
                  placeholder="@username"
                  maxLength={200}
                />
              </label>
              <label className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-[0.76rem] font-medium text-ink">Почта</span>
                <input
                  className={inputClass}
                  value={draft.client_email}
                  onChange={(event) => setField("client_email", event.target.value)}
                  placeholder="client@example.com"
                  maxLength={200}
                />
              </label>
            </div>
          </Section>

          <Section title="Проблема клиента" hint="Что происходит сейчас и почему это стоит денег.">
            <textarea
              className={cn(textareaClass, "min-h-28")}
              value={draft.content.problem}
              maxLength={4000}
              onChange={(event) => setContent("problem", event.target.value)}
            />
          </Section>

          <Section title="Предлагаемое решение" hint="Что именно делаем и какой результат получает клиент.">
            <textarea
              className={cn(textareaClass, "min-h-32")}
              value={draft.content.solution}
              maxLength={4000}
              onChange={(event) => setContent("solution", event.target.value)}
            />
            <div className="mt-3">
              <p className="text-[0.76rem] font-medium text-ink">Что входит в результат</p>
              <div className="mt-1.5 flex flex-col gap-1.5">
                {draft.content.deliverables.map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      className={inputClass}
                      value={value}
                      maxLength={300}
                      onChange={(event) => {
                        const next = [...draft.content.deliverables];
                        next[index] = event.target.value;
                        setContent("deliverables", next);
                      }}
                    />
                    <button
                      type="button"
                      aria-label="Удалить пункт"
                      className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-line text-ink-muted hover:text-ink"
                      onClick={() =>
                        setContent(
                          "deliverables",
                          draft.content.deliverables.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="mt-2 inline-flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-[0.78rem] text-ink-muted hover:text-ink"
                onClick={() => setContent("deliverables", [...draft.content.deliverables, ""])}
              >
                <Plus className="size-3.5" aria-hidden />
                Добавить пункт
              </button>
            </div>
          </Section>

          <Section
            title="Состав работ и стоимость"
            hint="Цены фиксируются в момент добавления позиции. Итог считается автоматически."
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <select
                className="h-9 rounded-lg border border-line bg-surface px-2 text-[0.82rem] text-ink outline-none focus:border-brand"
                value=""
                onChange={(event) => {
                  const item = proposalCatalog.find((entry) => entry.id === event.target.value);
                  if (!item) return;
                  setContent("scope", [...draft.content.scope, newScopeItemFromCatalog(item)]);
                }}
              >
                <option value="">Добавить из каталога…</option>
                {proposalCatalog.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.title} — {currency.format(item.price)}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1 rounded-lg border border-line px-2.5 text-[0.8rem] text-ink-muted hover:text-ink"
                onClick={() => setContent("scope", [...draft.content.scope, newCustomScopeItem()])}
              >
                <Plus className="size-3.5" aria-hidden />
                Своя позиция
              </button>
            </div>

            {draft.content.scope.length === 0 ? (
              <p className="rounded-lg border border-dashed border-line px-3 py-6 text-center text-[0.82rem] text-ink-muted">
                Позиций пока нет. Добавьте работы из каталога или свою строку.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-[0.82rem]">
                  <thead>
                    <tr className="border-b border-line text-left text-[0.72rem] uppercase tracking-[0.06em] text-ink-muted">
                      <th className="px-2 py-2 font-medium">Позиция</th>
                      <th className="w-20 px-2 py-2 font-medium">Кол-во</th>
                      <th className="w-24 px-2 py-2 font-medium">Ед.</th>
                      <th className="w-32 px-2 py-2 font-medium">Цена, ₽</th>
                      <th className="w-28 px-2 py-2 font-medium">Сумма</th>
                      <th className="w-10 px-2 py-2" />
                    </tr>
                  </thead>
                  <tbody>
                    {draft.content.scope.map((item) => (
                      <tr key={item.id} className="border-b border-line/70 align-top">
                        <td className="px-2 py-2">
                          <input
                            className={cn(inputClass, "h-9")}
                            value={item.title}
                            maxLength={200}
                            onChange={(event) =>
                              updateScopeItem(item.id, { title: event.target.value })
                            }
                          />
                          <input
                            className={cn(inputClass, "mt-1 h-8 text-[0.78rem]")}
                            value={item.description}
                            placeholder="Короткое описание"
                            maxLength={1000}
                            onChange={(event) =>
                              updateScopeItem(item.id, { description: event.target.value })
                            }
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            min={1}
                            max={1000}
                            className={cn(inputClass, "h-9")}
                            value={item.quantity}
                            onChange={(event) =>
                              updateScopeItem(item.id, {
                                quantity: Math.min(1000, Math.max(1, Number(event.target.value) || 1)),
                              })
                            }
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            className={cn(inputClass, "h-9")}
                            value={item.unit}
                            maxLength={20}
                            onChange={(event) =>
                              updateScopeItem(item.id, { unit: event.target.value })
                            }
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            min={0}
                            step={100}
                            className={cn(inputClass, "h-9")}
                            value={item.unit_price}
                            onChange={(event) =>
                              updateScopeItem(item.id, {
                                unit_price: Math.max(0, Number(event.target.value) || 0),
                              })
                            }
                          />
                        </td>
                        <td className="px-2 py-2 pt-4 font-medium text-ink">
                          {currency.format(item.quantity * item.unit_price)}
                        </td>
                        <td className="px-2 py-2 pt-3">
                          <button
                            type="button"
                            aria-label="Удалить позицию"
                            className="flex size-8 items-center justify-center rounded-lg border border-line text-ink-muted hover:text-ink"
                            onClick={() => removeScopeItem(item.id)}
                          >
                            <Trash2 className="size-3.5" aria-hidden />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between rounded-lg bg-surface-muted px-3 py-2.5">
              <span className="text-[0.82rem] font-medium text-ink">Итого</span>
              <span className="font-display text-[1.15rem] font-semibold text-ink">
                {currency.format(total)}
              </span>
            </div>
          </Section>

          <Section title="Этапы реализации">
            <div className="flex flex-col gap-2.5">
              {draft.content.stages.map((stage, index) => (
                <div key={index} className="rounded-lg border border-line p-3">
                  <div className="flex gap-2">
                    <input
                      className={inputClass}
                      value={stage.title}
                      maxLength={160}
                      placeholder="Название этапа"
                      onChange={(event) => {
                        const next = [...draft.content.stages];
                        next[index] = { ...stage, title: event.target.value };
                        setContent("stages", next);
                      }}
                    />
                    <input
                      className={cn(inputClass, "w-40 shrink-0")}
                      value={stage.duration}
                      maxLength={80}
                      placeholder="Срок"
                      onChange={(event) => {
                        const next = [...draft.content.stages];
                        next[index] = { ...stage, duration: event.target.value };
                        setContent("stages", next);
                      }}
                    />
                    <button
                      type="button"
                      aria-label="Удалить этап"
                      className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-line text-ink-muted hover:text-ink"
                      onClick={() =>
                        setContent(
                          "stages",
                          draft.content.stages.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <Trash2 className="size-3.5" aria-hidden />
                    </button>
                  </div>
                  <textarea
                    className={cn(textareaClass, "mt-2 min-h-16 text-[0.82rem]")}
                    value={stage.description}
                    maxLength={1000}
                    placeholder="Что происходит на этапе"
                    onChange={(event) => {
                      const next = [...draft.content.stages];
                      next[index] = { ...stage, description: event.target.value };
                      setContent("stages", next);
                    }}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              className="mt-2 inline-flex h-8 items-center gap-1 rounded-lg border border-line px-2.5 text-[0.78rem] text-ink-muted hover:text-ink"
              onClick={() =>
                setContent("stages", [
                  ...draft.content.stages,
                  { title: "Новый этап", duration: "по согласованию", description: "" },
                ])
              }
            >
              <Plus className="size-3.5" aria-hidden />
              Добавить этап
            </button>
          </Section>

          <Section title="Условия оплаты">
            <textarea
              className={cn(textareaClass, "min-h-24")}
              value={draft.content.payment_terms}
              maxLength={2000}
              onChange={(event) => setContent("payment_terms", event.target.value)}
            />
          </Section>

          <Section title="Примечания" hint="Что оплачивается отдельно и как согласуются изменения.">
            <textarea
              className={cn(textareaClass, "min-h-24")}
              value={draft.content.notes}
              maxLength={2000}
              onChange={(event) => setContent("notes", event.target.value)}
            />
          </Section>
        </div>

        <aside className="flex flex-col gap-3 lg:sticky lg:top-4">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="text-[0.72rem] uppercase tracking-[0.08em] text-ink-muted">Сумма КП</p>
            <p className="mt-1 font-display text-[1.6rem] font-semibold text-ink">
              {currency.format(total)}
            </p>
            <p className="mt-1 text-[0.74rem] text-ink-muted">
              Позиций: {draft.content.scope.length}. Итог пересчитывается на сервере.
            </p>
          </div>

          <div className="rounded-xl border border-line bg-surface p-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-[0.78rem] font-medium text-ink">Статус</span>
              <select
                className="h-10 rounded-lg border border-line bg-surface px-2 text-[0.85rem] text-ink outline-none focus:border-brand"
                value={status}
                disabled={busy || status === "sent"}
                onChange={(event) =>
                  void onChangeStatus(event.target.value as "draft" | "accepted" | "rejected")
                }
              >
                <option value="draft">{PROPOSAL_STATUS_LABELS.draft}</option>
                <option value="sent">{PROPOSAL_STATUS_LABELS.sent}</option>
                <option value="accepted">{PROPOSAL_STATUS_LABELS.accepted}</option>
                <option value="rejected">{PROPOSAL_STATUS_LABELS.rejected}</option>
              </select>
            </label>
            <p className="mt-2 text-[0.74rem] text-ink-muted">
              Статус «Отправлено» ставится кнопкой ниже — вместе с копией версии документа.
            </p>
            <p className="mt-1 text-[0.74rem] text-ink-muted">Отправлено: {formatDate(sentAt)}</p>
          </div>

          <button
            type="button"
            onClick={onSend}
            disabled={busy || saveState === "conflict"}
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg bg-ink-deep px-3 text-[0.84rem] font-semibold text-white transition-colors hover:bg-ink-soft disabled:opacity-60"
          >
            <CheckCheck className="size-4" aria-hidden />
            Зафиксировать отправку
          </button>
        </aside>
      </div>
    </div>
  );
}
