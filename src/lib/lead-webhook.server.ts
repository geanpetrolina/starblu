/**
 * Destino real dos leads (CRM de atendimento).
 * Arquivo *.server.ts: nunca é incluído no bundle do navegador.
 */

import type { LeadPayload } from "@/lib/lead";

const CRM_WEBHOOK_URL =
  "https://starblu-leads-v4.fly.dev/webhook/lead?token=3zUBXhq3E4hac_3Q0zoWUS2RfWsTXeOC";
const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbygrYIg2E8JOsYE0_JpcYUaWRZoiRTf3rLj7JXRvW3gBzaT_yh16GC4PCz6OWY8epi7/exec";

async function postLead(url: string, payload: LeadPayload, destination: string): Promise<void> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`${destination} respondeu ${response.status}: ${body}`);
  }
}

export async function forwardLead(payload: LeadPayload): Promise<void> {
  await postLead(CRM_WEBHOOK_URL, payload, "CRM starblu-leads-v4");

  try {
    await postLead(SHEETS_WEBHOOK_URL, payload, "Google Sheets");
  } catch (error) {
    console.error("[lead] Falha ao sincronizar Google Sheets:", error);
  }
}
