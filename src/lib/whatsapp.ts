import { siteConfig } from "@/config/site";
import type { LeadInput } from "@/lib/lead";

export function leadWhatsAppMessage(input: LeadInput): string {
  return [
    "Olá! Quero falar com um especialista da Starblu.",
    "",
    `Nome: ${input.name}`,
    `WhatsApp: ${input.phone}`,
    `E-mail: ${input.email}`,
    `Empresa: ${input.company}`,
    `Funcionários: ${input.employees}`,
    `Necessidade: ${input.service}`,
  ].join("\\n");
}

/** Monta o link do WhatsApp com a mensagem pré-preenchida. */
export function whatsappLink(message: string = siteConfig.whatsapp.message): string {
  const number = siteConfig.whatsapp.number.replace(/\D/g, "");
  if (!number) return "#contato";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function hasWhatsapp(): boolean {
  return siteConfig.whatsapp.number.replace(/\D/g, "").length > 0;
}
