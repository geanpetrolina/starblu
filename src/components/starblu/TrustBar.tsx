import { Building2, CalendarClock, MapPin, Stethoscope } from "lucide-react";

import { Reveal } from "@/components/starblu/Reveal";

const indicators = [
  { icon: CalendarClock, value: "10 anos", label: "de experiência" },
  { icon: Building2, value: "+1.000", label: "empresas atendidas" },
  { icon: MapPin, value: "Atuação local", label: "Blumenau e região" },
  {
    icon: Stethoscope,
    value: "Equipe especializada",
    label: "em Medicina e Segurança do Trabalho",
  },
];

export function TrustBar() {
  return (
    <section aria-label="Indicadores Starblu" className="border-b border-border bg-surface">
      <div className="shell grid grid-cols-1 gap-6 py-9 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {indicators.map(({ icon: Icon, value, label }, index) => (
          <Reveal
            key={value}
            delay={index * 70}
            className="flex items-start gap-3 lg:border-l lg:border-border lg:pl-5 lg:first:border-l-0 lg:first:pl-0"
          >
            <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-brand">
              <Icon aria-hidden="true" className="h-[1.15rem] w-[1.15rem]" />
            </span>
            <div>
              <p className="font-display text-base font-extrabold leading-tight text-navy">
                {value}
              </p>
              <p className="mt-0.5 text-sm leading-snug text-muted-foreground">{label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
