import { createFileRoute } from "@tanstack/react-router";

import { DiagnosticSection } from "@/components/starblu/DiagnosticSection";
import { Differentials } from "@/components/starblu/Differentials";
import { Faq, faqItems } from "@/components/starblu/Faq";
import { FinalCta } from "@/components/starblu/FinalCta";
import { Footer } from "@/components/starblu/Footer";
import { Header } from "@/components/starblu/Header";
import { Hero } from "@/components/starblu/Hero";
import { HowItWorks } from "@/components/starblu/HowItWorks";
import { LocationMap } from "@/components/starblu/LocationMap";
import { PainSection } from "@/components/starblu/PainSection";
import { Services } from "@/components/starblu/Services";
import { SocialProof } from "@/components/starblu/SocialProof";
import { TechnicalAuthority } from "@/components/starblu/TechnicalAuthority";
import { TrackingScripts } from "@/components/starblu/TrackingScripts";
import { WhatsAppButton } from "@/components/starblu/WhatsAppButton";

const title = "Medicina e Segurança do Trabalho em Blumenau | Starblu";
const description =
  "Medicina ocupacional, segurança do trabalho, laudos, PGR, PCMSO, treinamentos e eSocial para empresas de Blumenau e região.";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalBusiness",
              name: "Starblu",
              description,
              areaServed: { "@type": "City", name: "Blumenau" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Blumenau",
                addressRegion: "SC",
                addressCountry: "BR",
              },
              medicalSpecialty: "Occupational",
              knowsAbout: [
                "Medicina do trabalho",
                "Segurança do trabalho",
                "SST",
                "eSocial SST",
                "PGR",
                "PCMSO",
                "LTCAT",
                "Exames ocupacionais",
                "Treinamentos NR",
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ],
        }),
      },
    ],
  }),
});

function LandingPage() {
  return (
    <>
      <TrackingScripts />
      <Header />
      <main>
        <Hero />
        <TrustBarSection />
        <PainSection />
        <Services />
        <Differentials />
        <TechnicalAuthority />
        <HowItWorks />
        <DiagnosticSection />
        <SocialProof />
        <LocationMap />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

// Import isolado para manter a ordem de leitura clara na composição acima.
import { TrustBar as TrustBarSection } from "@/components/starblu/TrustBar";
