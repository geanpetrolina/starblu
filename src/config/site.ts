/**
 * Configuração central da Landing Page Starblu.
 *
 * Todos os valores editáveis (logo, WhatsApp, webhook, IDs de tracking)
 * ficam aqui. Campos vazios ("") são placeholders intencionais: nada
 * fictício é enviado ou carregado enquanto não forem preenchidos.
 */

interface SiteConfig {
  brand: { name: string; logoUrl: string; logoAlt: string; region: string };
  whatsapp: { number: string; message: string };
  contact: { phone: string; email: string; address: string };
  webhookUrl: string;
  tracking: {
    gtmId: string;
    ga4Id: string;
    googleAdsId: string;
    googleAdsConversionLabel: string;
    metaPixelId: string;
  };
}

export const siteConfig: SiteConfig = {
  brand: {
    name: "Starblu",
    /**
     * Caminho da logo oficial da Starblu.
     * Coloque o arquivo em `public/` (ex.: "/starblu-logo.svg" ou
     * "/starblu-logo.png") e informe o caminho aqui.
     * Enquanto estiver vazio, é exibido o wordmark provisório.
     */
    logoUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-4mnKYZQ6iHx4semWTod6GM7Wj88zJ8.png",
    logoAlt: "Starblu — Medicina e Segurança do Trabalho",
    region: "Blumenau e região",
  },

  /**
   * WhatsApp comercial em formato internacional, apenas dígitos.
   * Ex.: "5547999999999". Vazio = botão abre em modo não configurado.
   */
  whatsapp: {
    number: "554732345796",
    message: "Olá, gostaria de falar com um especialista da Starblu sobre SST para minha empresa.",
  },

  contact: {
    phone: "(47) 3234-5796",
    email: "",
    address:
      "R. Dr. Luiz de Freitas Melro, 395 - 5º andar, sala 505 - Centro, Blumenau - SC, 89010-310",
  },

  /**
   * Os leads são enviados via server function para o CRM
   * (ver src/lib/lead-webhook.server.ts).
   */
  webhookUrl: "",

  /** IDs de tracking. Nenhum script é carregado com valor vazio. */
  tracking: {
    gtmId: "", // GTM-XXXXXXX
    ga4Id: "", // G-XXXXXXXXXX
    googleAdsId: "", // AW-XXXXXXXXX
    googleAdsConversionLabel: "", // AW-XXXXXXXXX/xxxxxxxxxxxxx
    metaPixelId: "", // 000000000000000
  },
};

export type LeadService =
  | "Medicina Ocupacional"
  | "Exames"
  | "Laudos"
  | "PGR / PCMSO"
  | "eSocial SST"
  | "Treinamentos"
  | "Perícias / Assistência Técnica"
  | "Consultoria em SST"
  | "Gestão completa"
  | "Ainda não sei";

export const leadServices: LeadService[] = [
  "Medicina Ocupacional",
  "Exames",
  "Laudos",
  "PGR / PCMSO",
  "eSocial SST",
  "Treinamentos",
  "Perícias / Assistência Técnica",
  "Consultoria em SST",
  "Gestão completa",
  "Ainda não sei",
];

export const employeeRanges = [
  "1 a 10",
  "11 a 50",
  "51 a 100",
  "101 a 300",
  "301 a 500",
  "Mais de 500",
];
