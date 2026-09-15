/**
 * Server function que encaminha o lead ao CRM.
 * O envio acontece no servidor para evitar bloqueios de CORS e manter o
 * token do webhook fora do navegador.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().min(1).max(200),
  phone: z.string().min(1).max(40),
  email: z.string().email().max(200),
  company: z.string().min(1).max(200),
  employees: z.string().max(60),
  service: z.string().max(120),
  page: z.string().max(600).optional().default(""),
  timestamp: z.string().max(40),
  utm_source: z.string().max(200).optional().default(""),
  utm_medium: z.string().max(200).optional().default(""),
  utm_campaign: z.string().max(200).optional().default(""),
  utm_content: z.string().max(200).optional().default(""),
  utm_term: z.string().max(200).optional().default(""),
  gclid: z.string().max(300).optional().default(""),
  fbclid: z.string().max(300).optional().default(""),
});

export const sendLead = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => leadSchema.parse(data))
  .handler(async ({ data }) => {
    const { forwardLead } = await import("@/lib/lead-webhook.server");
    await forwardLead(data);
    return { ok: true as const };
  });
