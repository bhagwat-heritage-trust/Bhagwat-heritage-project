import { z } from "zod";

const optionalTrimmed = (max: number) =>
  z
    .union([z.string().trim().max(max), z.literal(""), z.undefined()])
    .transform((value) => (typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined));

export const volunteerApplicationCreateSchema = z.object({
  fullName: z.string().trim().min(3).max(120),
  email: z.string().trim().email(),
  mobile: z.string().trim().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"),
  whatsapp: z.union([z.string().trim().regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number"), z.literal(""), z.undefined()]).transform((v) => v || undefined),
  city: z.string().trim().min(2).max(120),
  state: z.string().trim().min(2).max(120),
  ageGroup: z.enum(["16-20", "21-30", "31-45", "46-60", "60+"]),
  sevaArea: z.string().trim().min(2).max(160),
  skills: optionalTrimmed(320),
  availability: z.union([z.enum(["Weekdays", "Weekends", "Flexible"]), z.literal(""), z.undefined()]).transform((v) => v || undefined),
  hoursPerWeek: z.union([z.enum(["2", "4", "6", "8", "10+"]), z.literal(""), z.undefined()]).transform((v) => v || undefined),
  preferredMode: z.union([z.enum(["On-site", "Remote", "Hybrid"]), z.literal(""), z.undefined()]).transform((v) => v || undefined),
  motivation: z.string().trim().min(10).max(500),
  experience: optionalTrimmed(500),
  consent: z.literal(true),
  whatsappConsent: z.boolean().optional().default(false),
  sourcePage: z.string().trim().min(1).default("/get-involved/volunteer-registration"),
  timestamp: z.string().datetime().optional(),
});
