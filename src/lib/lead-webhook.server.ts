/**
 * Destino real dos leads (CRM de atendimento).
 * Arquivo *.server.ts: nunca é incluído no bundle do navegador.
 */

import type { LeadPayload } from "@/lib/lead";

const WEBHOOK_URL =
  "https://starblu-leads-v4.fly.dev/webhook/lead?token=3zUBXhq3E4hac_3Q0zoWUS2RfWsTXeOC";

export async function forwardLead(payload: LeadPayload): Promise<void> {
  const response = await fetch(WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Webhook respondeu ${response.status}: ${body}`);
  }
}
