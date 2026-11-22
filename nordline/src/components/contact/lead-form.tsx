"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AlertTriangle, CheckCircle2, ChevronDown, Loader2 } from "lucide-react";
import { interests } from "@/lib/content";
import { cn } from "@/lib/utils";

type Fields = {
  name: string;
  company: string;
  contact: string;
  direction: string;
  comment: string;
};

type Errors = Partial<Record<keyof Fields, string>>;
type Status = "idle" | "submitting" | "success" | "error";

const emptyValues: Fields = {
  name: "",
  company: "",
  contact: "",
  direction: "",
  comment: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Zа-яА-Я]{2,}$/;

function validate(values: Fields): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Укажите имя — минимум 2 символа.";
  }

  if (values.company.trim().length < 2) {
    errors.company = "Укажите название компании.";
  }

  const contact = values.contact.trim();
  const digits = contact.replace(/\D/g, "");

  if (!contact) {
    errors.contact = "Оставьте телефон или email для ответа.";
  } else if (!emailPattern.test(contact) && digits.length < 10) {
    errors.contact = "Проверьте формат: телефон из 10–15 цифр или email вида name@company.ru.";
  }

  if (!values.direction) {
    errors.direction = "Выберите направление интереса.";
  }

  if (values.comment.trim().length > 1000) {
    errors.comment = "Сократите комментарий до 1000 символов.";
  }

  return errors;
}

type FieldProps = {
  id: keyof Fields;
  label: string;
  error?: string;
  className?: string;
  hint?: string;
  children: ReactNode;
};

function Field({ id, label, error, className, hint, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label text-graphite/75">
        {label}
      </label>
      <div className="mt-1">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-xs font-medium text-[#a5371f]">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-2 text-xs text-graphite/70">{hint}</p>
      ) : null}
    </div>
  );
}

export function LeadForm() {
  const [values, setValues] = useState<Fields>(emptyValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const onInterest = (event: Event) => {
      const detail = (event as CustomEvent<string>).detail;
      if (!detail || !interests.includes(detail as (typeof interests)[number])) return;

      setValues((current) => ({ ...current, direction: detail }));
      setErrors((current) => ({ ...current, direction: undefined }));
      setStatus((current) => (current === "success" ? "idle" : current));
    };

    window.addEventListener("nordline:interest", onInterest);
    return () => window.removeEventListener("nordline:interest", onInterest);
  }, []);

  const update = (field: keyof Fields) => (value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "submitting") return;

    const nextErrors = validate(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      const firstField = (Object.keys(nextErrors) as (keyof Fields)[])[0];
      const node = formRef.current?.querySelector<HTMLElement>(`[name="${firstField}"]`);
      node?.focus();
      return;
    }

    setStatus("submitting");
    setServerError("");

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, source: "nordline-landing" }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setServerError(
        "Не удалось сохранить заявку: сервер не ответил. Данные остались в форме — попробуйте отправить ещё раз.",
      );
    }
  };

  const reset = () => {
    setValues(emptyValues);
    setErrors({});
    setStatus("idle");
    setServerError("");
  };

  if (status === "success") {
    return (
      <div
        role="status"
        className="flex h-full flex-col justify-between border border-graphite/15 bg-mist/50 p-6 md:p-10"
      >
        <div>
          <CheckCircle2 className="h-9 w-9 text-accent" aria-hidden="true" />
          <h3 className="mt-5 text-2xl font-bold tracking-tight">Заявка сохранена</h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-graphite/70">
            Данные отправлены на сервер демонстрационного проекта и записаны в журнал заявок.
            Реальная передача в NORDLINE не выполняется — компания и сайт являются концептом.
          </p>

          <dl className="mt-6 grid gap-x-6 border-t border-graphite/15 pt-4 sm:grid-cols-2">
            <div className="py-2">
              <dt className="label text-[0.5rem] text-graphite/70">Компания</dt>
              <dd className="mt-1 text-sm font-medium">{values.company}</dd>
            </div>
            <div className="py-2">
              <dt className="label text-[0.5rem] text-graphite/70">Направление</dt>
              <dd className="mt-1 text-sm font-medium">{values.direction}</dd>
            </div>
          </dl>
        </div>

        <button type="button" onClick={reset} className="btn btn-outline-dark mt-8 w-full sm:w-fit">
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <div className="border border-graphite/15 bg-mist/50 p-6 md:p-10">
      <h3 className="text-2xl font-bold tracking-tight">Заявка на подбор оборудования</h3>
      <p className="mt-2 max-w-md text-sm leading-relaxed text-graphite/70">
        Поля со звёздочкой обязательны. Ответим в рабочее время и уточним параметры задачи.
      </p>

      <form ref={formRef} noValidate onSubmit={handleSubmit} className="mt-8">
        <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
          <Field id="name" label="Имя *" error={errors.name}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update("name")(event.target.value)}
              className="field"
              placeholder="Как к вам обращаться"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
          </Field>

          <Field id="company" label="Компания *" error={errors.company}>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(event) => update("company")(event.target.value)}
              className="field"
              placeholder="Название предприятия"
              aria-invalid={Boolean(errors.company)}
              aria-describedby={errors.company ? "company-error" : undefined}
            />
          </Field>

          <Field
            id="contact"
            label="Телефон или email *"
            error={errors.contact}
            className="sm:col-span-2"
            hint="Например: +7 900 000-00-00 или name@company.ru"
          >
            <input
              id="contact"
              name="contact"
              type="text"
              autoComplete="tel"
              inputMode="tel"
              value={values.contact}
              onChange={(event) => update("contact")(event.target.value)}
              className="field"
              placeholder="Способ связи"
              aria-invalid={Boolean(errors.contact)}
              aria-describedby={errors.contact ? "contact-error" : undefined}
            />
          </Field>

          <Field
            id="direction"
            label="Направление интереса *"
            error={errors.direction}
            className="sm:col-span-2"
          >
            <div className="relative">
              <select
                id="direction"
                name="direction"
                value={values.direction}
                onChange={(event) => update("direction")(event.target.value)}
                className={cn("field appearance-none pr-8", !values.direction && "text-graphite/75")}
                aria-invalid={Boolean(errors.direction)}
                aria-describedby={errors.direction ? "direction-error" : undefined}
              >
                <option value="">Выберите направление</option>
                {interests.map((interest) => (
                  <option key={interest} value={interest}>
                    {interest}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="pointer-events-none absolute right-1 top-1/2 h-4 w-4 -translate-y-1/2 text-graphite/70"
                aria-hidden="true"
              />
            </div>
          </Field>

          <Field
            id="comment"
            label="Комментарий"
            error={errors.comment}
            className="sm:col-span-2"
            hint="Опишите задачу, оборудование или условия эксплуатации."
          >
            <textarea
              id="comment"
              name="comment"
              rows={4}
              value={values.comment}
              onChange={(event) => update("comment")(event.target.value)}
              className="field resize-y border border-graphite/15 px-3 py-3 focus:border-accent"
              placeholder="Что нужно подобрать или заменить"
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={errors.comment ? "comment-error" : undefined}
            />
          </Field>
        </div>

        <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
          <label htmlFor="company_website">Не заполняйте это поле</label>
          <input
            id="company_website"
            name="company_website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {status === "error" ? (
          <div
            role="alert"
            className="mt-6 flex items-start gap-3 border border-[#a5371f]/35 bg-[#a5371f]/5 p-4"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#a5371f]" aria-hidden="true" />
            <p className="text-sm leading-relaxed text-[#8c2f1b]">{serverError}</p>
          </div>
        ) : null}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn btn-accent w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                Отправляем
              </>
            ) : (
              "Отправить заявку"
            )}
          </button>
          <p className="max-w-xs text-[0.6875rem] leading-relaxed text-graphite/70">
            Демонстрационная форма: заявка сохраняется в журнале проекта, а не отправляется
            в компанию.
          </p>
        </div>
      </form>
    </div>
  );
}
