/**
 * Função centralizada de envio de lead.
 *
 * O payload é montado sempre da mesma forma, independente de onde o
 * formulário for usado, e enviado para o endpoint PHP `/lead.php`, que roda
 * na própria hospedagem e encaminha os dados ao CRM. Nenhum token de
 * webhook trafega no JavaScript do navegador.
 */

import { captureCampaignParams, type CampaignParams } from "@/lib/tracking";

/** Endpoint server-side responsável por encaminhar o lead ao CRM. */
export const LEAD_ENDPOINT = "/lead.php";

export interface LeadInput {
  name: string;
  phone: string;
  email: string;
  company: string;
  employees: string;
  service: string;
}

export interface LeadPayload extends LeadInput, CampaignParams {
  page: string;
  timestamp: string;
}

export type LeadResult =
  | { status: "sent" }
  | { status: "not_configured"; payload: LeadPayload }
  | { status: "error"; message: string };

export function buildLeadPayload(input: LeadInput): LeadPayload {
  const campaign = captureCampaignParams();

  return {
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(),
    company: input.company.trim(),
    employees: input.employees,
    service: input.service,
    page: typeof window === "undefined" ? "" : window.location.href,
    ...campaign,
    timestamp: new Date().toISOString(),
  };
}

export async function submitLead(input: LeadInput): Promise<LeadResult> {
  const payload = buildLeadPayload(input);

  try {
    const response = await fetch(LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    const data = (await response.json().catch(() => null)) as
      | { ok?: boolean; error?: string }
      | null;

    if (!response.ok || !data?.ok) {
      return {
        status: "error",
        message: data?.error ?? `Falha no envio (HTTP ${response.status}).`,
      };
    }

    return { status: "sent" };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Falha de rede.",
    };
  }
}
