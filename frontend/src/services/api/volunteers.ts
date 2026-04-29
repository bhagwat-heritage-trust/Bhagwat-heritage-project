import { apiClient } from "./client";
import type { Volunteer } from "../../types";

export const volunteersApi = {
  create: (payload: {
    fullName: string;
    email?: string;
    phone?: string;
    sevaArea?: string;
    skills?: string;
    message?: string;
    location?: string;
    availability?: string;
    interest?: "Annadaan" | "Jal Seva" | "Both";
    organizerTrack?: "Volunteer" | "Organizer" | "City Lead" | "Both";
  }) => apiClient.post<{ message: string; volunteer: Volunteer }>("/api/volunteers/create", payload),

  getAll: () => apiClient.get<Volunteer[]>("/api/volunteers/all"),

  getById: (id: string) => apiClient.get<Volunteer>(`/api/volunteers/${id}`),

  updateStatus: (id: string, payload: { status: string; adminNotes?: string }) =>
    apiClient.put<{ message: string }>(`/api/volunteers/status/${id}`, payload),

  delete: (id: string) => apiClient.delete<{ message: string }>(`/api/volunteers/delete/${id}`),

  registerApplication: (payload: {
    fullName: string;
    email: string;
    mobile: string;
    whatsapp?: string;
    city: string;
    state: string;
    ageGroup: "16-20" | "21-30" | "31-45" | "46-60" | "60+";
    sevaArea: string;
    skills?: string;
    availability?: "Weekdays" | "Weekends" | "Flexible";
    hoursPerWeek?: "2" | "4" | "6" | "8" | "10+";
    preferredMode?: "On-site" | "Remote" | "Hybrid";
    motivation: string;
    experience?: string;
    consent: boolean;
    whatsappConsent: boolean;
    timestamp: string;
    sourcePage: string;
  }) =>
    apiClient.post<{ message: string; applicationId: string; status: string }>(
      "/api/volunteers/register",
      payload
    ),
};
