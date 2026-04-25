import { z } from "zod";

const optionalTrimmed = (max: number) =>
  z
    .union([z.string().trim().max(max), z.literal(""), z.undefined()])
    .transform((value) => (typeof value === "string" && value.trim().length > 0 ? value.trim() : undefined));

const optionalBoolean = z
  .union([z.boolean(), z.string(), z.undefined()])
  .transform((value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value === "true";
    return undefined;
  });

export const quoteCreateSchema = z.object({
  title: optionalTrimmed(160),
  quoteText: z.string().trim().min(5).max(1200),
  theme: z.string().trim().min(2).max(80),
  language: optionalTrimmed(20).transform((value) => value ?? "en"),
  source: optionalTrimmed(200).transform((value) => value ?? "Bhagwat Reflection Desk"),
  author: optionalTrimmed(120),
  publishDate: z.string().trim().min(8).max(80),
  isFeatured: optionalBoolean.transform((value) => value ?? false),
  isPublished: optionalBoolean.transform((value) => value ?? true),
});

export const quoteUpdateSchema = quoteCreateSchema.partial();
