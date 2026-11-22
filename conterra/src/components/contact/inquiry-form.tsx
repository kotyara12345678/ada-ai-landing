"use client";

import { useId, useState } from "react";
import { AlertCircle, ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { services } from "@/lib/services";
import { site } from "@/lib/site";
import {
  isTransportConfigured,
  submitInquiry,
  validateInquiry,
  type Inquiry,
  type InquiryField,
  type ValidationErrors,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const emptyForm: Inquiry = {
  name: "",
  company: "",
  contact: "",
  direction: "",
  comment: "",
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

  const update = <K extends InquiryField>(field: K, value: Inquiry[K]) => {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: undefined }));
    }
    if (state === "error") setState("idle");
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateInquiry(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(fieldId(firstField as InquiryField))?.focus();
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

  const controlClass = (field: InquiryField) =>
    cn("field", errors[field] && "border-[#b4534a]");
  const describedBy = (field: InquiryField) =>
    errors[field] ? `${fieldId(field)}-error` : undefined;

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={`${uid}-form-note`} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={fieldId("name")} className="field-label">
            Имя <span className="text-teal">*</span>
          </label>
          <input
            id={fieldId("name")}
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            className={controlClass("name")}
            placeholder="Как к вам обращаться"
          />
          {errors.name ? (
            <p id={`${fieldId("name")}-error`} className="mt-1.5 text-[0.75rem] text-[#9a3f37]">
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
            type="text"
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
          Телефон или email <span className="text-teal">*</span>
        </label>
        <input
          id={fieldId("contact")}
          name="contact"
          type="text"
          inputMode="email"
          autoComplete="email"
          value={values.contact}
          onChange={(event) => update("contact", event.target.value)}
          aria-invalid={Boolean(errors.contact)}
          aria-describedby={describedBy("contact")}
          className={controlClass("contact")}
          placeholder="+7 900 000-00-00 или name@company.ru"
        />
        {errors.contact ? (
          <p id={`${fieldId("contact")}-error`} className="mt-1.5 text-[0.75rem] text-[#9a3f37]">
            {errors.contact}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("direction")} className="field-label">
          Направление интереса <span className="text-teal">*</span>
        </label>
        <select
          id={fieldId("direction")}
          name="direction"
          value={values.direction}
          onChange={(event) => update("direction", event.target.value)}
          aria-invalid={Boolean(errors.direction)}
          aria-describedby={describedBy("direction")}
          className={cn(controlClass("direction"), "appearance-none bg-[right_0.9rem_center] bg-no-repeat pr-10")}
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%238295A3' stroke-width='1.5'/%3E%3C/svg%3E\")",
          }}
        >
          <option value="">Выберите направление</option>
          {services.map((service) => (
            <option key={service.slug} value={service.name}>
              {service.name}
            </option>
          ))}
          <option value="Несколько направлений">Несколько направлений</option>
          <option value="Другое">Другое</option>
        </select>
        {errors.direction ? (
          <p id={`${fieldId("direction")}-error`} className="mt-1.5 text-[0.75rem] text-[#9a3f37]">
            {errors.direction}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor={fieldId("comment")} className="field-label">
          Комментарий
        </label>
        <textarea
          id={fieldId("comment")}
          name="comment"
          rows={4}
          value={values.comment}
          onChange={(event) => update("comment", event.target.value)}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={describedBy("comment")}
          className={cn(controlClass("comment"), "resize-y")}
          placeholder="Объект, стадия, сроки, ограничения — всё, что поможет оценить задачу"
        />
        {errors.comment ? (
          <p id={`${fieldId("comment")}-error`} className="mt-1.5 text-[0.75rem] text-[#9a3f37]">
            {errors.comment}
          </p>
        ) : (
          <p className="mt-1.5 text-[0.6875rem] text-muted">
            {values.comment.trim().length} / 2000 символов
          </p>
        )}
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
            className="mt-0.5 size-4 shrink-0 accent-[#243b50]"
          />
          <span className="text-[0.8125rem] leading-relaxed text-graphite/70">
            Согласен на обработку персональных данных для ответа на обращение.{" "}
            <span className="text-muted">Демонстрационная форма концепта.</span>
          </span>
        </label>
        {errors.consent ? (
          <p id={`${fieldId("consent")}-error`} className="mt-1.5 text-[0.75rem] text-[#9a3f37]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" disabled={state === "submitting"} className="btn btn-primary">
          {state === "submitting" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Отправляем
            </>
          ) : (
            <>
              Отправить обращение
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </>
          )}
        </button>
        <p id={`${uid}-form-note`} className="max-w-xs text-[0.6875rem] leading-relaxed text-muted">
          {transportReady
            ? "Данные уйдут в API заказчика. Поля со звёздочкой обязательны."
            : "Форма проверяет данные, но отправка ещё не подключена к API — это демонстрационный концепт."}
        </p>
      </div>

      <div aria-live="polite" className="space-y-3">
        {state === "sent" ? (
          <p className="flex items-start gap-2 border border-teal/40 bg-teal/8 p-4 text-[0.875rem] leading-relaxed text-graphite">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-teal" aria-hidden="true" />
            Обращение отправлено. Ответим на указанный контакт.
          </p>
        ) : null}

        {state === "not-configured" ? (
          <div className="border border-line bg-paper p-4 text-[0.875rem] leading-relaxed text-graphite/80">
            <p className="flex items-start gap-2 font-medium text-graphite">
              <AlertCircle className="mt-0.5 size-4 shrink-0 text-[#9a3f37]" aria-hidden="true" />
              Отправка пока не подключена
            </p>
            <p className="mt-2">
              Данные проверены, но отправлять их некуда: у концепта нет backend. Форма готова —
              чтобы активировать отправку, укажите адрес API в переменной{" "}
              <code className="border border-line bg-canvas px-1 py-0.5 text-[0.75rem]">
                NEXT_PUBLIC_CONTACT_ENDPOINT
              </code>
              .
            </p>
            <p className="mt-2 text-[0.8125rem] text-muted">
              Для демонстрации: письмо можно отправить на концептуальный адрес{" "}
              <a href={`mailto:${site.demoEmail}`} className="text-navy underline underline-offset-4">
                {site.demoEmail}
              </a>
              .
            </p>
          </div>
        ) : null}

        {state === "error" ? (
          <p className="flex items-start gap-2 border border-[#b4534a]/40 bg-[#b4534a]/6 p-4 text-[0.875rem] leading-relaxed text-[#8d3a32]">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errorMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
