import { apiClient } from "./client";

export type MembershipPlan = "Basic Member" | "Premium Member" | "Lifetime Member";

export const membershipApi = {
  register: (payload: FormData) =>
    apiClient.post<{ message: string; membership: { _id: string; paymentStatus: string; membershipStatus: string } }>(
      "/api/membership/register",
      payload,
      { headers: { "Content-Type": "multipart/form-data" } },
    ),

  createOrder: (membershipId: string) =>
    apiClient.post<{ keyId?: string; orderId: string; amount: number; currency: string; membershipId: string }>(
      "/api/membership/payment/create-order",
      { membershipId },
    ),

  verifyPayment: (payload: {
    membershipId: string;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }) => apiClient.post<{ message: string }>("/api/membership/payment/verify", payload),

  getProfile: (membershipId: string) =>
    apiClient.get(`/api/membership/profile?membershipId=${encodeURIComponent(membershipId)}`),
};
