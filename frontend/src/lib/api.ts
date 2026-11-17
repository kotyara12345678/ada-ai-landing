/**
 * Тонкий клиент API. Все запросы идут на тот же origin под /api,
 * поэтому ключи и CORS не попадают в клиентский код.
 */
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

export type LeadPayload = {
  name: string;
  contact: string;
  email?: string;
  direction: string;
  description: string;
  budget?: string;
  deadline?: string;
  consent: boolean;
  /** Honeypot: должно быть пустым */
  company?: string;
  source?: string;
  page?: string;
  /** Время открытия формы (мс) — защита от мгновенной отправки */
  startedAt?: number;
};

export type LeadResponse = {
  id: string;
  public_id: string;
  status: string;
  created_at: string;
};

export class ApiError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function parseError(response: Response): Promise<ApiError> {
  let message = "Не удалось отправить запрос. Попробуйте ещё раз.";
  let details: unknown;
  try {
    const data = (await response.json()) as { detail?: unknown };
    details = data.detail;
    if (typeof data.detail === "string") {
      message = data.detail;
    } else if (Array.isArray(data.detail) && data.detail.length > 0) {
      const first = data.detail[0] as { msg?: string };
      message = first?.msg ?? message;
    }
  } catch {
    // тело ответа не JSON — оставляем сообщение по умолчанию
  }

  if (response.status === 429) {
    message = "Слишком много заявок с этого адреса. Попробуйте позже или напишите в Telegram.";
  }
  if (response.status === 409) {
    message = "Похожая заявка уже отправлена. Мы свяжемся с вами в ближайшее время.";
  }
  if (response.status >= 500) {
    message = "Сервис временно недоступен. Напишите нам в Telegram — ответим быстрее.";
  }

  return new ApiError(message, response.status, details);
}

export async function submitLead(payload: LeadPayload): Promise<LeadResponse> {
  const response = await fetch(`${API_BASE}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw await parseError(response);
  }

  return (await response.json()) as LeadResponse;
}

export type ChatStatus = {
  enabled: boolean;
  provider: string;
  model: string;
  message?: string;
};

export async function fetchChatStatus(): Promise<ChatStatus> {
  try {
    const response = await fetch(`${API_BASE}/chat/status`, { cache: "no-store" });
    if (!response.ok) throw new Error("status failed");
    return (await response.json()) as ChatStatus;
  } catch {
    return {
      enabled: false,
      provider: "unknown",
      model: "unknown",
      message: "Сервис AI-консультанта недоступен.",
    };
  }
}
