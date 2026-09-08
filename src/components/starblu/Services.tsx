import { BookOpenCheck, FileCheck2, GraduationCap, HeartPulse, Scale, Workflow } from "lucide-react";

import { CtaButton } from "@/components/starblu/CtaButton";
import { Reveal } from "@/components/starblu/Reveal";
import { SectionHeading } from "@/components/starblu/SectionHeading";

const services = [
  {
    icon: HeartPulse,
    title: "Medicina Ocupacional",
    description:
      "Exames admissionais, periódicos, demissionais, mudança de função e retorno ao trabalho.",
  },
  {
    icon: FileCheck2,
    title: "Laudos e programas de SST",
    description: "PGR, PCMSO, LTCAT, PPP e demais documentos aplicáveis.",
  },
  {
    icon: Workflow,
    title: "eSocial SST",
    description:
      "Consultoria e gestão das informações relacionadas às obrigações de SST.",
  },
  {
    icon: GraduationCap,
    title: "Treinamentos",
    description:
      "Treinamentos presenciais e online, incluindo NR-10, NR-12, NR-35, primeiros socorros, combate a incêndio e outros aplicáveis.",
  },
  {
    icon: Scale,
    title: "Perícias e assistência técnica",
    description: "Atuação especializada em processos trabalhistas e suporte técnico.",
  },
  {
    icon: BookOpenCheck,
    title: "Consultoria em SST",
    description:
      "Diagnóstico, planejamento e implementação de soluções de Saúde e Segurança do Trabalho.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="bg-surface py-16 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Soluções Starblu"
          title="Tudo o que sua empresa precisa para cuidar de SST em um só lugar."
          description="Um parceiro único para exames, documentos, programas, treinamentos e consultoria — com acompanhamento de quem conhece a realidade das empresas da região."
        />

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, title, description }, index) => (
            <Reveal
              key={title}
              delay={index * 60}
              className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/40 hover:shadow-card"
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-brand transition-transform duration-300 group-hover:scale-x-100"
              />
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-navy text-navy-foreground transition-colors group-hover:bg-brand">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold leading-snug text-navy">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-11 flex justify-center">
          <CtaButton trackingId="services" href="#contato">
            Falar com um especialista
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
