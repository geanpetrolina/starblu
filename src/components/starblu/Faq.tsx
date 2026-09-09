import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/starblu/Reveal";
import { SectionHeading } from "@/components/starblu/SectionHeading";

export const faqItems = [
  {
    question: "Quais empresas precisam de Medicina e Segurança do Trabalho?",
    answer:
      "De forma geral, empresas que possuem colaboradores contratados precisam atender às obrigações de saúde e segurança do trabalho, incluindo exames ocupacionais e programas previstos nas Normas Regulamentadoras. As exigências específicas variam conforme a atividade, o grau de risco e o número de colaboradores. Um especialista da Starblu pode avaliar o caso da sua empresa.",
  },
  {
    question: "Quais exames ocupacionais a Starblu realiza?",
    answer:
      "A Starblu atende os exames ocupacionais aplicáveis à rotina das empresas: admissional, periódico, demissional, mudança de função e retorno ao trabalho, além dos exames complementares indicados conforme a função e os riscos identificados.",
  },
  {
    question: "O que é PGR?",
    answer:
      "O PGR (Programa de Gerenciamento de Riscos) é o documento que organiza a identificação dos riscos ocupacionais da empresa e o plano de ação para preveni-los e controlá-los, conforme previsto na NR-01.",
  },
  {
    question: "O que é PCMSO?",
    answer:
      "O PCMSO (Programa de Controle Médico de Saúde Ocupacional) define o acompanhamento da saúde dos colaboradores, incluindo os exames médicos aplicáveis a cada função, com base nos riscos identificados. Ele é previsto na NR-07 e possui responsabilidade técnica médica.",
  },
  {
    question: "A Starblu trabalha com eSocial SST?",
    answer:
      "Sim. A Starblu oferece consultoria e apoio na gestão das informações de SST relacionadas às obrigações do eSocial, ajudando a manter os dados organizados e consistentes com os documentos da empresa.",
  },
  {
    question: "Quais treinamentos a Starblu oferece?",
    answer:
      "São oferecidos treinamentos presenciais e online, incluindo NR-10, NR-12, NR-35, primeiros socorros, combate a incêndio e outros aplicáveis à atividade da empresa.",
  },
  {
    question: "A Starblu atende empresas fora de Blumenau?",
    answer:
      "A atuação é concentrada em Blumenau e região. Para empresas de outras localidades, o atendimento é avaliado caso a caso — fale com um especialista para verificar a viabilidade.",
  },
  {
    question: "Como funciona a contratação?",
    answer:
      "O primeiro passo é conversar com um especialista para entender as necessidades da sua empresa. A partir dessa avaliação, a Starblu apresenta as soluções aplicáveis e orienta os próximos passos do atendimento.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-background py-16 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Dúvidas frequentes"
          title="Perguntas comuns sobre Medicina e Segurança do Trabalho"
        />

        <Reveal className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="overflow-hidden rounded-2xl border border-border bg-card px-5 transition-colors data-[state=open]:border-brand/35"
              >
                <AccordionTrigger className="py-4 text-left font-display text-base font-bold text-navy hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
