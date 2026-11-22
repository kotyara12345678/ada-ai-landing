"use client";

import { useId, useState } from "react";
import { AlertTriangle, ArrowUpRight, Check, Loader2 } from "lucide-react";
import { projectTypes } from "@/lib/content";
import { site } from "@/lib/site";
import {
  isTransportConfigured,
  submitInquiry,
  validateInquiry,
  type Inquiry,
  type InquiryField,
  type ValidationErrors,
} from "@/lib/contact";

const emptyForm: Inquiry = {
  name: "",
  company: "",
  contact: "",
  projectType: "",
  message: "",
  consent: false,
};

type FormState = "idle" | "submitting" | "sent" | "not-configured" | "error";

export function InquiryForm() {
  const uid = useId();
  const [values, setValues] = useState<Inquiry>(emptyForm);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const transportReady = isTransportConfigured();

  const fieldId = (field: InquiryField) => `${uid}-${field}`;
  const describedBy = (field: InquiryField) => (errors[field] ? `${fieldId(field)}-error` : undefined);

  const update = <K extends InquiryField>(field: K, value: Inquiry[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) setErrors((current) => ({ ...current, [field]: undefined }));
    if (state === "error") setState("idle");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (state === "submitting") return;

    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const first = Object.keys(nextErrors)[0] as InquiryField;
      document.getElementById(fieldId(first))?.focus();
      return;
    }

    setState("submitting");
    const result = await submitInquiry(values);

    if (result.status === "sent") {
      setState("sent");
      setValues(emptyForm);
      return;
    }

    if (result.status === "not-configured") {
      setState("not-configured");
      return;
    }

    setErrorMessage(result.message);
    setState("error");
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="field-label">
            Имя <span className="text-lime">*</span>
          </label>
          <input
            id={fieldId("name")}
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className="field"
            placeholder="Как к вам обращаться"
          />
          {errors.name ? (
            <p id={`${fieldId("name")}-error`} className="mt-1.5 text-[0.75rem] text-[#ff8a7a]">
              {errors.name}
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
            className="field"
            placeholder="Название или сфера"
          />
        </div>
      </div>

      <div>
        <label htmlFor={fieldId("contact")} className="field-label">
          Email или телефон <span className="text-lime">*</span>
        </label>
        <input
          id={fieldId("contact")}
          name="contact"
          autoComplete="email"
          value={values.contact}
          onChange={(event) => update("contact", event.target.value)}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={describedBy("contact")}
          className="field"
          placeholder="name@company.ru или +7 900 000-00-00"
        />
        {errors.contact ? (
          <p id={`${fieldId("contact")}-error`} className="mt-1.5 text-[0.75rem] text-[#ff8a7a]">
            {errors.contact}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("projectType")} className="field-label">
          Тип проекта <span className="text-lime">*</span>
        </label>
        <select
          id={fieldId("projectType")}
          name="projectType"
          value={values.projectType}
          onChange={(event) => update("projectType", event.target.value)}
          aria-invalid={Boolean(errors.projectType)}
          aria-describedby={describedBy("projectType")}
          className="field appearance-none pr-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23939D94' stroke-width='1.5'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right 0.9rem center",
          }}
        >
          <option value="">Выберите тип</option>
          {projectTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {errors.projectType ? (
          <p id={`${fieldId("projectType")}-error`} className="mt-1.5 text-[0.75rem] text-[#ff8a7a]">
            {errors.projectType}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("message")} className="field-label">
          Сообщение <span className="text-lime">*</span>
        </label>
        <textarea
          id={fieldId("message")}
          name="message"
          rows={4}
          value={values.message}
          onChange={(event) => update("message", event.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          className="field resize-y"
          placeholder="Задача, контекст, сроки и ограничения"
        />
        {errors.message ? (
          <p id={`${fieldId("message")}-error`} className="mt-1.5 text-[0.75rem] text-[#ff8a7a]">
            {errors.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("consent")} className="flex cursor-pointer items-start gap-3">
          <input
            id={fieldId("consent")}
            name="consent"
            type="checkbox"
            checked={values.consent}
            onChange={(event) => update("consent", event.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
            className="mt-0.5 size-4 shrink-0 accent-[#A3FF70]"
          />
          <span className="text-[0.8125rem] leading-relaxed text-muted">
            Согласен на обработку персональных данных для ответа на обращение.{" "}
            <span className="text-muted/60">Форма демонстрационного концепта.</span>
          </span>
        </label>
        {errors.consent ? (
          <p id={`${fieldId("consent")}-error`} className="mt-1.5 text-[0.75rem] text-[#ff8a7a]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={state === "submitting" || state === "sent"} className="btn btn-primary">
          {state === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Отправляем
            </>
          ) : (
            <>
              Отправить
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p className="mono max-w-[16rem] text-[0.5rem] leading-relaxed tracking-[0.16em] text-muted/60">
          {transportReady
            ? "Данные уйдут в API. Поля со звёздочкой обязательны."
            : "Проверка данных работает, отправка ждёт подключения API."}
        </p>
      </div>

      <div aria-live="polite" className="space-y-3">
        {state === "sent" ? (
          <p className="flex items-start gap-2 rounded-lg border border-lime/40 bg-lime/[0.06] p-4 text-[0.875rem] text-text">
            <Check className="mt-0.5 size-4 shrink-0 text-lime" aria-hidden="true" />
            Обращение отправлено. Ответим на указанный контакт.
          </p>
        ) : null}

        {state === "not-configured" ? (
          <div className="rounded-lg border border-line bg-surface/60 p-4 text-[0.875rem] leading-relaxed text-muted">
            <p className="flex items-center gap-2 font-medium text-text">
              <AlertTriangle className="size-4 text-lime" aria-hidden="true" />
              Отправка пока не подключена
            </p>
            <p className="mt-2">
              Данные проверены, но backend у концепта нет. Форма готова — достаточно задать{" "}
              <code className="rounded border border-line bg-void px-1 py-0.5 text-[0.75rem] text-text/80">
                NEXT_PUBLIC_CONTACT_ENDPOINT
              </code>
              , чтобы она заработала.
            </p>
            <p className="mt-2 text-[0.8125rem] text-muted/70">
              Для демонстрации можно написать на концептуальный адрес{" "}
              <a href={`mailto:${site.demoEmail}`} className="text-lime underline underline-offset-4">
                {site.demoEmail}
              </a>
              .
            </p>
          </div>
        ) : null}

        {state === "error" ? (
          <p className="flex items-start gap-2 rounded-lg border border-[#ff8a7a]/40 bg-[#ff8a7a]/[0.06] p-4 text-[0.875rem] text-[#ffb3a8]">
            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
