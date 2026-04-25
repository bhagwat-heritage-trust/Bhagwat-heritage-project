import { apiClient } from "./client";
import type { Quote } from "../../types";

export type PublicQuotesResponse = {
  items: Quote[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

export type QuotePayload = {
  title?: string;
  quoteText: string;
  theme: string;
  language?: string;
  source?: string;
  author?: string;
  publishDate: string;
  isFeatured?: boolean;
  isPublished?: boolean;
};

export const quotesApi = {
  getPublic: (params?: { theme?: string; search?: string; page?: number; limit?: number }) =>
    apiClient.get<PublicQuotesResponse>("/api/quotes/public", { params }),

  getToday: () => apiClient.get<Quote | null>("/api/quotes/today"),

  getByTheme: (theme: string) => apiClient.get<Quote[]>(`/api/quotes/theme/${encodeURIComponent(theme)}`),

  create: (payload: QuotePayload) => apiClient.post<{ message: string; quote: Quote }>("/api/admin/quotes", payload),

  update: (id: string, payload: Partial<QuotePayload>) =>
    apiClient.put<{ message: string; quote: Quote }>(`/api/admin/quotes/${id}`, payload),

  delete: (id: string) => apiClient.delete<{ message: string }>(`/api/admin/quotes/${id}`),
};
