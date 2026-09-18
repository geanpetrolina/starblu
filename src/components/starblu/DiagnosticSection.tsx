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
        <Reveal className="navy-panel relative overflow-hidden rounded-3xl">
          <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />

          <div className="relative grid items-stretch lg:grid-cols-2">
            <div className="px-6 py-12 lg:px-12 lg:py-16">
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

              <ul className="mt-7 grid gap-2.5">
                {checkpoints.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm font-medium text-navy-foreground/88"
                  >
                    <ClipboardCheck aria-hidden="true" className="h-[1.1rem] w-[1.1rem] text-sky" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <CtaButton trackingId="diagnostic" href="#contato">
                  Quero verificar minha empresa
                </CtaButton>
              </div>
            </div>

            <div className="relative min-h-64 lg:min-h-full">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image.png-zaONDLxox6f8JQKVXd27ULD5rb1Uc2.jpeg"
                alt="Dr. Jadir dos Santos Lima em seu consultório, usando jaleco e estetoscópio"
                width={1600}
                height={1600}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[60%_center]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/25 to-transparent lg:from-navy-deep lg:via-navy-deep/35"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
