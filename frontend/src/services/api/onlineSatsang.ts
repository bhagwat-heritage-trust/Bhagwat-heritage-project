import { apiClient } from "./client";

export const onlineSatsangApi = {
  request: (payload: {
    fullName: string;
    mobileNumber: string;
    email: string;
    cityCountry: string;
    satsangType: "Family" | "Group" | "Community" | "Institution" | "Festival" | "Special Occasion";
    preferredMode: "Audio" | "Video" | "Zoom" | "YouTube" | "WhatsApp" | "Website Live";
    preferredDate: string;
    preferredTime: string;
    messagePurpose?: string;
  }) => apiClient.post<{ message: string }>("/api/online-satsang/request", payload),
};
