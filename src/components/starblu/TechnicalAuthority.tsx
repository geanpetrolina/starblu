import { BadgeCheck, Gavel, Landmark, Stethoscope, UserRound } from "lucide-react";

import { Reveal } from "@/components/starblu/Reveal";
import { SectionHeading } from "@/components/starblu/SectionHeading";

/**
 * Foto oficial do Dr. Jadir.
 * Coloque o arquivo em `public/` (ex.: "/dr-jadir.jpg") e informe aqui.
 * Vazio = exibe o espaço reservado, sem imagem fictícia.
 */
const DOCTOR_PHOTO_URL = "";

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
      <div className="shell grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <div className="relative mx-auto max-w-sm overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
            {DOCTOR_PHOTO_URL ? (
              <img
                src={DOCTOR_PHOTO_URL}
                alt="Dr. Jadir, Diretor Técnico da Starblu"
                width={640}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            ) : (
              <div
                data-photo-placeholder="foto-oficial-dr-jadir"
                className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 bg-sky-soft px-6 text-center"
              >
                <UserRound aria-hidden="true" className="h-10 w-10 text-brand" />
                <p className="font-display text-sm font-bold text-navy">
                  Espaço reservado para a foto oficial do Dr. Jadir
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Adicione o arquivo em <code>public/</code> e informe o caminho em
                  <code> DOCTOR_PHOTO_URL</code>.
                </p>
              </div>
            )}
            <div className="border-t border-border bg-card p-5">
              <p className="font-display text-base font-extrabold text-navy">Dr. Jadir</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Diretor Técnico · Medicina do Trabalho
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
