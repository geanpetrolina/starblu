import { Building2, CalendarClock, Quote, Star } from "lucide-react";

import { Reveal } from "@/components/starblu/Reveal";
import { SectionHeading } from "@/components/starblu/SectionHeading";

/**
 * Depoimentos reais da Starblu — avaliações públicas do Google.
 */
interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Atendimento rápido e prático, como deve ser, tanto na recepção quanto em meu exame admissional. Além disso, recebemos um café quentinho ao entrar, pela recepcionista!",
    author: "Gustavo Lepinski",
    company: "Avaliação no Google",
  },
  {
    quote: "Sempre fiz meus exames lá e nunca tive problemas. Estão de parabéns.",
    author: "Jonathan",
    company: "Avaliação no Google",
  },
  {
    quote:
      "Muito bom o atendimento, equipe qualificada, estão todos de parabéns. Localização muito boa com amplo estacionamento. Gratidão pela atenção de todos.",
    author: "Michael Matias Saturno",
    company: "Avaliação no Google",
  },
];

/**
 * Logos reais de clientes. Coloque os arquivos em `public/` e liste-os
 * aqui como { src, alt }. Vazio = a faixa de logos não é exibida.
 */
const clientLogos: { src: string; alt: string }[] = [];

const validatedProofs = [
  { icon: CalendarClock, label: "10 anos de atuação em Medicina e Segurança do Trabalho" },
  { icon: Building2, label: "+1.000 empresas atendidas" },
];

export function SocialProof() {
  return (
    <section id="prova-social" className="bg-surface py-16 lg:py-24">
      <div className="shell">
        <SectionHeading
          eyebrow="Prova social"
          title="Empresas de Blumenau e região já confiam na Starblu"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {validatedProofs.map(({ icon: Icon, label }, index) => (
            <Reveal
              key={label}
              delay={index * 80}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft"
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <Icon aria-hidden="true" className="h-5 w-5" />
              </span>
              <p className="font-display text-sm font-bold leading-snug text-navy sm:text-base">
                {label}
              </p>
            </Reveal>
          ))}
        </div>

        {testimonials.length > 0 ? (
          <div className="mt-6 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal
                key={item.author}
                delay={index * 70}
                className="h-full rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="flex items-center gap-2">
                  <span aria-hidden="true" className="flex items-center gap-0.5 text-brand">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <Star key={star} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </span>
                  <span className="sr-only">Avaliação 5 de 5 estrelas</span>
                  <Quote aria-hidden="true" className="ml-auto h-5 w-5 text-brand/35" />
                </div>
                <blockquote className="mt-3 text-sm leading-relaxed text-navy">
                  {item.quote}
                </blockquote>
                <footer className="mt-4 border-t border-border pt-3">
                  <p className="text-sm font-semibold text-navy">{item.author}</p>
                  <p className="text-xs text-muted-foreground">{item.company}</p>
                </footer>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal
            delay={120}
            data-content-placeholder="depoimentos-reais-starblu"
            className="mt-6 rounded-2xl border border-dashed border-input bg-card p-6 text-center"
          >
            <p className="font-display text-sm font-bold text-navy">
              Espaço reservado para os depoimentos reais de clientes
            </p>
            <p className="mx-auto mt-2 max-w-xl text-xs leading-relaxed text-muted-foreground">
              Envie os depoimentos autorizados (texto ou imagem) e as logos de clientes para
              publicá-los aqui. Nenhum depoimento foi criado para preencher este espaço.
            </p>
          </Reveal>
        )}

        {clientLogos.length > 0 ? (
          <Reveal
            delay={160}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 rounded-2xl border border-border bg-card px-6 py-7"
          >
            {clientLogos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.alt}
                loading="lazy"
                decoding="async"
                className="h-8 w-auto object-contain opacity-70 transition-opacity hover:opacity-100"
              />
            ))}
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
