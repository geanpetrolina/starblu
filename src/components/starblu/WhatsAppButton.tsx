import { MessageCircle } from "lucide-react";

import { trackEvent } from "@/lib/tracking";
import { hasWhatsapp, whatsappLink } from "@/lib/whatsapp";

/**
 * WhatsApp flutuante: discreto no desktop (canto inferior direito) e
 * barra fixa no mobile. O número é configurado em `siteConfig.whatsapp`.
 */
export function WhatsAppButton() {
  if (!hasWhatsapp()) return null;

  const href = whatsappLink();

  return (
    <>
      {/* Mobile: barra fixa inferior */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 py-3 backdrop-blur-md sm:hidden">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("click_whatsapp", { location: "mobile_bar" })}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-display text-sm font-bold tracking-[0.06em] text-primary-foreground uppercase shadow-brand"
        >
          <MessageCircle aria-hidden="true" className="h-[1.1rem] w-[1.1rem]" />
          Falar no WhatsApp
        </a>
      </div>

      {/* Desktop: botão flutuante */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("click_whatsapp", { location: "floating" })}
        aria-label="Falar com um especialista da Starblu no WhatsApp"
        className="group fixed right-6 bottom-6 z-50 hidden items-center gap-2 rounded-full border border-border bg-card py-3 pr-5 pl-4 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 sm:inline-flex"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <MessageCircle aria-hidden="true" className="h-[1.05rem] w-[1.05rem]" />
        </span>
        <span className="text-sm font-semibold text-navy transition-colors group-hover:text-brand">
          Falar no WhatsApp
        </span>
      </a>
    </>
  );
}
