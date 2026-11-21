/**
 * Клиент API коммерческих предложений.
 * Как и админ-API заявок, работает под /api с HttpOnly-cookie.
 */
import { ADMIN_API_BASE, AdminApiError } from "@/lib/admin-api";

export const PROPOSAL_STATUSES = ["draft", "sent", "accepted", "rejected"] as const;
export type ProposalStatus = (typeof PROPOSAL_STATUSES)[number];

export const PROPOSAL_STATUS_LABELS: Record<ProposalStatus, string> = {
  draft: "Черновик",
  sent: "Отправлено",
  accepted: "Принято",
  rejected: "Отказ",
};

export type CatalogSnapshotItem = {
  id: string;
  title: string;
  price: number;
  direction: string;
};

export type ProposalScopeItem = {
  id: string;
  catalog_id: string | null;
  title: string;
  description: string;
  quantity: number;
  unit: string;
  unit_price: number;
};

export type ProposalStage = {
  title: string;
  duration: string;
  description: string;
};

export type ProposalContent = {
  template: "growth-automation";
  problem: string;
  solution: string;
  deliverables: string[];
  scope: ProposalScopeItem[];
  stages: ProposalStage[];
  payment_terms: string;
  notes: string;
  catalog_snapshot: CatalogSnapshotItem[];
};

export type ProposalListItem = {
  id: string;
  public_id: string;
  title: string;
  client_company: string;
  client_name: string;
  status: string;
  total: number;
  revision: number;
  lead_public_id: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ProposalDetail = ProposalListItem & {
  client_contact: string;
  client_email: string;
  content: ProposalContent;
  sent_snapshot: Record<string, unknown> | null;
};

export type ProposalList = {
  items: ProposalListItem[];
  total: number;
  limit: number;
  offset: number;
};

export type ProposalSavePayload = {
  revision: number;
  title?: string;
  client_company?: string;
  client_name?: string;
  client_contact?: string;
  client_email?: string;
  content?: ProposalContent;
  status?: "draft" | "accepted" | "rejected";
};

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

export function fetchProposals(params: { status?: string; limit?: number } = {}) {
  const search = new URLSearchParams();
  if (params.status) search.set("status", params.status);
  search.set("limit", String(params.limit ?? 200));
  return request<ProposalList>(`/admin/proposals?${search.toString()}`);
}

export function fetchProposal(publicId: string): Promise<ProposalDetail> {
  return request<ProposalDetail>(`/admin/proposals/${encodeURIComponent(publicId)}`);
}

export function createProposal(payload: { client_company?: string } = {}) {
  return request<ProposalDetail>("/admin/proposals", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function createProposalFromLead(leadPublicId: string) {
  return request<ProposalDetail>(
    `/admin/proposals/from-lead/${encodeURIComponent(leadPublicId)}`,
    { method: "POST" },
  );
}

export function saveProposal(
  publicId: string,
  payload: ProposalSavePayload,
): Promise<ProposalDetail> {
  return request<ProposalDetail>(`/admin/proposals/${encodeURIComponent(publicId)}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export function duplicateProposal(publicId: string): Promise<ProposalDetail> {
  return request<ProposalDetail>(
    `/admin/proposals/${encodeURIComponent(publicId)}/duplicate`,
    { method: "POST" },
  );
}

export function sendProposal(publicId: string): Promise<ProposalDetail> {
  return request<ProposalDetail>(`/admin/proposals/${encodeURIComponent(publicId)}/send`, {
    method: "POST",
  });
}

export function deleteProposal(publicId: string): Promise<void> {
  return request<void>(`/admin/proposals/${encodeURIComponent(publicId)}`, {
    method: "DELETE",
  });
}
