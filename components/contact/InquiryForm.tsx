"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowIcon } from "@/components/ui/Button";
import { contact, companies, type CompanyId } from "@/content";

type Form = {
  name: string;
  companyName: string;
  email: string;
  phone: string;
  message: string;
  honeypot: string;
};

export function InquiryForm({ company }: { company: CompanyId }) {
  const f = contact.step2.fields;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Form>();
  const [pageLoadedAt] = useState<number>(() => Date.now());
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  useEffect(() => {
    if (state === "success") setState("idle");
    // Reset success state when user re-selects a different company.

  }, [company]);

  const onSubmit = handleSubmit(async (values) => {
    setState("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          company,
          name: values.name,
          companyName: values.companyName,
          email: values.email,
          phone: values.phone,
          message: values.message,
          honeypot: values.honeypot ?? "",
          _ts: pageLoadedAt,
        }),
      });
      const json: { ok: boolean; error?: string } = await res.json();
      if (!res.ok || !json.ok) {
        setErrorMsg(json.error ?? contact.step2.error);
        setState("error");
        return;
      }
      reset();
      setState("success");
    } catch {
      setErrorMsg(contact.step2.error);
      setState("error");
    }
  });

  if (state === "success") {
    const co = companies[company];
    const msg = contact.step2.success.replace("{company}", co.name);
    return (
      <div className="inquiry" role="status" aria-live="polite">
        <h3 style={{ marginTop: 0 }}>Inquiry routed</h3>
        <p>{msg}</p>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          style={{ marginTop: 12 }}
          onClick={() => setState("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="inquiry" onSubmit={onSubmit} noValidate>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">{f.name.label}</label>
          <input
            id="name"
            type="text"
            placeholder={f.name.placeholder}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-err" : undefined}
            {...register("name", { required: true, minLength: 2, maxLength: 120 })}
          />
          {errors.name && <span id="name-err" className="err">Required</span>}
        </div>
        <div className="field">
          <label htmlFor="companyName">{f.company.label}</label>
          <input
            id="companyName"
            type="text"
            placeholder={f.company.placeholder}
            aria-invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? "companyName-err" : undefined}
            {...register("companyName", { required: true, maxLength: 180 })}
          />
          {errors.companyName && <span id="companyName-err" className="err">Required</span>}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="email">{f.email.label}</label>
          <input
            id="email"
            type="email"
            placeholder={f.email.placeholder}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-err" : undefined}
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
          />
          {errors.email && <span id="email-err" className="err">Valid email required</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">{f.phone.label}</label>
          <input
            id="phone"
            type="tel"
            placeholder={f.phone.placeholder}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-err" : undefined}
            {...register("phone", { required: true, minLength: 4, maxLength: 40 })}
          />
          {errors.phone && <span id="phone-err" className="err">Required</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">{f.message.label}</label>
        <textarea
          id="message"
          placeholder={f.message.placeholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          {...register("message", { required: true, minLength: 10, maxLength: 4000 })}
        />
        {errors.message && <span id="message-err" className="err">At least 10 characters</span>}
      </div>

      {/* Honeypot — hidden from users, visible to bots */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="hp">Leave this field empty</label>
        <input id="hp" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      {state === "error" && (
        <p className="err" role="alert" style={{ marginTop: 8 }}>
          {errorMsg || contact.step2.error}
        </p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 8,
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          className="muted"
          style={{
            fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
            fontSize: 11,
            letterSpacing: ".14em",
            textTransform: "uppercase",
          }}
        >
          {contact.step2.helper}
        </span>
        <button type="submit" className="btn btn-accent" disabled={state === "sending"}>
          {state === "sending" ? contact.step2.sending : contact.step2.submit}
          {state !== "sending" && <ArrowIcon />}
        </button>
      </div>
    </form>
  );
}
