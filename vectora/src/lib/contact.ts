/**
 * Адаптер формы. Реального backend у концепта нет, поэтому успешная отправка
 * не имитируется: без NEXT_PUBLIC_CONTACT_ENDPOINT функция возвращает
 * статус "not-configured", а интерфейс честно об этом сообщает.
 */

export type Inquiry = {
  name: string;
  company: string;
  contact: string;
  projectType: string;
  message: string;
  consent: boolean;
};

export type InquiryField = keyof Inquiry;
export type ValidationErrors = Partial<Record<InquiryField, string>>;

export type InquiryResult =
  | { status: "sent" }
  | { status: "not-configured" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Zа-яА-Я]{2,}$/;
const PHONE_RE = /^\+?[\d\s()-]{10,20}$/;

function isContactValid(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return false;
  if (trimmed.includes("@")) return EMAIL_RE.test(trimmed);
  const digits = trimmed.replace(/\D/g, "");
  return PHONE_RE.test(trimmed) && digits.length >= 10;
}

export function validateInquiry(values: Inquiry): ValidationErrors {
  const errors: ValidationErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Укажите имя — как к вам обращаться.";
  }

  if (!isContactValid(values.contact)) {
    errors.contact = "Нужен телефон в формате +7 900 000-00-00 или email.";
  }

  if (!values.projectType) {
    errors.projectType = "Выберите тип проекта.";
  }

  if (values.message.trim().length < 12) {
    errors.message = "Опишите задачу хотя бы в одном предложении.";
  }

  if (!values.consent) {
    errors.consent = "Без согласия на обработку данных мы не сможем ответить.";
  }

  return errors;
}

const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim();

export function isTransportConfigured() {
  return Boolean(endpoint);
}

export async function submitInquiry(values: Inquiry): Promise<InquiryResult> {
  if (!endpoint) {
    return { status: "not-configured" };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values, source: "vectora-contact" }),
    });

    if (!response.ok) {
      return {
        status: "error",
        message: `Сервис ответил ошибкой ${response.status}. Попробуйте ещё раз.`,
      };
    }

    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message: "Не удалось связаться с сервисом. Проверьте соединение и попробуйте снова.",
    };
  }
}
