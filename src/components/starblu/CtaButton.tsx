import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/tracking";

type Variant = "primary" | "outlineLight" | "outlineDark";
type Size = "md" | "lg";

export interface CtaButtonProps extends ComponentProps<"a"> {
  /** Identificação do CTA no tracking (ex.: "hero_primary"). */
  trackingId: string;
  variant?: Variant;
  size?: Size;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-brand hover:bg-brand/90 active:translate-y-px",
  outlineLight:
    "border border-navy/20 bg-background text-navy hover:border-brand hover:bg-brand-soft",
  outlineDark:
    "border border-navy-foreground/30 bg-navy-foreground/5 text-navy-foreground hover:border-sky hover:bg-navy-foreground/10",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-3 text-[0.8rem]",
  lg: "px-6 py-4 text-sm sm:px-8",
};

/**
 * CTA padrão da landing page. Registra o evento `click_cta` com o
 * identificador informado antes de seguir para o destino.
 */
export function CtaButton({
  trackingId,
  variant = "primary",
  size = "lg",
  className,
  onClick,
  children,
  ...props
}: CtaButtonProps) {
  return (
    <a
      {...props}
      onClick={(event) => {
        trackEvent("click_cta", { cta_id: trackingId, cta_text: String(children ?? "") });
        onClick?.(event);
      }}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-xl font-display font-bold tracking-[0.06em] uppercase transition-all duration-200 sm:w-auto",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
