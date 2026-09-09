import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, Loader2, ShieldCheck } from "lucide-react";

import { employeeRanges, leadServices } from "@/config/site";
import { submitLead, type LeadInput } from "@/lib/lead";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const emptyForm: LeadInput = {
  name: "",
  phone: "",
  email: "",
  company: "",
  employees: "",
  service: "",
};

const fieldClass =
  "w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-navy transition-colors placeholder:text-muted-foreground/70 focus:border-brand focus:outline-none";

const labelClass = "mb-1.5 block text-xs font-semibold tracking-wide text-navy";

export function LeadForm({ className }: { className?: string }) {
  const [form, setForm] = useState<LeadInput>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const startedRef = useRef(false);

  const update =
    (field: keyof LeadInput) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      if (!startedRef.current) {
        startedRef.current = true;
        trackEvent("form_start", { form_id: "lead_form" });
      }
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setMessage("");
    trackEvent("form_submit", { form_id: "lead_form", service: form.service });

    const result = await submitLead(form);

    if (result.status === "error") {
      setStatus("error");
      setMessage("Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.");
      return;
    }

    trackEvent("lead", { form_id: "lead_form", service: form.service });
    setStatus("success");
    setMessage(
      result.status === "not_configured"
        ? "Recebemos seus dados. Assim que o destino de leads for configurado, o envio será automático."
        : "Recebemos sua solicitação. Um especialista entrará em contato.",
    );
    setForm(emptyForm);
    startedRef.current = false;
  }

  if (status === "success") {
    return (
      <div
        className={cn(
          "rounded-2xl border border-border bg-card p-8 text-center shadow-card",
          className,
        )}
        role="status"
      >
        <CheckCircle2 aria-hidden="true" className="mx-auto h-10 w-10 text-brand" />
        <h3 className="mt-4 font-display text-lg font-extrabold text-navy">Solicitação enviada</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className={cn("rounded-2xl border border-border bg-card p-6 shadow-card lg:p-8", className)}
    >
      <h3 className="font-display text-lg font-extrabold text-navy">
        Solicitar atendimento
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Preencha os dados e um especialista entra em contato.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="lead-name">
            Nome
          </label>
          <input
            id="lead-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            placeholder="Seu nome completo"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-phone">
            WhatsApp
          </label>
          <input
            id="lead-phone"
            name="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={update("phone")}
            placeholder="(47) 90000-0000"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-email">
            E-mail
          </label>
          <input
            id="lead-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={update("email")}
            placeholder="nome@empresa.com.br"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-company">
            Empresa
          </label>
          <input
            id="lead-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            value={form.company}
            onChange={update("company")}
            placeholder="Nome da empresa"
            className={fieldClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="lead-employees">
            Número de funcionários
          </label>
          <select
            id="lead-employees"
            name="employees"
            required
            value={form.employees}
            onChange={update("employees")}
            className={fieldClass}
          >
            <option value="">Selecione</option>
            {employeeRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="lead-service">
            Principal necessidade
          </label>
          <select
            id="lead-service"
            name="service"
            required
            value={form.service}
            onChange={update("service")}
            className={fieldClass}
          >
            <option value="">Selecione</option>
            {leadServices.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-4 text-sm font-medium text-navy">
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-display text-sm font-bold tracking-[0.06em] text-primary-foreground uppercase shadow-brand transition-all duration-200 hover:bg-brand/90 disabled:opacity-70"
      >
        {status === "loading" ? (
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
        ) : null}
        Quero falar com um especialista
      </button>

      <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
        <ShieldCheck aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
        Seus dados serão utilizados apenas para contato relacionado à sua solicitação.
      </p>
    </form>
  );
}
