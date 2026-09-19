/**
 * Destino real dos leads (CRM de atendimento).
 * Arquivo *.server.ts: nunca é incluído no bundle do navegador.
 */

import type { LeadPayload } from "@/lib/lead";

const CRM_WEBHOOK_URL =
  "https://starblu-leads-v4.fly.dev/webhook/lead?token=3zUBXhq3E4hac_3Q0zoWUS2RfWsTXeOC";
const SHEETS_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbygrYIg2E8JOsYE0_JpcYUaWRZoiRTf3rLj7JXRvW3gBzaT_yh16GC4PCz6OWY8epi7/exec";
const MAKE_WEBHOOK_URL = "https://hook.us1.make.celonis.com/7ff0tgnk2f3se3hjkb7am7wwosfkw9ca";

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

  const secondaryDestinations = [
    [SHEETS_WEBHOOK_URL, "Google Sheets"],
    [MAKE_WEBHOOK_URL, "Make"],
  ] as const;

  const results = await Promise.allSettled(
    secondaryDestinations.map(([url, destination]) => postLead(url, payload, destination)),
  );

  results.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(
        `[lead] Falha ao sincronizar ${secondaryDestinations[index][1]}:`,
        result.reason,
      );
    }
  });
}
