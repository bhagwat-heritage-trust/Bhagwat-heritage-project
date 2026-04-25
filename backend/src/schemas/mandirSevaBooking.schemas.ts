import { z } from "zod";

const optionalTrimmed = (max: number) =>
  z
    .union([z.string().trim().max(max), z.literal(""), z.undefined()])
    .transform((value) => (typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined));

export const mandirSevaBookingCreateSchema = z.object({
  fullName: z.string().trim().min(2).max(140),
  mobile: z.string().trim().min(7).max(30),
  email: z.string().trim().email().max(140),
  serviceName: z.string().trim().min(3).max(180),
  preferredDate: z.string().trim().min(8).max(40),
  message: optionalTrimmed(1400),
});

export const mandirSevaBookingStatusSchema = z.object({
  status: z.enum(["New", "Contacted", "Confirmed", "Completed"]),
});

