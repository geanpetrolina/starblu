/**
 * Função centralizada de envio de lead.
 *
 * O payload é montado sempre da mesma forma, independente de onde o
 * formulário for usado. Se `webhookUrl` não estiver configurado, o envio
 * não acontece e o chamador é informado — nunca enviamos para um endpoint
 * fictício.
 */

import { siteConfig } from "@/config/site";
import { captureCampaignParams, type CampaignParams } from "@/lib/tracking";

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
  const endpoint = siteConfig.webhookUrl;

  if (!endpoint) {
    // Placeholder ainda não preenchido: registramos localmente para debug.
    console.info("[lead] WEBHOOK_URL não configurado. Payload pronto:", payload);
    return { status: "not_configured", payload };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return { status: "error", message: `Resposta ${response.status} do servidor.` };
    }

    return { status: "sent" };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Falha de rede.",
    };
  }
}
