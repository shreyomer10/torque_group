"use client";

import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import ReCAPTCHA from "react-google-recaptcha";
import "react-phone-number-input/style.css";
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

const EMAIL_RX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function InquiryForm({ company }: { company: CompanyId }) {
  const f = contact.step2.fields;
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Form>({ defaultValues: { phone: "" } });
  const [pageLoadedAt] = useState<number>(() => Date.now());
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    if (state === "success") setState("idle");
  }, [company]);

  const onSubmit = handleSubmit(async (values) => {
    setState("sending");
    setErrorMsg("");

    // Get a fresh reCAPTCHA token (invisible — fires on demand).
    let captchaToken = "";
    if (RECAPTCHA_SITE_KEY && recaptchaRef.current) {
      try {
        const t = await recaptchaRef.current.executeAsync();
        recaptchaRef.current.reset();
        captchaToken = t ?? "";
        if (!captchaToken) {
          setErrorMsg("Captcha verification failed. Please try again.");
          setState("error");
          return;
        }
      } catch {
        setErrorMsg("Captcha verification failed. Please try again.");
        setState("error");
        return;
      }
    }

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
          captchaToken,
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
            {...register("name", {
              required: "Required",
              minLength: { value: 2, message: "At least 2 characters" },
              maxLength: { value: 120, message: "Too long" },
              pattern: {
                value: /^[\p{L}\s.'-]+$/u,
                message: "Letters only",
              },
            })}
          />
          {errors.name && <span id="name-err" className="err">{errors.name.message}</span>}
        </div>
        <div className="field">
          <label htmlFor="companyName">{f.company.label}</label>
          <input
            id="companyName"
            type="text"
            placeholder={f.company.placeholder}
            aria-invalid={!!errors.companyName}
            aria-describedby={errors.companyName ? "companyName-err" : undefined}
            {...register("companyName", {
              required: "Required",
              minLength: { value: 2, message: "At least 2 characters" },
              maxLength: { value: 180, message: "Too long" },
            })}
          />
          {errors.companyName && <span id="companyName-err" className="err">{errors.companyName.message}</span>}
        </div>
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="email">{f.email.label}</label>
          <input
            id="email"
            type="email"
            placeholder={f.email.placeholder}
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-err" : undefined}
            {...register("email", {
              required: "Required",
              maxLength: { value: 180, message: "Too long" },
              pattern: { value: EMAIL_RX, message: "Enter a valid email" },
            })}
          />
          {errors.email && <span id="email-err" className="err">{errors.email.message}</span>}
        </div>
        <div className="field">
          <label htmlFor="phone">{f.phone.label}</label>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: "Required",
              validate: (v) => (v && isValidPhoneNumber(v)) || "Enter a valid phone number",
            }}
            render={({ field }) => (
              <PhoneInput
                id="phone"
                international
                defaultCountry="IN"
                countryCallingCodeEditable={false}
                placeholder="Phone number"
                value={field.value}
                onChange={(v) => field.onChange(v ?? "")}
                onBlur={field.onBlur}
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-err" : undefined}
                className="phone-input"
              />
            )}
          />
          {errors.phone && <span id="phone-err" className="err">{errors.phone.message}</span>}
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">{f.message.label}</label>
        <textarea
          id="message"
          placeholder={f.message.placeholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          {...register("message", {
            required: "Required",
            minLength: { value: 10, message: "At least 10 characters" },
            maxLength: { value: 4000, message: "Too long" },
          })}
        />
        {errors.message && <span id="message-err" className="err">{errors.message.message}</span>}
      </div>

      {/* Honeypot — hidden from users, visible to bots */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="hp">Leave this field empty</label>
        <input id="hp" type="text" tabIndex={-1} autoComplete="off" {...register("honeypot")} />
      </div>

      {RECAPTCHA_SITE_KEY && (
        <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} size="invisible" badge="bottomright" />
      )}

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
        <button type="submit" className="btn" disabled={state === "sending"}>
          {state === "sending" ? contact.step2.sending : contact.step2.submit}
          {state !== "sending" && <ArrowIcon />}
        </button>
      </div>
    </form>
  );
}
