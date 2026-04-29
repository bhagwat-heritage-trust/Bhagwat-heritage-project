import { z } from "zod";

export const membershipRegisterSchema = z.object({
  fullName: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  phone: z.string().trim().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  dob: z.string().trim().min(1),
  gender: z.string().trim().min(1),
  address: z.string().trim().min(3).max(250),
  city: z.string().trim().min(2).max(100),
  state: z.string().trim().min(2).max(100),
  country: z.string().trim().min(2).max(100),
  plan: z.enum(["Basic Member", "Premium Member", "Lifetime Member"]),
  sevaInterest: z.string().trim().min(2).max(120),
  termsAccepted: z.union([z.literal("true"), z.literal("1"), z.boolean()]).optional(),
});

export const membershipPaymentCreateSchema = z.object({
  membershipId: z.string().min(1),
});

export const membershipPaymentVerifySchema = z.object({
  membershipId: z.string().min(1),
  razorpay_order_id: z.string().min(1),
  razorpay_payment_id: z.string().min(1),
  razorpay_signature: z.string().min(1),
});

export const membershipStatusUpdateSchema = z.object({
  membershipStatus: z.enum(["pending", "approved", "rejected"]),
});
