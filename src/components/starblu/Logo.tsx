import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /** Variante de cor conforme o fundo da seção. */
  tone?: "navy" | "light";
  className?: string;
}

/**
 * Logo da Starblu.
 *
 * Quando `siteConfig.brand.logoUrl` estiver preenchido com o arquivo oficial,
 * ele é usado sem qualquer alteração de forma ou proporção. Enquanto isso, um
 * wordmark provisório mantém o layout — ele deve ser substituído pela logo real.
 */
export function Logo({ tone = "navy", className }: LogoProps) {
  if (siteConfig.brand.logoUrl) {
    return (
      <img
        src={siteConfig.brand.logoUrl}
        alt={siteConfig.brand.logoAlt}
        className={cn("h-9 w-auto object-contain lg:h-10", className)}
        width={180}
        height={40}
      />
    );
  }

  const isLight = tone === "light";

  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      aria-label={siteConfig.brand.logoAlt}
      data-logo-placeholder="substituir-pela-logo-oficial"
    >
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className={cn("h-8 w-8 shrink-0", isLight ? "text-sky" : "text-brand")}
      >
        <path
          d="M16 2.5l3.1 8.2 8.4 1.2-6 6 1.6 8.6L16 22.4 8.9 26.5l1.6-8.6-6-6 8.4-1.2z"
          fill="currentColor"
        />
      </svg>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight lg:text-2xl",
          isLight ? "text-navy-foreground" : "text-navy",
        )}
      >
        STAR
        <span className={isLight ? "text-sky" : "text-brand"}>BLU</span>
      </span>
    </span>
  );
}
