import { z } from "zod";

const advancedContactSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  email: z.string().email(),
  city: z.string().trim().min(2).max(120),
  inquiryType: z.enum([
    "General Inquiry",
    "Seva / Volunteer",
    "Donation Support",
    "Event Collaboration",
    "Temple Visit",
    "Guidance Request",
    "Media / Partnership",
  ]),
  preferredContactMethod: z.enum(["Phone Call", "WhatsApp", "Email"]),
  urgency: z.enum(["Normal", "Important", "Emergency Seva Support"]),
  subject: z.string().trim().min(2).max(160),
  message: z.string().trim().min(10).max(1200),
  consent: z.literal(true),
  createdAt: z.string().datetime().optional(),
});

const legacyContactSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email(),
  subject: z.string().optional(),
  message: z.string().trim().min(1),
});

export const contactSchema = z.union([advancedContactSchema, legacyContactSchema]).transform((data) => {
  if ("fullName" in data) {
    return data;
  }

  return {
    fullName: data.name,
    phone: "9999999999",
    email: data.email,
    city: "Not specified",
    inquiryType: "General Inquiry" as const,
    preferredContactMethod: "Email" as const,
    urgency: "Normal" as const,
    subject: data.subject?.trim() || "General Inquiry",
    message: data.message,
    consent: true as const,
    createdAt: new Date().toISOString(),
  };
});
