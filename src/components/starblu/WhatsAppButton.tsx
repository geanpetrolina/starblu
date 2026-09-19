import { useState } from "react";
import { ArrowRight, MessageCircle, Phone, X } from "lucide-react";

import { employeeRanges, leadServices, siteConfig } from "@/config/site";
import { submitLead, type LeadInput } from "@/lib/lead";
import { trackEvent } from "@/lib/tracking";
import { hasWhatsapp, leadWhatsAppMessage, whatsappLink } from "@/lib/whatsapp";

const emptyLead: LeadInput = {
  name: "",
  phone: "",
  email: "",
  company: "",
  employees: "",
  service: "",
};

const questions: Array<{
  field: keyof LeadInput;
  title: string;
  placeholder: string;
  type?: string;
  options?: string[];
}> = [
  { field: "name", title: "Como podemos chamar você?", placeholder: "Seu nome completo" },
  { field: "phone", title: "Qual é o seu WhatsApp?", placeholder: "(47) 90000-0000", type: "tel" },
  {
    field: "email",
    title: "Qual é o seu e-mail?",
    placeholder: "nome@empresa.com.br",
    type: "email",
  },
  { field: "company", title: "Qual é o nome da sua empresa?", placeholder: "Nome da empresa" },
  {
    field: "employees",
    title: "Quantos funcionários sua empresa tem?",
    placeholder: "Selecione",
    options: employeeRanges,
  },
  {
    field: "service",
    title: "Qual é a sua principal necessidade?",
    placeholder: "Selecione",
    options: leadServices,
  },
];

export function WhatsAppButton() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [lead, setLead] = useState<LeadInput>(emptyLead);
  const [error, setError] = useState("");
  const phone = siteConfig.contact.phone;

  function close() {
    setOpen(false);
    setStep(0);
    setLead(emptyLead);
    setError("");
  }

  function openPopup() {
    setOpen(true);
    trackEvent("click_whatsapp", { location: "floating" });
  }

  async function next() {
    const question = questions[step];
    if (!lead[question.field].trim()) {
      setError("Preencha este campo para continuar.");
      return;
    }
    setError("");
    if (step < questions.length - 1) {
      setStep((current) => current + 1);
      return;
    }
    setError("");
    const result = await submitLead(lead);
    if (result.status === "error") {
      setError("Não foi possível registrar seus dados agora. Tente novamente.");
      return;
    }
    trackEvent("lead", { form_id: "whatsapp_popup", service: lead.service });
    window.location.href = whatsappLink(leadWhatsAppMessage(lead));
  }

  if (!hasWhatsapp()) {
    if (!phone) return null;
    return (
      <a
        href={`tel:+55${phone.replace(/\\D/g, "")}`}
        className="fixed right-5 bottom-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-display text-sm font-bold text-primary-foreground shadow-brand"
      >
        <Phone aria-hidden="true" /> Ligar {phone}
      </a>
    );
  }

  const question = questions[step];

  return (
    <>
      <button
        type="button"
        onClick={openPopup}
        aria-label="Falar com um especialista da Starblu no WhatsApp"
        className="fixed right-5 bottom-5 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 font-display text-sm font-bold text-primary-foreground shadow-brand transition-transform hover:-translate-y-0.5 sm:right-6 sm:bottom-6"
      >
        <MessageCircle aria-hidden="true" />
        <span>Falar no WhatsApp</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-navy/60 p-4 backdrop-blur-sm sm:items-center"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-dialog-title"
            className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-brand uppercase">
                  Fale com a Starblu
                </p>
                <h2
                  id="whatsapp-dialog-title"
                  className="mt-2 font-display text-xl font-extrabold text-navy"
                >
                  Vamos entender sua necessidade
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pergunta {step + 1} de {questions.length}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Fechar formulário"
                className="rounded-full p-2 text-muted-foreground hover:bg-muted"
              >
                <X aria-hidden="true" />
              </button>
            </div>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${((step + 1) / questions.length) * 100}%` }}
              />
            </div>
            <label
              htmlFor="whatsapp-lead-field"
              className="mt-6 block text-base font-semibold text-navy"
            >
              {question.title}
            </label>
            {question.options ? (
              <select
                id="whatsapp-lead-field"
                autoFocus
                value={lead[question.field]}
                onChange={(event) =>
                  setLead((current) => ({ ...current, [question.field]: event.target.value }))
                }
                className="mt-3 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none"
              >
                <option value="">{question.placeholder}</option>
                {question.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="whatsapp-lead-field"
                autoFocus
                type={question.type ?? "text"}
                value={lead[question.field]}
                onChange={(event) =>
                  setLead((current) => ({ ...current, [question.field]: event.target.value }))
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.nativeEvent.isComposing &&
                    event.keyCode !== 229
                  )
                    next();
                }}
                placeholder={question.placeholder}
                className="mt-3 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-navy focus:border-brand focus:outline-none"
              />
            )}
            {error ? (
              <p role="alert" className="mt-2 text-sm text-destructive">
                {error}
              </p>
            ) : null}
            <button
              type="button"
              onClick={next}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 font-display text-sm font-bold text-primary-foreground shadow-brand"
            >
              {step === questions.length - 1 ? "Continuar para o WhatsApp" : "Continuar"}
              <ArrowRight aria-hidden="true" />
            </button>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Seus dados serão usados apenas para atender sua solicitação.
            </p>
          </section>
        </div>
      ) : null}
    </>
  );
}
