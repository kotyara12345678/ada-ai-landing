"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Loader2, Send, Sparkles, X } from "lucide-react";
import { API_BASE, fetchChatStatus, type ChatStatus } from "@/lib/api";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  leadId?: string;
};

const GREETING =
  "Здравствуйте! Я AI-консультант технологической команды. Помогу выбрать между разработкой нового продукта и обслуживанием существующего, объясню состав тарифов и сориентирую по стоимости. Что вам ближе: создать новое решение или взять на сопровождение то, что уже работает?";

const SUGGESTIONS = [
  "Нужен новый сайт или сервис",
  "Уже есть проект — нужно обслуживание",
  "Что входит в тариф Business?",
  "Сколько стоит поддержка сервера?",
];

let messageCounter = 0;
function nextId(): string {
  messageCounter += 1;
  return `m${Date.now()}-${messageCounter}`;
}

export function AIConsultant() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: "greeting", role: "assistant", content: GREETING },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<ChatStatus | null>(null);
  const [statusLoaded, setStatusLoaded] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    fetchChatStatus().then((value) => {
      if (!cancelled) {
        setStatus(value);
        setStatusLoaded(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Восстанавливаем историю в рамках сессии
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("ada-chat-history");
      if (saved) {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // storage может быть недоступен — не критично
    }
  }, []);

  useEffect(() => {
    if (messages.length <= 1) return;
    try {
      sessionStorage.setItem("ada-chat-history", JSON.stringify(messages.slice(-30)));
    } catch {
      // игнорируем переполнение storage
    }
  }, [messages]);

  useEffect(() => {
    if (!open) return;
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, open, streaming]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 250);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || streaming) return;

      setError(null);
      const userMessage: ChatMessage = { id: nextId(), role: "user", content: trimmed };
      const assistantMessage: ChatMessage = { id: nextId(), role: "assistant", content: "" };
      const history = [...messages, userMessage];

      setMessages([...history, assistantMessage]);
      setInput("");
      setStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const response = await fetch(`${API_BASE}/chat/stream`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            page: pathname,
            messages: history.slice(-16).map((message) => ({
              role: message.role,
              content: message.content,
            })),
          }),
        });

        if (!response.ok || !response.body) {
          if (response.status === 429) {
            throw new Error("Слишком много сообщений. Подождите минуту или напишите нам в Telegram.");
          }
          if (response.status === 503) {
            throw new Error(
              "AI-консультант временно недоступен. Оставьте заявку через форму — ответим напрямую.",
            );
          }
          throw new Error("Не удалось получить ответ. Попробуйте ещё раз.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let acc = "";

        const handleEvent = (raw: string) => {
          const lines = raw.split("\n");
          let eventName = "message";
          let data = "";
          for (const line of lines) {
            if (line.startsWith("event:")) eventName = line.slice(6).trim();
            if (line.startsWith("data:")) data += line.slice(5).trim();
          }
          if (!data) return;
          let parsed: { type?: string; content?: string; message?: string; public_id?: string };
          try {
            parsed = JSON.parse(data) as typeof parsed;
          } catch {
            return;
          }
          if (eventName === "delta" || parsed.type === "delta") {
            acc += parsed.content ?? "";
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantMessage.id ? { ...message, content: acc } : message,
              ),
            );
          } else if (eventName === "lead" || parsed.type === "lead") {
            const leadId = parsed.public_id;
            setMessages((prev) =>
              prev.map((message) =>
                message.id === assistantMessage.id ? { ...message, leadId } : message,
              ),
            );
          } else if (eventName === "error" || parsed.type === "error") {
            setError(parsed.message ?? "Ошибка генерации ответа.");
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const chunks = buffer.split("\n\n");
          buffer = chunks.pop() ?? "";
          for (const chunk of chunks) handleEvent(chunk);
        }
        if (buffer.trim()) handleEvent(buffer);

        if (!acc) {
          setMessages((prev) =>
            prev.map((message) =>
              message.id === assistantMessage.id
                ? {
                    ...message,
                    content:
                      "Не удалось сформировать ответ. Уточните вопрос или оставьте заявку — обсудим детали напрямую.",
                  }
                : message,
            ),
          );
        }
      } catch (caught) {
        if ((caught as Error).name === "AbortError") return;
        setError(caught instanceof Error ? caught.message : "Ошибка соединения.");
        setMessages((prev) => prev.filter((message) => message.id !== assistantMessage.id));
      } finally {
        setStreaming(false);
        abortRef.current = null;
      }
    },
    [messages, pathname, streaming],
  );

  const disabled = statusLoaded && status !== null && !status.enabled;

  return (
    <>
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 md:bottom-6 md:right-6">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Закрыть AI-консультанта" : "Открыть AI-консультанта"}
          className="group relative flex size-13 items-center justify-center rounded-full bg-lime text-ink shadow-[0_10px_30px_-10px_rgba(216,244,92,0.7)] transition-colors hover:bg-[#c9e84f]"
        >
          {open ? (
            <X className="size-5" aria-hidden />
          ) : (
            <Sparkles className="size-5" aria-hidden />
          )}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-40 flex h-[86dvh] flex-col overflow-hidden rounded-t-2xl border border-line bg-surface shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[min(38rem,80vh)] sm:w-[24.5rem] sm:rounded-2xl"
            role="dialog"
            aria-label="AI-консультант"
          >
            <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-ink-deep px-4 py-3.5 text-white">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-white/10">
                  <Sparkles className="size-4 text-lime" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.88rem] font-semibold text-white">AI-консультант</p>
                  <p className="flex items-center gap-1.5 text-[0.72rem] text-white/50">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        disabled ? "bg-amber-500" : streaming ? "bg-lime animate-pulse" : "bg-lime",
                      )}
                    />
                    {disabled ? "офлайн" : streaming ? "печатает" : "на связи"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть чат"
                className="flex size-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>

            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[0.85rem] leading-relaxed",
                      message.role === "user"
                        ? "rounded-br-sm bg-ink text-white"
                        : "rounded-bl-sm border border-line bg-surface-muted text-ink",
                    )}
                  >
                    {message.content || (
                      <span className="flex items-center gap-1.5 text-ink-muted">
                        <Loader2 className="size-3.5 animate-spin" aria-hidden />
                        Думаю…
                      </span>
                    )}
                    {message.leadId ? (
                      <span className="mt-2 block rounded-lg border border-success/30 bg-success-soft px-2.5 py-1.5 text-[0.74rem] font-medium text-success">
                        Заявка № {message.leadId} создана
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}

              {error ? (
                <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2.5 text-[0.78rem] leading-relaxed text-amber-800">
                  {error}
                  {error.includes("недоступен") ? (
                    <Link href="/contacts#form" className="mt-1 block text-brand underline underline-offset-2">
                      Перейти к форме заявки
                    </Link>
                  ) : null}
                </div>
              ) : null}

              {messages.length === 1 ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-lg border border-line px-3 py-1.5 text-left text-[0.76rem] text-ink-muted transition-colors hover:border-brand/40 hover:text-brand"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}

              <div ref={bottomRef} />
            </div>

            <div className="border-t border-line bg-surface-muted px-3 pb-3 pt-2.5">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  send(input);
                }}
                className="flex items-end gap-2"
              >
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  maxLength={2000}
                  disabled={disabled}
                  placeholder={disabled ? "AI-консультант не настроен" : "Опишите задачу…"}
                  aria-label="Сообщение для AI-консультанта"
                  className="max-h-28 min-h-10 flex-1 resize-none rounded-lg border border-line-strong bg-surface px-3 py-2.5 text-[0.85rem] text-ink outline-none transition-colors placeholder:text-ink-muted/60 focus:border-brand disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={streaming || disabled || !input.trim()}
                  aria-label="Отправить сообщение"
                  className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-ink text-lime transition-opacity disabled:opacity-40"
                >
                  {streaming ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : input.trim() ? (
                    <ArrowUp className="size-4" aria-hidden />
                  ) : (
                    <Send className="size-4" aria-hidden />
                  )}
                </button>
              </form>
              <p className="mt-2 text-center text-[0.68rem] leading-snug text-ink-muted">
                Оценка предварительная и не является коммерческим предложением.{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-brand">
                  Политика
                </Link>
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
