import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

import { CtaButton } from "@/components/starblu/CtaButton";
import { Logo } from "@/components/starblu/Logo";
import { cn } from "@/lib/utils";
import { hasWhatsapp, whatsappLink } from "@/lib/whatsapp";
import { trackEvent } from "@/lib/tracking";

const navItems = [
  { label: "Serviços", href: "#servicos" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "Responsável técnico", href: "#autoridade" },
  { label: "Dúvidas", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/92 backdrop-blur-md"
          : "border-transparent bg-background",
      )}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-20">
        <a href="#top" aria-label="Starblu — início" className="shrink-0">
          <Logo />
        </a>

        <nav aria-label="Navegação principal" className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-brand"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {hasWhatsapp() ? (
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("click_whatsapp", { location: "header" })}
              className="hidden items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brand sm:inline-flex"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp
            </a>
          ) : null}
          <CtaButton trackingId="header" href="#contato" size="md" className="hidden sm:inline-flex">
            Falar com um especialista
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
