import { Mail, MapPin, Phone } from "lucide-react";

import { Logo } from "@/components/starblu/Logo";
import { siteConfig } from "@/config/site";

const solutions = [
  "Medicina Ocupacional",
  "Segurança do Trabalho",
  "SST",
  "eSocial",
  "Treinamentos NR",
];

const mapQuery =
  "R. Dr. Luiz de Freitas Melro, 395 - Centro, Blumenau - SC, 89010-310";

export function Footer() {
  const { contact, brand } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="navy-panel border-t border-navy-foreground/10 pb-24 sm:pb-0">
      <div className="shell grid gap-10 py-12 lg:grid-cols-[1.2fr_1fr_1fr] lg:py-14">
        <div>
          <Logo tone="light" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy-foreground/70">
            Medicina Ocupacional, Segurança do Trabalho, SST e eSocial para empresas de{" "}
            {brand.region}.
          </p>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-[0.12em] text-navy-foreground uppercase">
            Soluções
          </h2>
          <ul className="mt-4 space-y-2">
            {solutions.map((item) => (
              <li key={item} className="text-sm text-navy-foreground/70">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-[0.12em] text-navy-foreground uppercase">
            Contato
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/70">
            <li className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
              <span>{contact.address || `${brand.region} — endereço a informar`}</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
              {contact.phone ? (
                <a href={`tel:${contact.phone.replace(/\D/g, "")}`} className="hover:text-sky">
                  {contact.phone}
                </a>
              ) : (
                <span>Telefone a informar</span>
              )}
            </li>
            <li className="flex items-start gap-2">
              <Mail aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sky" />
              {contact.email ? (
                <a href={`mailto:${contact.email}`} className="hover:text-sky">
                  {contact.email}
                </a>
              ) : (
                <span>E-mail a informar</span>
              )}
            </li>
          </ul>
        </div>
      </div>


      <div className="border-t border-navy-foreground/10">
        <div className="shell flex flex-col gap-3 py-5 text-xs text-navy-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} Starblu — Medicina e Segurança do Trabalho. Todos os direitos reservados.
          </p>
          <nav aria-label="Links legais" className="flex gap-5">
            <a href="#contato" className="transition-colors hover:text-sky">
              Política de Privacidade
            </a>
            <a href="#contato" className="transition-colors hover:text-sky">
              Termos de Uso
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
