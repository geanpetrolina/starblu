import { Check } from "lucide-react";

import { LeadForm } from "@/components/starblu/LeadForm";
import { Reveal } from "@/components/starblu/Reveal";

const highlights = [
  "Atendimento local em Blumenau e região",
  "Responsabilidade técnica especializada",
  "Exames, laudos, programas, treinamentos e consultoria",
];

export function FinalCta() {
  return (
    <section id="contato" className="navy-panel relative overflow-hidden py-16 lg:py-24">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />

      <div className="shell relative grid items-start gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow text-sky">
            <span aria-hidden="true" className="h-px w-6 bg-current" />
            Solicitar atendimento
          </p>
          <h2 className="mt-4 text-2xl font-extrabold text-navy-foreground sm:text-3xl lg:text-[2.5rem] lg:leading-tight">
            Sua empresa em dia. Seu RH mais tranquilo.
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-navy-foreground/78">
            Conte com uma equipe especializada para cuidar das demandas de Medicina e Segurança do
            Trabalho da sua empresa.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm font-medium text-navy-foreground/85"
              >
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky/15 text-sky">
                  <Check aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <LeadForm />
        </Reveal>
      </div>
    </section>
  );
}
