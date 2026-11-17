"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { directions } from "@/config/services";
import { legal } from "@/config/site";
import { ApiError, submitLead, type LeadResponse } from "@/lib/api";
import { cn } from "@/lib/utils";
import Link from "next/link";

const budgets = [
  "до 15 000 ₽",
  "15 000 – 50 000 ₽",
  "50 000 – 150 000 ₽",
  "150 000 – 500 000 ₽",
  "более 500 000 ₽",
  "нужна помощь с оценкой",
];

const deadlines = ["Как можно скорее", "В течение месяца", "1–3 месяца", "Без жёсткого срока"];

const fieldClass =
  "w-full rounded-xl border border-graphite/15 bg-white/80 px-4 py-3 text-[0.92rem] text-graphite outline-none transition-colors placeholder:text-graphite/35 focus:border-emerald focus:bg-white";

const labelClass = "mb-2 block font-mono text-[0.66rem] uppercase tracking-[0.14em] text-graphite/55";

type LeadFormProps = {
  /** Направление по умолчанию (slug из services.ts) */
  defaultDirection?: string;
  compact?: boolean;
  className?: string;
};

export function LeadForm({ defaultDirection = "", compact = false, className }: LeadFormProps) {
  const startedAt = useMemo(() => Date.now(), []);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LeadResponse | null>(null);
  const [values, setValues] = useState({
    name: "",
    contact: "",
    email: "",
    direction: defaultDirection,
    description: "",
    budget: "",
    deadline: "",
  });
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState("");

  const update = (key: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((prev) => ({ ...prev, [key]: event.target.value }));
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;
    setError(null);

    if (!values.name.trim() || !values.contact.trim() || !values.description.trim()) {
      setError("Заполните имя, контакт и описание задачи.");
      return;
    }
    if (values.description.trim().length < 15) {
      setError("Опишите задачу подробнее — минимум 15 символов.");
      return;
    }
    if (!consent) {
      setError("Нужно согласие на обработку персональных данных.");
      return;
    }

    setStatus("submitting");
    try {
      const response = await submitLead({
        ...values,
        consent,
        company,
        startedAt,
        source: "website_form",
        page: typeof window !== "undefined" ? window.location.pathname : undefined,
      });
      setResult(response);
      setStatus("success");
    } catch (caught) {
      setStatus("error");
      setError(caught instanceof ApiError ? caught.message : "Не удалось отправить заявку. Попробуйте ещё раз.");
    }
  }

  if (status === "success" && result) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn("rounded-2xl border border-emerald/30 bg-white/85 p-8", className)}
      >
        <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-emerald/15">
          <Check className="size-5 text-[#0c8a58]" aria-hidden />
        </div>
        <h3 className="text-h3 mb-2 text-graphite">Заявка принята</h3>
        <p className="mb-4 text-[0.92rem] leading-relaxed text-graphite/65">
          Номер обращения: <span className="font-mono text-graphite">{result.public_id}</span>. Мы свяжемся
          с вами по указанному контакту, чтобы уточнить детали и оценить объём работ.
        </p>
        <p className="text-[0.82rem] text-graphite/50">
          Если задача срочная — напишите в Telegram, ответим быстрее.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("grid gap-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="lead-name">
            Имя *
          </label>
          <input
            id="lead-name"
            name="name"
            className={fieldClass}
            placeholder="Как к вам обращаться"
            value={values.name}
            onChange={update("name")}
            autoComplete="name"
            maxLength={120}
            required
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-contact">
            Telegram или телефон *
          </label>
          <input
            id="lead-contact"
            name="contact"
            className={fieldClass}
            placeholder="@username или +7…"
            value={values.contact}
            onChange={update("contact")}
            autoComplete="tel"
            maxLength={120}
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="lead-email">
            Email <span className="normal-case tracking-normal">(необязательно)</span>
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            className={fieldClass}
            placeholder="you@company.ru"
            value={values.email}
            onChange={update("email")}
            autoComplete="email"
            maxLength={200}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="lead-direction">
            Направление
          </label>
          <select
            id="lead-direction"
            name="direction"
            className={cn(fieldClass, "appearance-none bg-[length:14px] pr-10")}
            value={values.direction}
            onChange={update("direction")}
          >
            <option value="">Выберите направление</option>
            {directions.map((direction) => (
              <option key={direction.slug} value={direction.slug}>
                {direction.name}
              </option>
            ))}
            <option value="other">Другое / не знаю</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="lead-description">
          Описание задачи *
        </label>
        <textarea
          id="lead-description"
          name="description"
          className={cn(fieldClass, "min-h-28 resize-y")}
          placeholder="Что нужно сделать, для кого, какие системы уже используются"
          value={values.description}
          onChange={update("description")}
          maxLength={4000}
          required
        />
      </div>

      {!compact ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass} htmlFor="lead-budget">
              Бюджет
            </label>
            <select
              id="lead-budget"
              name="budget"
              className={cn(fieldClass, "appearance-none pr-10")}
              value={values.budget}
              onChange={update("budget")}
            >
              <option value="">Не указан</option>
              {budgets.map((budget) => (
                <option key={budget} value={budget}>
                  {budget}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="lead-deadline">
              Желаемые сроки
            </label>
            <select
              id="lead-deadline"
              name="deadline"
              className={cn(fieldClass, "appearance-none pr-10")}
              value={values.deadline}
              onChange={update("deadline")}
            >
              <option value="">Не указаны</option>
              {deadlines.map((deadline) => (
                <option key={deadline} value={deadline}>
                  {deadline}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}

      {/* Honeypot: скрытое поле, боты заполняют его автоматически */}
      <div className="hidden" aria-hidden>
        <label htmlFor="lead-company">Компания</label>
        <input
          id="lead-company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={company}
          onChange={(event) => setCompany(event.target.value)}
        />
      </div>

      <label className="flex cursor-pointer items-start gap-3 pt-1 text-[0.78rem] leading-relaxed text-graphite/60">
        <input
          type="checkbox"
          name="consent"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-[#20C982]"
        />
        <span>
          {legal.consentText}.{" "}
          <Link href={legal.privacyPath} className="text-graphite/80 underline decoration-graphite/25 underline-offset-2 hover:text-graphite">
            Политика конфиденциальности
          </Link>
        </span>
      </label>

      {error ? (
        <p role="alert" className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-[0.82rem] text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-graphite px-6 text-[0.9rem] font-medium text-bone transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden />
              Отправляем
            </>
          ) : (
            <>
              Отправить заявку
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
        <span className="inline-flex items-center gap-1.5 text-[0.72rem] text-graphite/45">
          <ShieldCheck className="size-3.5" aria-hidden />
          Данные не передаются третьим лицам
        </span>
      </div>
    </form>
  );
}
