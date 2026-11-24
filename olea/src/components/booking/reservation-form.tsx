"use client";

import { useId, useState } from "react";
import { AlertCircle, Check, Loader2 } from "lucide-react";

type Values = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  comment: string;
  consent: boolean;
};

type Field = keyof Values;
type Errors = Partial<Record<Field, string>>;

const emptyForm: Values = {
  name: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  comment: "",
  consent: false,
};

const times = ["18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];
const guests = ["1", "2", "3", "4", "5", "6", "7", "8", "больше 8"];

function validate(values: Values): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) errors.name = "Как к вам обращаться?";
  if (values.phone.replace(/\D/g, "").length < 10) errors.phone = "Нужен номер из 10–11 цифр";
  if (!values.date) errors.date = "Выберите дату";
  if (!values.time) errors.time = "Выберите время";
  if (!values.consent) errors.consent = "Без согласия не сможем принять бронь";

  return errors;
}

type State = "idle" | "sending" | "demo";

export function ReservationForm() {
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
      <div className="flex h-full flex-col justify-center py-4">
        <span className="flex size-11 items-center justify-center rounded-full bg-olive/12 text-olive">
          <Check className="size-5" aria-hidden="true" />
        </span>
        <h3 className="h3 mt-5">Спасибо, {values.name.trim().split(" ")[0]}!</h3>
        <p className="mt-3 text-[0.875rem] leading-relaxed text-ink/75">
          Мы бы держали для вас стол {values.guests === "1" ? "на одного" : `на ${values.guests}`}
          {values.date ? `, ${new Date(`${values.date}T12:00:00`).toLocaleDateString("ru-RU", { day: "numeric", month: "long" })}` : ""}
          {values.time ? ` в ${values.time}` : ""}.
        </p>
        <div className="mt-6 flex items-start gap-2.5 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-muted">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-clay" aria-hidden="true" />
          <p>
            Это демонстрационный концепт: форма проверила данные, но никуда их не отправила и стол
            не забронирован. В реальном проекте здесь была бы интеграция с ресторанной CRM.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setValues(emptyForm);
            setErrors({});
            setState("idle");
          }}
          className="btn btn-ghost mt-6 w-fit"
        >
          Заполнить заново
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
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
          placeholder="Как к вам обращаться"
          className="field"
        />
        {errors.name ? (
          <p id={`${fieldId("name")}-error`} className="mt-1.5 text-[0.75rem] text-[#b4453a]">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("phone")} className="field-label">
          Телефон
        </label>
        <input
          id={fieldId("phone")}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => update("phone", event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? `${fieldId("phone")}-error` : undefined}
          placeholder="+7 900 000-00-00"
          className="field"
        />
        {errors.phone ? (
          <p id={`${fieldId("phone")}-error`} className="mt-1.5 text-[0.75rem] text-[#b4453a]">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("date")} className="field-label">
          Дата
        </label>
        <input
          id={fieldId("date")}
          name="date"
          type="date"
          value={values.date}
          onChange={(event) => update("date", event.target.value)}
          aria-invalid={Boolean(errors.date)}
          aria-describedby={errors.date ? `${fieldId("date")}-error` : undefined}
          className="field"
        />
        {errors.date ? (
          <p id={`${fieldId("date")}-error`} className="mt-1.5 text-[0.75rem] text-[#b4453a]">
            {errors.date}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("time")} className="field-label">
          Время
        </label>
        <select
          id={fieldId("time")}
          name="time"
          value={values.time}
          onChange={(event) => update("time", event.target.value)}
          aria-invalid={Boolean(errors.time)}
          aria-describedby={errors.time ? `${fieldId("time")}-error` : undefined}
          className="field"
        >
          <option value="">Выберите время</option>
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>
        {errors.time ? (
          <p id={`${fieldId("time")}-error`} className="mt-1.5 text-[0.75rem] text-[#b4453a]">
            {errors.time}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("guests")} className="field-label">
          Гостей
        </label>
        <select
          id={fieldId("guests")}
          name="guests"
          value={values.guests}
          onChange={(event) => update("guests", event.target.value)}
          className="field"
        >
          {guests.map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor={fieldId("comment")} className="field-label">
          Пожелания <span className="normal-case tracking-normal text-muted/70">— необязательно</span>
        </label>
        <textarea
          id={fieldId("comment")}
          name="comment"
          rows={3}
          value={values.comment}
          onChange={(event) => update("comment", event.target.value)}
          placeholder="Повод, аллергии, нужен ли стол у окна"
          className="field resize-none"
        />
      </div>

      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.75rem] leading-relaxed text-muted">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${fieldId("consent")}-error` : undefined}
            className="mt-0.5 size-4 shrink-0 accent-[#1d1b15]"
          />
          <span>
            Согласен на обработку данных для подтверждения брони. Это концепт — данные никуда не
            уходят.
          </span>
        </label>
        {errors.consent ? (
          <p id={`${fieldId("consent")}-error`} className="mt-1.5 text-[0.75rem] text-[#b4453a]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="mt-2 sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full sm:w-auto">
          {state === "sending" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Отправляем
            </>
          ) : (
            "Забронировать"
          )}
        </button>
      </div>
    </form>
  );
}
