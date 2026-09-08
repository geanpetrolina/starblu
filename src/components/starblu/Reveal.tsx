import type { ComponentProps } from "react";

import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

export interface RevealProps extends ComponentProps<"div"> {
  /** Atraso da animação em milissegundos. */
  delay?: number;
}

/** Wrapper de animação de entrada (fade + slight slide-up). */
export function Reveal({ delay = 0, className, style, ...props }: RevealProps) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      data-visible={visible}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms`, ...style }}
      {...props}
    />
  );
}
