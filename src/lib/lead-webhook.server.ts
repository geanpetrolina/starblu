/**
 * Destino real dos leads (CRM de atendimento).
 * Arquivo *.server.ts: nunca é incluído no bundle do navegador.
 */

import type { LeadPayload } from "@/lib/lead";

const CRM_WEBHOOK_URL =
  "https://starblu-leads-v4.fly.dev/webhook/lead?token=3zUBXhq3E4hac_3Q0zoWUS2RfWsTXeOC";
const SHEETS_WEBHOOK_URL =
  "https://script.google.com/a/macros/v4company.com/s/AKfycbygrYIg2E8JOsYE0_JpcYUaWRZoiRTf3rLj7JXRvW3gBzaT_yh16GC4PCz6OWY8epi7/exec";

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
  const results = await Promise.allSettled([
    postLead(CRM_WEBHOOK_URL, payload, "CRM starblu-leads-v4"),
    postLead(SHEETS_WEBHOOK_URL, payload, "Google Sheets"),
  ]);

  const failures = results.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );

  if (failures.length > 0) {
    throw new Error(
      failures
        .map((failure) =>
          failure.reason instanceof Error ? failure.reason.message : "Falha ao enviar lead",
        )
        .join("; "),
    );
  }
}
