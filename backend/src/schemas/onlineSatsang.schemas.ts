import { z } from "zod";

export const onlineSatsangRequestSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  mobileNumber: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().trim().email(),
  cityCountry: z.string().trim().min(2).max(120),
  satsangType: z.enum(["Family", "Group", "Community", "Institution", "Festival", "Special Occasion"]),
  preferredMode: z.enum(["Audio", "Video", "Zoom", "YouTube", "WhatsApp", "Website Live"]),
  preferredDate: z.string().trim().min(1),
  preferredTime: z.string().trim().min(1),
  messagePurpose: z.string().trim().max(1200).optional().or(z.literal("")),
});
