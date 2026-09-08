import {
  AlarmClock,
  ClipboardList,
  FileWarning,
  ScrollText,
  Users,
  UserSearch,
} from "lucide-react";

import { CtaButton } from "@/components/starblu/CtaButton";
import { Reveal } from "@/components/starblu/Reveal";
import { SectionHeading } from "@/components/starblu/SectionHeading";

const pains = [
  { icon: FileWarning, title: "Documentos e laudos desatualizados" },
  { icon: ScrollText, title: "Obrigações de SST e eSocial" },
  { icon: AlarmClock, title: "Dificuldade para acompanhar prazos" },
  { icon: ClipboardList, title: "Riscos de não conformidade" },
  { icon: Users, title: "Sobrecarga da equipe de RH" },
  { icon: UserSearch, title: "Falta de acompanhamento especializado" },
];

export function PainSection() {
  return (
    <section id="desafios" className="bg-background py-16 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="O desafio do RH"
          title="SST não precisa ser mais uma preocupação para o seu RH."
          description="Manter exames, documentos, programas, treinamentos e informações do eSocial em dia exige acompanhamento constante. Quando esse processo é tratado de forma desorganizada, sua empresa perde tempo e aumenta sua exposição a riscos."
        />

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pains.map(({ icon: Icon, title }, index) => (
            <li key={title}>
              <Reveal
                delay={index * 60}
                className="group h-full rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/35 hover:shadow-card"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sky-soft text-brand transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
                  <Icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <p className="mt-4 font-display text-base font-bold leading-snug text-navy">
                  {title}
                </p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={120} className="mt-10 flex justify-center">
          <CtaButton trackingId="pain_section" href="#contato">
            Quero avaliar a situação da minha empresa
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
