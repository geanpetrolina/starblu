import { siteConfig } from "@/config/site";

/** Monta o link do WhatsApp com a mensagem pré-preenchida. */
export function whatsappLink(message: string = siteConfig.whatsapp.message): string {
  const number = siteConfig.whatsapp.number.replace(/\D/g, "");
  if (!number) return "#contato";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function hasWhatsapp(): boolean {
  return siteConfig.whatsapp.number.replace(/\D/g, "").length > 0;
}
