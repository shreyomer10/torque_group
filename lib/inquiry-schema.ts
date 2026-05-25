import { z } from "zod";
import { companyOrder } from "@/content";

export const inquirySchema = z.object({
  company: z.enum(companyOrder as [string, ...string[]]),
  name: z.string().trim().min(2).max(120),
  companyName: z.string().trim().min(1).max(180),
  email: z.string().trim().email().max(180),
  phone: z.string().trim().min(4).max(40),
  message: z.string().trim().min(10).max(4000),
  honeypot: z.string().max(0).optional().default(""),
  _ts: z.number().int().positive(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
