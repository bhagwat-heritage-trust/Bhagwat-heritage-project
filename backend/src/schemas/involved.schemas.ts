import { z } from "zod";

export const joinSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().regex(/^[6-9]\d{9}$/).optional(),
  city: z.string().optional(),
  age: z.number().int().positive().optional(),
  interest: z.string().optional(),
  helpType: z.string().optional(),
  preferredSevaArea: z.string().optional(),
  availability: z.string().optional(),
  skills: z.string().optional(),
  contributionMode: z.string().optional(),
  joinTimeline: z.string().optional(),
  message: z.string().optional(),
});
