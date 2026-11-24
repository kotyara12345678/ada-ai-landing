"use client";

import { useId, useState } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";

type Values = {
  name: string;
  email: string;
  company: string;
  team: string;
  comment: string;
  consent: boolean;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const emptyForm: Values = {
  name: "",
  email: "",
  company: "",
  team: "6–20",
  comment: "",
  consent: false,
};

const teamSizes = ["1–5", "6–20", "21–50", "больше 50"];

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) errors.name = "Как к вам обращаться?";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = "Нужна рабочая почта вида name@company.ru";
  }
  if (values.company.trim().length < 2) errors.company = "Название компании";
  if (!values.consent) errors.consent = "Без согласия не сможем ответить";

  return errors;
}

type State = "idle" | "sending" | "demo";

export function DemoForm() {
  const uid = useId();
  const [values, setValues] = useState<Values>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<State>("idle");

  const fieldId = (field: Field) => `${uid}-${field}`;

  const update = <K extends Field>(field: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "sending") return;

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0] as Field;
      document.getElementById(fieldId(first))?.focus();
      return;
    }

    setState("sending");
    window.setTimeout(() => setState("demo"), 700);
  };

  if (state === "demo") {
    return (
      <div className="flex h-full flex-col justify-center p-6 md:p-8">
        <span className="grid size-11 place-items-center rounded-full bg-cobalt-soft text-cobalt">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h3 className="h3 mt-5">Заявка собрана</h3>
        <p className="mt-2 text-[0.875rem] leading-relaxed text-ink/70">
          Спасибо, {values.name.trim().split(" ")[0]}. Мы бы написали на {values.email} и предложили
          два времени для демонстрации.
        </p>
        <div className="mt-6 flex items-start gap-2.5 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-muted">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-cobalt" aria-hidden="true" />
          <p>
            Это демонстрационный концепт: форма проверила поля, но ничего не отправила. В реальном
            проекте заявка уходила бы в CRM и Telegram.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setValues(emptyForm);
            setErrors({});
            setState("idle");
          }}
          className="btn btn-ghost mt-6 w-fit text-[0.8125rem]"
        >
          Заполнить заново
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-3.5 p-6 sm:grid-cols-2 md:p-8">
      <div>
        <label htmlFor={fieldId("name")} className="field-label">
          Имя
        </label>
        <input
          id={fieldId("name")}
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? `${fieldId("name")}-error` : undefined}
          placeholder="Анна"
          className="field"
        />
        {errors.name ? (
          <p id={`${fieldId("name")}-error`} className="mt-1 text-[0.6875rem] text-[#c8402f]">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("email")} className="field-label">
          Рабочая почта
        </label>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${fieldId("email")}-error` : undefined}
          placeholder="anna@company.ru"
          className="field"
        />
        {errors.email ? (
          <p id={`${fieldId("email")}-error`} className="mt-1 text-[0.6875rem] text-[#c8402f]">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("company")} className="field-label">
          Компания
        </label>
        <input
          id={fieldId("company")}
          name="company"
          autoComplete="organization"
          value={values.company}
          onChange={(event) => update("company", event.target.value)}
          aria-invalid={Boolean(errors.company)}
          aria-describedby={errors.company ? `${fieldId("company")}-error` : undefined}
          placeholder="Название"
          className="field"
        />
        {errors.company ? (
          <p id={`${fieldId("company")}-error`} className="mt-1 text-[0.6875rem] text-[#c8402f]">
            {errors.company}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("team")} className="field-label">
          Команда
        </label>
        <select
          id={fieldId("team")}
          name="team"
          value={values.team}
          onChange={(event) => update("team", event.target.value)}
          className="field"
        >
          {teamSizes.map((size) => (
            <option key={size} value={size}>
              {size} человек
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={fieldId("comment")} className="field-label">
          Что хотите увидеть <span className="font-normal text-muted">— необязательно</span>
        </label>
        <textarea
          id={fieldId("comment")}
          name="comment"
          rows={2}
          value={values.comment}
          onChange={(event) => update("comment", event.target.value)}
          placeholder="Например: метрики по подпискам и оттоку"
          className="field resize-none"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-2.5 text-[0.75rem] leading-relaxed text-muted">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[#2b41ea]"
          />
          <span>Согласен на обработку данных для ответа на заявку. Это концепт — данные никуда не уходят.</span>
        </label>
        {errors.consent ? (
          <p id={`${fieldId("consent")}-error`} className="mt-1 text-[0.6875rem] text-[#c8402f]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="mt-1 sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full">
          {state === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Отправляем
            </>
          ) : (
            "Запросить демо"
          )}
        </button>
        <p className="mt-3 text-center text-[0.6875rem] text-muted">
          Ответим в течение рабочего дня. Без звонков «просто уточнить».
        </p>
      </div>
    </form>
  );
}
