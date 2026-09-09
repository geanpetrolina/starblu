import { ClipboardCheck } from "lucide-react";

import { CtaButton } from "@/components/starblu/CtaButton";
import { Reveal } from "@/components/starblu/Reveal";

const checkpoints = [
  "Programas e laudos vigentes",
  "Exames ocupacionais em dia",
  "Informações de SST no eSocial",
  "Treinamentos obrigatórios aplicáveis",
];

export function DiagnosticSection() {
  return (
    <section id="diagnostico" className="bg-background py-16 lg:py-24">
      <div className="shell">
        <Reveal className="navy-panel relative overflow-hidden rounded-3xl px-6 py-12 lg:px-14 lg:py-16">
          <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="eyebrow text-sky">
                <span aria-hidden="true" className="h-px w-6 bg-current" />
                Avaliação consultiva
              </p>
              <h2 className="mt-4 text-2xl font-extrabold text-navy-foreground sm:text-3xl lg:text-[2.35rem] lg:leading-tight">
                Sua empresa está realmente em dia com SST?
              </h2>
              <p className="mt-4 max-w-lg text-base leading-relaxed text-navy-foreground/78">
                Converse com um especialista Starblu e entenda quais soluções podem ser necessárias
                para sua empresa.
              </p>
              <div className="mt-8">
                <CtaButton trackingId="diagnostic" href="#contato">
                  Quero verificar minha empresa
                </CtaButton>
              </div>
            </div>

            <ul className="grid gap-3 rounded-2xl border border-navy-foreground/12 bg-navy-deep/45 p-5 backdrop-blur-sm">
              {checkpoints.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-navy-foreground/90"
                >
                  <ClipboardCheck aria-hidden="true" className="h-[1.1rem] w-[1.1rem] text-sky" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
