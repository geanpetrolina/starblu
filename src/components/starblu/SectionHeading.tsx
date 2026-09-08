import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
  /** Nível semântico do título — mantém a hierarquia correta na página. */
  as?: "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "center",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className={cn("eyebrow", isDark && "text-sky")}>
          <span aria-hidden="true" className="h-px w-6 bg-current" />
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "mt-3 text-2xl font-extrabold sm:text-3xl lg:text-[2.5rem] lg:leading-[1.12]",
          isDark ? "text-navy-foreground" : "text-navy",
        )}
      >
        {title}
      </Tag>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            isDark ? "text-navy-foreground/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
