import { companies, contact, type CompanyId } from "@/content";

/**
 * Email delivery via Brevo (formerly Sendinblue).
 * Free tier: 300 emails/day = ~9,000/month.
 *
 * Uses the transactional REST API directly — no SDK dependency.
 * Docs: https://developers.brevo.com/reference/sendtransacemail
 */

const BREVO_API = "https://api.brevo.com/v3/smtp/email";
const BREVO_KEY = process.env.BREVO_API_KEY;

const FROM_EMAIL = process.env.MAIL_FROM_EMAIL ?? "noreply@torquegroup.com";
const FROM_NAME = process.env.MAIL_FROM_NAME ?? "Torque Group";

export const GROUP_INBOX = process.env.MAIL_GROUP ?? "group@torquegroup.com";

export const RECIPIENTS: Record<CompanyId, string> = {
  institute: process.env.MAIL_INSTITUTE ?? companies.institute.email,
  chennai:   process.env.MAIL_CHENNAI   ?? companies.chennai.email,
  subhags:   process.env.MAIL_SUBHAGS   ?? companies.subhags.email,
  nulite:    process.env.MAIL_NULITE    ?? companies.nulite.email,
  wolff:     process.env.MAIL_WOLFF     ?? companies.wolff.email,
};

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

interface BrevoPayload {
  sender: { name: string; email: string };
  to: { email: string; name?: string }[];
  cc?: { email: string }[];
  replyTo?: { email: string; name?: string };
  subject: string;
  htmlContent: string;
}

async function sendOne(payload: BrevoPayload): Promise<void> {
  if (!BREVO_KEY) throw new Error("BREVO_API_KEY is not set");

  const res = await fetch(BREVO_API, {
    method: "POST",
    headers: {
      "api-key": BREVO_KEY,
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo ${res.status}: ${body}`);
  }
}

function notificationHtml(input: {
  companyName: string;
  name: string;
  submitterCompany: string;
  email: string;
  phone: string;
  message: string;
}) {
  const { companyName, name, submitterCompany, email, phone, message } = input;
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f6f5f2;font-family:Inter,Arial,sans-serif;color:#1a1f2b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #d6d3cc;">
        <tr><td style="padding:24px 28px;background:#102a43;color:#fff;">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:20px;letter-spacing:.05em;">TORQUE GROUP</div>
          <div style="font-size:11px;letter-spacing:.2em;color:rgba(255,255,255,0.7);text-transform:uppercase;margin-top:4px;">New inquiry &middot; ${escape(companyName)}</div>
        </td></tr>
        <tr><td style="padding:28px;">
          <p style="margin:0 0 16px;font-size:14px;color:#3a4150;">A new enquiry has been routed to <strong>${escape(companyName)}</strong>.</p>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eeece6;border-bottom:1px solid #eeece6;margin:0 0 16px;">
            <tr><td style="padding:10px 0;font-size:11px;letter-spacing:.16em;color:#6b7280;text-transform:uppercase;width:140px;">Name</td><td style="padding:10px 0;font-size:14px;color:#1a1f2b;">${escape(name)}</td></tr>
            <tr><td style="padding:10px 0;font-size:11px;letter-spacing:.16em;color:#6b7280;text-transform:uppercase;border-top:1px solid #eeece6;">Company</td><td style="padding:10px 0;font-size:14px;color:#1a1f2b;border-top:1px solid #eeece6;">${escape(submitterCompany)}</td></tr>
            <tr><td style="padding:10px 0;font-size:11px;letter-spacing:.16em;color:#6b7280;text-transform:uppercase;border-top:1px solid #eeece6;">Email</td><td style="padding:10px 0;font-size:14px;color:#1a1f2b;border-top:1px solid #eeece6;"><a href="mailto:${escape(email)}" style="color:#c2410c;text-decoration:none;">${escape(email)}</a></td></tr>
            <tr><td style="padding:10px 0;font-size:11px;letter-spacing:.16em;color:#6b7280;text-transform:uppercase;border-top:1px solid #eeece6;">Phone</td><td style="padding:10px 0;font-size:14px;color:#1a1f2b;border-top:1px solid #eeece6;">${escape(phone)}</td></tr>
          </table>
          <div style="font-size:11px;letter-spacing:.16em;color:#6b7280;text-transform:uppercase;margin-bottom:6px;">Inquiry</div>
          <div style="font-size:14px;color:#1a1f2b;line-height:1.55;white-space:pre-wrap;">${escape(message)}</div>
          <p style="margin:22px 0 0;font-size:12px;color:#6b7280;">Reply directly to this email to respond to the submitter.</p>
        </td></tr>
        <tr><td style="padding:18px 28px;background:#eeece6;font-size:11px;letter-spacing:.14em;color:#6b7280;text-transform:uppercase;">Enterprise Inquiry Desk &middot; Torque Group</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function autoReplyHtml(input: { name: string; companyName: string }) {
  const tpl = contact.step2.autoReplyBody
    .replace("{name}", escape(input.name))
    .replace("{company}", escape(input.companyName));
  return `<!doctype html><html><body style="margin:0;padding:0;background:#f6f5f2;font-family:Inter,Arial,sans-serif;color:#1a1f2b;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #d6d3cc;">
        <tr><td style="padding:24px 28px;background:#102a43;color:#fff;">
          <div style="font-family:'Barlow Condensed',sans-serif;font-size:20px;letter-spacing:.05em;">TORQUE GROUP</div>
          <div style="font-size:11px;letter-spacing:.2em;color:rgba(255,255,255,0.7);text-transform:uppercase;margin-top:4px;">Inquiry received</div>
        </td></tr>
        <tr><td style="padding:28px;font-size:14px;line-height:1.6;color:#3a4150;">${tpl}</td></tr>
        <tr><td style="padding:18px 28px;background:#eeece6;font-size:11px;letter-spacing:.14em;color:#6b7280;text-transform:uppercase;">Maritime &middot; Engineering &middot; Since 1991</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

export async function sendInquiry(input: {
  companyId: CompanyId;
  name: string;
  submitterCompany: string;
  email: string;
  phone: string;
  message: string;
}) {
  const co = companies[input.companyId];
  const to = RECIPIENTS[input.companyId];

  const notification: BrevoPayload = {
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: to, name: co.name }],
    cc: [{ email: GROUP_INBOX }],
    replyTo: { email: input.email, name: input.name },
    subject: `New inquiry — ${co.name}`,
    htmlContent: notificationHtml({
      companyName: co.name,
      name: input.name,
      submitterCompany: input.submitterCompany,
      email: input.email,
      phone: input.phone,
      message: input.message,
    }),
  };

  const autoReply: BrevoPayload = {
    sender: { name: FROM_NAME, email: FROM_EMAIL },
    to: [{ email: input.email, name: input.name }],
    subject: contact.step2.autoReplySubject,
    htmlContent: autoReplyHtml({ name: input.name, companyName: co.name }),
  };

  // Send both in parallel; throw if either fails.
  await Promise.all([sendOne(notification), sendOne(autoReply)]);
}
