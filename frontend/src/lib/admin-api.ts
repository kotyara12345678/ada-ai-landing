/**
 * Клиент админ-API. Запросы идут на тот же origin под /api,
 * сессия живёт в HttpOnly-cookie — токены в браузере не храним.
 */
export const ADMIN_API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

export const LEAD_STATUSES = [
  "new",
  "in_progress",
  "contacted",
  "won",
  "lost",
  "spam",
] as const;

export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "Новая",
  in_progress: "В работе",
  contacted: "Связались",
  won: "Сделка",
  lost: "Отказ",
  spam: "Спам",
};

export type AdminLead = {
  id: string;
  public_id: string;
  name: string;
  contact: string;
  email: string | null;
  direction: string;
  description: string;
  budget: string | null;
  deadline: string | null;
  source: string;
  page: string | null;
  status: string;
  telegram_sent: boolean;
  created_at: string;
};

export type AdminLeadList = {
  items: AdminLead[];
  total: number;
  limit: number;
  offset: number;
};

export type AdminSession = {
  email: string;
  expires_in: number;
};

export class AdminApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AdminApiError";
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${ADMIN_API_BASE}${path}`, {
    ...init,
    cache: "no-store",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    let message = "Не удалось выполнить запрос";
    try {
      const data = (await response.json()) as { detail?: unknown };
      if (typeof data.detail === "string") message = data.detail;
    } catch {
      // тело не JSON — оставляем сообщение по умолчанию
    }
    throw new AdminApiError(message, response.status);
  }

  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export function login(email: string, password: string): Promise<AdminSession> {
  return request<AdminSession>("/admin/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logout(): Promise<void> {
  return request<void>("/admin/logout", { method: "POST" });
}

export function fetchSession(): Promise<AdminSession> {
  return request<AdminSession>("/admin/me");
}

export function fetchLeads(params: { status?: string; limit?: number; offset?: number } = {}) {
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  search.set("limit", String(params.limit ?? 200));
  search.set("offset", String(params.offset ?? 0));
  return request<AdminLeadList>(`/admin/leads?${search.toString()}`);
}

export function updateLeadStatus(publicId: string, status: LeadStatus): Promise<AdminLead> {
  return request<AdminLead>(`/admin/leads/${encodeURIComponent(publicId)}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
