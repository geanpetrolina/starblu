import logoAsset from "@/assets/starblu-logo.png.asset.json";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export interface LogoProps {
  /** Variante de cor do texto conforme o fundo da seção. */
  tone?: "navy" | "light";
  className?: string;
}

/**
 * Logo oficial da Starblu (emblema + assinatura tipográfica).
 *
 * O emblema não é redesenhado: é a marca da própria Starblu. Para trocar
 * por um arquivo vetorial oficial, informe o caminho em
 * `siteConfig.brand.logoUrl` — ele passa a ser usado no lugar deste.
 */
export function Logo({ tone = "navy", className }: LogoProps) {
  const isLight = tone === "light";
  const src = siteConfig.brand.logoUrl || logoAsset.url;

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <img
        src={src}
        alt={siteConfig.brand.logoAlt}
        width={849}
        height={861}
        className="h-10 w-10 shrink-0 object-contain lg:h-11 lg:w-11"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-extrabold tracking-tight lg:text-xl",
            isLight ? "text-navy-foreground" : "text-navy",
          )}
        >
          STARBLU
        </span>
        <span
          className={cn(
            "mt-1 text-[0.55rem] font-semibold tracking-[0.14em] uppercase",
            isLight ? "text-navy-foreground/65" : "text-muted-foreground",
          )}
        >
          Medicina e Segurança do Trabalho
        </span>
      </span>
    </span>
  );
}
