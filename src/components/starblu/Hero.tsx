import { CheckCircle2, MapPin, ShieldCheck } from "lucide-react";

import heroAsset from "@/assets/dr-jadir-consultorio-v2.jpg.asset.json";
import { CtaButton } from "@/components/starblu/CtaButton";
import { Reveal } from "@/components/starblu/Reveal";

const microProofs = [
  { icon: ShieldCheck, label: "10 anos de atuação" },
  { icon: CheckCircle2, label: "+1.000 empresas atendidas" },
  { icon: MapPin, label: "Blumenau e região" },
];

export function Hero() {
  return (
    <section id="top" className="navy-panel relative overflow-hidden">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-70" />

      <div className="shell relative grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <div>
          <Reveal>
            <p className="eyebrow text-sky">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              Medicina Ocupacional · SST · eSocial
            </p>
            <h1 className="mt-5 text-3xl font-extrabold leading-[1.1] text-navy-foreground sm:text-4xl lg:text-[3.35rem]">
              Medicina e Segurança do Trabalho em Blumenau
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-navy-foreground/80 sm:text-lg">
              Deixe sua empresa em dia com SST, eSocial e obrigações trabalhistas sem complicação.
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-navy-foreground/65">
              Exames ocupacionais, laudos, PGR, PCMSO, eSocial, treinamentos e consultoria em um
              único parceiro.
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaButton trackingId="hero_primary" href="#contato">
              Quero falar com um especialista
            </CtaButton>
            <CtaButton trackingId="hero_secondary" href="#diagnostico" variant="outlineDark">
              Verificar minha empresa
            </CtaButton>
          </Reveal>

          <Reveal delay={200} className="mt-9">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {microProofs.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-2 text-sm font-medium text-navy-foreground/85"
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-sky" />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={140} className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-navy-foreground/12 bg-navy-deep/40 shadow-card">
            <img
              src={heroAsset.url}
              alt="Dr. Jadir dos Santos Lima, Diretor Técnico da Starblu, no consultório em Blumenau"
              width={1200}
              height={1500}
              fetchPriority="high"
              decoding="async"
              className="aspect-[4/5] w-full object-cover object-[50%_20%] sm:aspect-[16/10] lg:aspect-[4/5]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-deep via-navy-deep/60 to-transparent"
            />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-navy-foreground/12 bg-navy-deep/70 p-4 backdrop-blur-sm">
              <p className="text-sm font-semibold text-navy-foreground">
                SST simples, completo e próximo da sua empresa.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-navy-foreground/70">
                Atendimento local, equipe especializada e acompanhamento contínuo das obrigações.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
