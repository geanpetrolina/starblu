import { Reveal } from "@/components/starblu/Reveal";
import { SectionHeading } from "@/components/starblu/SectionHeading";

const differentials = [
  {
    number: "01",
    title: "10 anos de atuação",
    description:
      "Experiência construída ao longo de uma década atendendo empresas em Medicina e Segurança do Trabalho.",
  },
  {
    number: "02",
    title: "Atendimento próximo",
    description:
      "Atuação local em Blumenau e região, com proximidade e conhecimento da realidade das empresas.",
  },
  {
    number: "03",
    title: "Soluções completas",
    description:
      "Exames, laudos, programas, treinamentos, perícias e consultoria em um único parceiro.",
  },
  {
    number: "04",
    title: "Equipe especializada",
    description:
      "Profissionais qualificados para apoiar sua empresa nas demandas de saúde e segurança do trabalho.",
  },
  {
    number: "05",
    title: "Praticidade",
    description:
      "Processos simples, atendimento próximo e soluções pensadas para facilitar a rotina do RH.",
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="navy-panel relative overflow-hidden py-16 lg:py-24">
      <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-60" />

      <div className="shell relative">
        <SectionHeading
          eyebrow="Diferenciais"
          tone="dark"
          title="Por que empresas de Blumenau e região escolhem a Starblu?"
        />

        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-navy-foreground/12 bg-navy-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item, index) => (
            <Reveal
              key={item.number}
              delay={index * 70}
              className="group bg-navy/85 p-6 transition-colors duration-300 hover:bg-navy-deep lg:p-8"
            >
              <span className="font-display text-3xl font-extrabold text-sky/45 transition-colors group-hover:text-sky">
                {item.number}
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold text-navy-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">
                {item.description}
              </p>
            </Reveal>
          ))}
          <Reveal
            delay={350}
            className="hidden bg-navy/60 p-6 lg:flex lg:flex-col lg:justify-center lg:p-8"
          >
            <p className="font-display text-lg font-extrabold leading-snug text-navy-foreground">
              Um parceiro de SST, não apenas um emissor de laudos.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">
              A Starblu acompanha as demandas de saúde e segurança do trabalho da sua empresa de
              ponta a ponta.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
