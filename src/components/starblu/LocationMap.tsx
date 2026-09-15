import { MapPin } from "lucide-react";

import { Reveal } from "@/components/starblu/Reveal";
import { siteConfig } from "@/config/site";

const mapQuery =
  "R. Dr. Luiz de Freitas Melro, 395 - Centro, Blumenau - SC, 89010-310";

export function LocationMap() {
  const { contact } = siteConfig;

  return (
    <section aria-labelledby="onde-estamos" className="bg-background py-16 lg:py-20">
      <div className="shell">
        <Reveal>
          <p className="eyebrow text-primary">
            <span aria-hidden="true" className="h-px w-6 bg-current" />
            Onde estamos
          </p>
          <h2
            id="onde-estamos"
            className="mt-4 text-2xl font-extrabold text-foreground sm:text-3xl"
          >
            Atendimento presencial no Centro de Blumenau
          </h2>
          <p className="mt-3 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            {contact.address}
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border shadow-soft">
            <iframe
              title="Mapa da Starblu em Blumenau"
              src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&hl=pt-BR&z=17&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 sm:h-96"
            />
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            Abrir no Google Maps
          </a>
        </Reveal>
      </div>
    </section>
  );
}
