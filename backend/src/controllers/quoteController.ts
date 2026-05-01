import type { Request, Response } from "express";
import Quote from "../models/Quote";
import { asyncHandler } from "../utils/asyncHandler";
import { quoteCreateSchema, quoteUpdateSchema } from "../schemas/quote.schemas";

function normalizeDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Invalid publishDate");
  }
  return date;
}

function getUtcDayRange(date: Date) {
  const dateText = date.toISOString().slice(0, 10);
  return {
    start: new Date(`${dateText}T00:00:00.000Z`),
    end: new Date(`${dateText}T23:59:59.999Z`),
  };
}

export const getPublicQuotes = asyncHandler(async (req: Request, res: Response) => {
  const theme = typeof req.query.theme === "string" ? req.query.theme.trim() : "";
  const search = typeof req.query.search === "string" ? req.query.search.trim() : "";
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(req.query.limit) || 9, 1), 50);
  const skip = (page - 1) * limit;

  const filter: Record<string, unknown> = { isPublished: true };

  if (theme && theme.toLowerCase() !== "all") {
    filter.theme = theme;
  }

  if (search) {
    const textFilters: Record<string, unknown>[] = [
      { quoteText: { $regex: search, $options: "i" } },
      { theme: { $regex: search, $options: "i" } },
      { source: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
    ];

    if (/^\d{4}-\d{2}-\d{2}$/.test(search)) {
      const date = normalizeDate(search);
      const { start, end } = getUtcDayRange(date);
      textFilters.push({ publishDate: { $gte: start, $lte: end } });
    }

    filter.$or = textFilters;
  }

  const [items, total] = await Promise.all([
    Quote.find(filter).sort({ publishDate: -1, createdAt: -1 }).skip(skip).limit(limit),
    Quote.countDocuments(filter),
  ]);

  res.json({
    items,
    total,
    page,
    limit,
    hasMore: skip + items.length < total,
  });
});

export const getTodayQuote = asyncHandler(async (_req: Request, res: Response) => {
  const now = new Date();
  const { start, end } = getUtcDayRange(now);

  let quote = await Quote.findOne({
    isPublished: true,
    isFeatured: true,
    publishDate: { $gte: start, $lte: end },
  }).sort({ publishDate: -1, createdAt: -1 });

  if (!quote) {
    quote = await Quote.findOne({ isPublished: true }).sort({ publishDate: -1, createdAt: -1 });
  }

  res.json(quote);
});

export const getQuotesByTheme = asyncHandler(async (req: Request, res: Response) => {
  const themeParam = req.params.theme;
  const theme = (Array.isArray(themeParam) ? themeParam[0] : themeParam)?.trim();

  if (!theme) {
    res.status(400).json({ message: "Theme is required" });
    return;
  }

  const quotes = await Quote.find({ isPublished: true, theme }).sort({ publishDate: -1, createdAt: -1 });
  res.json(quotes);
});

export const createQuote = asyncHandler(async (req: Request, res: Response) => {
  const payload = quoteCreateSchema.parse(req.body);

  const quote = await Quote.create({
    ...payload,
    publishDate: normalizeDate(payload.publishDate),
    createdBy: req.user?.name || "admin",
  });

  res.status(201).json({ message: "Quote published", quote });
});

export const updateQuote = asyncHandler(async (req: Request, res: Response) => {
  const payload = quoteUpdateSchema.parse(req.body);
  const quote = await Quote.findById(req.params.id);

  if (!quote) {
    res.status(404).json({ message: "Quote not found" });
    return;
  }

  if (payload.title !== undefined) quote.title = payload.title;
  if (payload.quoteText !== undefined) quote.quoteText = payload.quoteText;
  if (payload.theme !== undefined) quote.theme = payload.theme;
  if (payload.language !== undefined) quote.language = payload.language;
  if (payload.source !== undefined) quote.source = payload.source;
  if (payload.author !== undefined) quote.author = payload.author;
  if (payload.publishDate !== undefined) quote.publishDate = normalizeDate(payload.publishDate);
  if (payload.isFeatured !== undefined) quote.isFeatured = payload.isFeatured;
  if (payload.isPublished !== undefined) quote.isPublished = payload.isPublished;

  await quote.save();
  res.json({ message: "Quote updated", quote });
});

export const deleteQuote = asyncHandler(async (req: Request, res: Response) => {
  const quote = await Quote.findByIdAndDelete(req.params.id);

  if (!quote) {
    res.status(404).json({ message: "Quote not found" });
    return;
  }

  res.json({ message: "Quote deleted" });
});
