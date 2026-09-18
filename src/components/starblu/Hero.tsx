import { CheckCircle2, MapPin, ShieldCheck } from "lucide-react";

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

      <div className="shell relative flex max-w-4xl flex-col gap-8 py-10 lg:gap-10 lg:py-24">
        <div className="contents lg:block">
          <Reveal className="order-1">
            <p className="eyebrow text-sky">
              <span aria-hidden="true" className="h-px w-6 bg-current" />
              Medicina Ocupacional · SST · eSocial
            </p>
            <h1 className="mt-4 text-[2rem] font-extrabold leading-[1.08] text-navy-foreground sm:text-4xl lg:mt-5 lg:text-[3.35rem]">
              Medicina e Segurança do Trabalho em Blumenau
            </h1>
            <h2 className="mt-4 max-w-xl text-base font-semibold leading-relaxed text-navy-foreground/90 sm:text-lg">
              Deixe sua empresa em dia com SST, eSocial e obrigações trabalhistas sem complicação.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-foreground/65 lg:mt-3">
              Exames ocupacionais, laudos, PGR, PCMSO, eSocial, treinamentos e consultoria em um
              único parceiro.
            </p>
          </Reveal>

          <Reveal delay={140} className="relative order-2 lg:order-none lg:mt-8">
            <div className="relative overflow-hidden rounded-3xl border border-navy-foreground/12 bg-navy-deep/40 shadow-card">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dr-jadir-hero-v3-w1heUziPchnYHBMnyKec2ZiND2qW4q.jpg"
                alt="Dr. Jadir dos Santos Lima, Diretor Técnico da Starblu, em seu consultório"
                width={1200}
                height={1500}
                fetchPriority="high"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-[50%_18%] sm:aspect-[16/10] lg:aspect-[4/5]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-navy-deep/85 via-transparent to-navy-deep/10"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-navy-foreground/12 bg-navy-deep/70 p-4 backdrop-blur-md">
                <p className="text-sm font-semibold text-navy-foreground">
                  SST simples, completo e próximo da sua empresa.
                </p>
                <p className="mt-1 text-xs leading-relaxed text-navy-foreground/70">
                  Atendimento local, equipe especializada e acompanhamento contínuo.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal
            delay={200}
            className="order-3 flex flex-col gap-3 sm:flex-row sm:items-center lg:order-none"
          >
            <CtaButton trackingId="hero_primary" href="#contato">
              Quero falar com um especialista
            </CtaButton>
            <CtaButton trackingId="hero_secondary" href="#diagnostico" variant="outlineDark">
              Verificar minha empresa
            </CtaButton>
          </Reveal>

          <Reveal delay={260} className="order-4 lg:order-none lg:mt-9">
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
      </div>
    </section>
  );
}
