import { apiClient } from "./client";

export type MandirSevaBookingPayload = {
  fullName: string;
  mobile: string;
  email: string;
  serviceName: string;
  preferredDate: string;
  message?: string;
};

export type MandirSevaBooking = {
  _id: string;
  fullName: string;
  mobile: string;
  email: string;
  serviceName: string;
  preferredDate: string;
  message?: string;
  status: "New" | "Contacted" | "Confirmed" | "Completed";
  createdAt: string;
  updatedAt: string;
};

export const mandirSevaApi = {
  createBooking: (payload: MandirSevaBookingPayload) =>
    apiClient.post<{ message: string; booking: MandirSevaBooking }>("/api/mandir-seva/bookings", payload),

  getAdminBookings: () => apiClient.get<{ items: MandirSevaBooking[] }>("/api/mandir-seva/bookings"),

  updateBookingStatus: (id: string, status: MandirSevaBooking["status"]) =>
    apiClient.patch<{ message: string; booking: MandirSevaBooking }>(`/api/mandir-seva/bookings/${id}/status`, { status }),
};
