import { z } from "zod";
import { companyOrder } from "@/content";

// E.164: leading +, country code, up to 15 digits total. Loose enough to
// accept any valid country code; libphonenumber on the client already
// verified per-country format.
const E164 = /^\+[1-9]\d{6,14}$/;

const NAME_RX = /^[\p{L}\s.'-]{2,120}$/u;

export const inquirySchema = z.object({
  company: z.enum(companyOrder as [string, ...string[]]),
  name: z.string().trim().regex(NAME_RX, "Invalid name"),
  companyName: z.string().trim().min(2).max(180),
  email: z.string().trim().toLowerCase().email().max(180),
  phone: z.string().trim().regex(E164, "Invalid phone"),
  message: z.string().trim().min(10).max(4000),
  honeypot: z.string().max(0).optional().default(""),
  captchaToken: z.string().optional().default(""),
  _ts: z.number().int().positive(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
