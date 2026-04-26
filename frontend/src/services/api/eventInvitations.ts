import { apiClient } from "./client";

export type EventInvitationStatus = "Pending" | "Under Review" | "Approved" | "Declined" | "Completed";

export type EventInvitationPayload = {
  fullName: string;
  organizationName: string;
  phone: string;
  email: string;
  country: string;
  state: string;
  city: string;
  eventType: string;
  proposedDate: string;
  audienceSize: string;
  venueAddress: string;
  invitationPurpose: string;
  requiredSupport: string;
  message: string;
  consent: boolean;
};

export const eventInvitationsApi = {
  create: (payload: FormData) =>
    apiClient.post<{ message: string; id?: string }>("/api/event-invitations", payload, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
};

