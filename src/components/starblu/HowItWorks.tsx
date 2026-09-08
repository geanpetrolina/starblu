import { Reveal } from "@/components/starblu/Reveal";
import { SectionHeading } from "@/components/starblu/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Fale com a Starblu",
    description: "Conte rapidamente o que sua empresa precisa.",
  },
  {
    number: "02",
    title: "Entenda o que sua empresa precisa",
    description: "Um especialista avalia sua necessidade e orienta os próximos passos.",
  },
  {
    number: "03",
    title: "Tenha sua SST organizada",
    description: "Receba a solução adequada para sua empresa.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-surface py-16 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Como funciona"
          title="Três passos para organizar a SST da sua empresa."
        />

        <ol className="relative mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          <span
            aria-hidden="true"
            className="absolute top-[2.1rem] right-[12%] left-[12%] hidden h-px bg-border lg:block"
          />
          {steps.map((step, index) => (
            <li key={step.number} className="relative">
              <Reveal delay={index * 90} className="h-full text-center lg:text-left">
                <span className="relative z-10 inline-flex h-[4.2rem] w-[4.2rem] items-center justify-center rounded-2xl border border-border bg-card font-display text-xl font-extrabold text-brand shadow-soft">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
