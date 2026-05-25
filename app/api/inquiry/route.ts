import { NextResponse, type NextRequest } from "next/server";
import { inquirySchema } from "@/lib/inquiry-schema";
import { checkRateLimit } from "@/lib/rate-limit";
import { verifyCaptcha } from "@/lib/recaptcha";
import { sendInquiry } from "@/lib/email";
import type { CompanyId } from "@/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_DWELL_MS = 3000;

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = inquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Validation failed" }, { status: 400 });
  }
  const data = parsed.data;

  // Honeypot — silently succeed so bots don't probe.
  if (data.honeypot && data.honeypot.length > 0) {
    return NextResponse.json({ ok: true });
  }
  // Dwell time — bots fill forms in <3s.
  if (Date.now() - data._ts < MIN_DWELL_MS) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(req);
  const rate = checkRateLimit(`inquiry:${ip}`);
  if (!rate.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((rate.resetAt - Date.now()) / 1000)) } }
    );
  }

  // Verify reCAPTCHA token (no-op if RECAPTCHA_SECRET_KEY isn't set).
  const captchaOk = await verifyCaptcha(data.captchaToken, ip);
  if (!captchaOk) {
    return NextResponse.json(
      { ok: false, error: "Captcha verification failed. Please try again." },
      { status: 400 }
    );
  }

  try {
    await sendInquiry({
      companyId: data.company as CompanyId,
      name: data.name,
      submitterCompany: data.companyName,
      email: data.email,
      phone: data.phone,
      message: data.message,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Inquiry send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send. Please email group@torquegroup.com." },
      { status: 502 }
    );
  }
}
