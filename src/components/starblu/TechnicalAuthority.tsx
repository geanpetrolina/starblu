import { BadgeCheck, Gavel, Landmark, Mic, Stethoscope, UserRound } from "lucide-react";

import { Reveal } from "@/components/starblu/Reveal";
import { SectionHeading } from "@/components/starblu/SectionHeading";

const credentials = [
  { icon: Stethoscope, label: "Médico especialista em Medicina do Trabalho" },
  { icon: BadgeCheck, label: "CRM/SC 7870 · RQE 26814" },
  { icon: UserRound, label: "Diretor Técnico da Starblu" },
  { icon: Gavel, label: "Perito judicial" },
  { icon: Landmark, label: "Perito da Prefeitura de Blumenau" },
];

export function TechnicalAuthority() {
  return (
    <section id="autoridade" className="bg-background py-16 lg:py-24">
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-sm">
            <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-10%20at%2017.49.08-56KIkk6cOccyIv2fDcTEKhcjX1F5ze.jpeg"
                alt="Dr. Jadir dos Santos Lima, Diretor Técnico da Starblu, no consultório da empresa"
                width={1200}
                height={1500}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-[50%_top]"
              />
              <div className="border-t border-border bg-card p-5">
                <p className="font-display text-base font-extrabold text-navy">
                  Dr. Jadir dos Santos Lima
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Diretor Técnico · CRM/SC 7870 · RQE 26814
                </p>
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-2xl border border-border shadow-soft">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-09-10%20at%2017.49.00-xuKwQexwIHiFmzN0eHkJBUAtiYUieV.jpeg"
                alt="Dr. Jadir palestrando na X Conferência Nacional de Medicina do Trabalho"
                width={1920}
                height={1078}
                loading="lazy"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
              <p className="flex items-center gap-2 bg-card px-4 py-3 text-xs text-muted-foreground">
                <Mic aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-brand" />
                Palestrante na X Conferência Nacional de Medicina do Trabalho
              </p>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Responsabilidade técnica"
            align="left"
            title="Responsabilidade técnica de quem entende do assunto."
            description="A Starblu conta com responsabilidade técnica especializada para oferecer às empresas um atendimento baseado em conhecimento técnico, experiência e conformidade."
          />

          <ul className="mt-8 space-y-3">
            {credentials.map(({ icon: Icon, label }, index) => (
              <li key={label}>
                <Reveal
                  delay={index * 60}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-brand/35"
                >
                  <Icon aria-hidden="true" className="h-[1.1rem] w-[1.1rem] shrink-0 text-brand" />
                  <span className="text-sm font-medium text-navy">{label}</span>
                </Reveal>
              </li>
            ))}
          </ul>

          <Reveal
            delay={200}
            className="mt-7 rounded-2xl border-l-2 border-brand bg-sky-soft px-5 py-4"
          >
            <p className="text-sm leading-relaxed font-medium text-navy">
              “Nosso compromisso é ajudar sua empresa a cuidar da saúde ocupacional e da segurança
              dos seus colaboradores de forma simples, ágil e responsável.”
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
