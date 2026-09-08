/**
 * Camada única de tracking.
 *
 * Empurra eventos para o dataLayer (Google Tag Manager / GA4) e para o
 * Meta Pixel quando eles existirem na página. Sem IDs configurados nada
 * é carregado e as chamadas se tornam no-ops seguras.
 */

export type TrackingEvent =
  | "page_view"
  | "view_content"
  | "click_whatsapp"
  | "click_cta"
  | "form_start"
  | "form_submit"
  | "lead";

type Payload = Record<string, unknown>;

interface TrackingWindow extends Window {
  dataLayer?: Payload[];
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
}

const metaEventMap: Partial<Record<TrackingEvent, string>> = {
  page_view: "PageView",
  view_content: "ViewContent",
  form_start: "InitiateCheckout",
  lead: "Lead",
};

/** Dispara um evento em todas as plataformas disponíveis. */
export function trackEvent(event: TrackingEvent, params: Payload = {}): void {
  if (typeof window === "undefined") return;

  const win = window as TrackingWindow;

  try {
    win.dataLayer = win.dataLayer ?? [];
    win.dataLayer.push({ event, ...params });

    const metaEvent = metaEventMap[event];
    if (typeof win.fbq === "function" && metaEvent) {
      win.fbq("track", metaEvent, params);
    } else if (typeof win.fbq === "function") {
      win.fbq("trackCustom", event, params);
    }
  } catch (error) {
    // Tracking nunca deve quebrar a experiência do usuário.
    console.warn("[tracking] falha ao registrar evento", event, error);
  }
}

export interface CampaignParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  gclid: string;
  fbclid: string;
}

const CAMPAIGN_KEYS: (keyof CampaignParams)[] = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "fbclid",
];

const STORAGE_KEY = "starblu:campaign";

const emptyCampaign = (): CampaignParams => ({
  utm_source: "",
  utm_medium: "",
  utm_campaign: "",
  utm_content: "",
  utm_term: "",
  gclid: "",
  fbclid: "",
});

/**
 * Lê os parâmetros de campanha da URL e os persiste na sessão, para que
 * continuem disponíveis mesmo se o usuário navegar dentro da página.
 */
export function captureCampaignParams(): CampaignParams {
  if (typeof window === "undefined") return emptyCampaign();

  const result = emptyCampaign();

  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) Object.assign(result, JSON.parse(stored) as Partial<CampaignParams>);

    const query = new URLSearchParams(window.location.search);
    let hasNew = false;
    for (const key of CAMPAIGN_KEYS) {
      const value = query.get(key);
      if (value) {
        result[key] = value;
        hasNew = true;
      }
    }

    if (hasNew) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(result));
  } catch {
    // sessionStorage pode estar indisponível (modo privado). Segue sem cache.
  }

  return result;
}
