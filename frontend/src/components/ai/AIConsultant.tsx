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
  "Здравствуйте! Я AI-консультант команды разработки. Помогу разобраться с вашей задачей, подобрать подходящее решение и сориентировать по стоимости. Что планируете разработать?";

const SUGGESTIONS = [
  "Сколько стоит Telegram-бот?",
  "Нужен AI-агент для поддержки",
  "Хочу автоматизировать заявки",
  "Нужен сайт для компании",
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
        <AnimatePresence>
          {open ? null : (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="hidden md:block"
            >
              <span className="rounded-full border border-muted/20 bg-graphite/90 px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted backdrop-blur">
                AI-консультант
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? "Закрыть AI-консультанта" : "Открыть AI-консультанта"}
          className="group relative flex size-14 items-center justify-center rounded-full bg-emerald text-graphite shadow-[0_10px_40px_-12px_rgba(32,201,130,0.55)] transition-transform hover:scale-105 active:scale-95"
        >
          {open ? (
            <X className="size-5" aria-hidden />
          ) : (
            <>
              <span className="absolute inset-0 rounded-full border border-emerald/40 animate-ping opacity-20" aria-hidden />
              <Sparkles className="size-5" aria-hidden />
            </>
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
            className="fixed inset-x-0 bottom-0 z-40 flex h-[86dvh] flex-col overflow-hidden rounded-t-2xl border border-muted/20 bg-graphite shadow-2xl sm:inset-x-auto sm:bottom-24 sm:right-6 sm:h-[min(38rem,80vh)] sm:w-[24.5rem] sm:rounded-2xl"
            role="dialog"
            aria-label="AI-консультант"
          >
            <div className="flex items-center justify-between gap-3 border-b border-muted/15 bg-forest/60 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full border border-emerald/30 bg-emerald/10">
                  <Sparkles className="size-4 text-emerald" aria-hidden />
                </span>
                <div>
                  <p className="text-[0.88rem] font-medium text-bone">AI-консультант</p>
                  <p className="flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        disabled ? "bg-amber-400" : streaming ? "bg-emerald animate-pulse" : "bg-emerald",
                      )}
                    />
                    {disabled ? "офлайн" : streaming ? "печатает" : "online"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть чат"
                className="flex size-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-muted/10 hover:text-bone"
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
                        ? "rounded-br-sm bg-emerald text-graphite"
                        : "rounded-bl-sm border border-muted/15 bg-forest/70 text-bone/90",
                    )}
                  >
                    {message.content || (
                      <span className="flex items-center gap-1.5 text-muted">
                        <Loader2 className="size-3.5 animate-spin" aria-hidden />
                        Думаю…
                      </span>
                    )}
                    {message.leadId ? (
                      <span className="mt-2 block rounded-lg border border-emerald/25 bg-emerald/10 px-2.5 py-1.5 font-mono text-[0.68rem] text-emerald">
                        Заявка № {message.leadId} создана
                      </span>
                    ) : null}
                  </div>
                </div>
              ))}

              {error ? (
                <div className="rounded-xl border border-amber-400/25 bg-amber-400/5 px-3 py-2.5 text-[0.78rem] leading-relaxed text-amber-200">
                  {error}
                  {error.includes("недоступен") ? (
                    <Link href="/contacts#form" className="mt-1 block text-emerald underline underline-offset-2">
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
                      className="rounded-full border border-muted/25 px-3 py-1.5 text-left text-[0.75rem] text-bone/75 transition-colors hover:border-emerald/50 hover:text-emerald"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}

              <div ref={bottomRef} />
            </div>

            <div className="border-t border-muted/15 bg-forest/40 px-3 pb-3 pt-2.5">
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
                  className="max-h-28 min-h-10 flex-1 resize-none rounded-xl border border-muted/20 bg-graphite/80 px-3 py-2.5 text-[0.85rem] text-bone outline-none transition-colors placeholder:text-muted/60 focus:border-emerald/60 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={streaming || disabled || !input.trim()}
                  aria-label="Отправить сообщение"
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald text-graphite transition-opacity disabled:opacity-40"
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
              <p className="mt-2 text-center text-[0.62rem] leading-snug text-muted/60">
                Оценка предварительная и не является коммерческим предложением.{" "}
                <Link href="/privacy" className="underline underline-offset-2 hover:text-muted">
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
