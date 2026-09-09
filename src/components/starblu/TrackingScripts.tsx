import { useEffect } from "react";

import { siteConfig } from "@/config/site";
import { captureCampaignParams, trackEvent } from "@/lib/tracking";

/**
 * Carrega as tags de marketing SOMENTE quando o ID correspondente estiver
 * preenchido em `siteConfig.tracking`. Nenhum ID fictício é usado.
 *
 * Placeholders a preencher:
 *   gtmId                   -> GTM-XXXXXXX
 *   ga4Id                   -> G-XXXXXXXXXX
 *   googleAdsId             -> AW-XXXXXXXXX
 *   googleAdsConversionLabel-> AW-XXXXXXXXX/xxxxxxxxxxxxx
 *   metaPixelId             -> 000000000000000
 */
function injectScript(id: string, src: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function injectInline(id: string, code: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.textContent = code;
  document.head.appendChild(script);
}

export function TrackingScripts() {
  useEffect(() => {
    const { gtmId, ga4Id, googleAdsId, metaPixelId } = siteConfig.tracking;

    if (gtmId) {
      injectInline(
        "starblu-gtm",
        `window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`,
      );
      injectScript("starblu-gtm-src", `https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
    }

    const gtagId = ga4Id || googleAdsId;
    if (gtagId) {
      injectScript("starblu-gtag", `https://www.googletagmanager.com/gtag/js?id=${gtagId}`);
      injectInline(
        "starblu-gtag-init",
        `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());
${ga4Id ? `gtag('config','${ga4Id}');` : ""}
${googleAdsId ? `gtag('config','${googleAdsId}');` : ""}`,
      );
    }

    if (metaPixelId) {
      injectInline(
        "starblu-meta-pixel",
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`,
      );
    }
  }, []);

  useEffect(() => {
    const campaign = captureCampaignParams();
    trackEvent("page_view", { page_path: window.location.pathname, ...campaign });
    trackEvent("view_content", { content_name: "landing_starblu_sst" });
  }, []);

  return null;
}
