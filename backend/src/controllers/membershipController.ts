import { createHmac, timingSafeEqual } from "crypto";
import type { Request, Response } from "express";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
import { env } from "../config/env";
import Membership from "../models/Membership";
import {
  membershipPaymentCreateSchema,
  membershipPaymentVerifySchema,
  membershipRegisterSchema,
  membershipStatusUpdateSchema,
} from "../schemas/membership.schemas";
import { asyncHandler } from "../utils/asyncHandler";
import { logger } from "../utils/logger";
import { sendMail } from "../utils/sendMail";

const PLAN_AMOUNT: Record<"Basic Member" | "Premium Member" | "Lifetime Member", number> = {
  "Basic Member": 499,
  "Premium Member": 1999,
  "Lifetime Member": 11000,
};

async function uploadSingle(file: Express.Multer.File, folder: string) {
  return new Promise<{ secure_url: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image" }, (error, uploaded) => {
      if (error || !uploaded) {
        reject(error ?? new Error("Upload failed"));
        return;
      }
      resolve(uploaded);
    });
    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

async function createRazorpayOrder(amount: number, notes: Record<string, string>) {
  if (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are not configured");
  }

  const credentials = Buffer.from(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`).toString("base64");
  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `member_${Date.now()}`,
      notes,
    }),
  });

  if (!response.ok) {
    logger.error({ amount, notes, message: await response.text() }, "Unable to create membership order");
    throw new Error("Unable to create order");
  }

  return response.json() as Promise<{ id: string; amount: number; currency: string }>;
}

function verifySignature(orderId: string, paymentId: string, signature: string) {
  if (!env.RAZORPAY_KEY_SECRET) return false;
  const digest = createHmac("sha256", env.RAZORPAY_KEY_SECRET).update(`${orderId}|${paymentId}`).digest("hex");
  const expected = Buffer.from(digest);
  const received = Buffer.from(signature);
  if (expected.length !== received.length) return false;
  return timingSafeEqual(expected, received);
}

export const registerMembership = asyncHandler(async (req: Request, res: Response) => {
  const payload = membershipRegisterSchema.parse(req.body);
  const files = req.files as { profilePhoto?: Express.Multer.File[]; idProof?: Express.Multer.File[] } | undefined;

  const profilePhotoFile = files?.profilePhoto?.[0];
  const idProofFile = files?.idProof?.[0];

  let profilePhotoUrl: string | undefined;
  let idProofUrl: string | undefined;

  if (profilePhotoFile) {
    const uploaded = await uploadSingle(profilePhotoFile, "memberships/profile");
    profilePhotoUrl = uploaded.secure_url;
  }

  if (idProofFile) {
    const uploaded = await uploadSingle(idProofFile, "memberships/id-proof");
    idProofUrl = uploaded.secure_url;
  }

  const membership = await Membership.create({
    ...payload,
    profilePhotoUrl,
    idProofUrl,
    paymentStatus: "pending",
    membershipStatus: "pending",
  });

  res.status(201).json({ message: "Membership registration submitted", membership });
});

export const createMembershipPaymentOrder = asyncHandler(async (req: Request, res: Response) => {
  const { membershipId } = membershipPaymentCreateSchema.parse(req.body);
  const membership = await Membership.findById(membershipId);
  if (!membership) {
    res.status(404).json({ message: "Membership not found" });
    return;
  }

  const amount = PLAN_AMOUNT[membership.plan];

  try {
    const order = await createRazorpayOrder(amount, {
      membershipId: String(membership._id),
      plan: membership.plan,
      email: membership.email,
    });

    membership.orderId = order.id;
    membership.paymentStatus = "created";
    await membership.save();

    res.json({
      keyId: env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount,
      currency: order.currency,
      membershipId: membership.id,
    });
  } catch (error) {
    res.status(502).json({
      message:
        error instanceof Error && error.message === "Razorpay credentials are not configured"
          ? "Razorpay is not configured on the server"
          : "Unable to create payment order",
    });
  }
});

export const verifyMembershipPayment = asyncHandler(async (req: Request, res: Response) => {
  const payload = membershipPaymentVerifySchema.parse(req.body);
  const membership = await Membership.findById(payload.membershipId);
  if (!membership) {
    res.status(404).json({ message: "Membership not found" });
    return;
  }

  if (!verifySignature(payload.razorpay_order_id, payload.razorpay_payment_id, payload.razorpay_signature)) {
    membership.paymentStatus = "failed";
    await membership.save();
    res.status(400).json({ message: "Invalid payment signature" });
    return;
  }

  membership.orderId = payload.razorpay_order_id;
  membership.paymentId = payload.razorpay_payment_id;
  membership.paymentStatus = "paid";
  await membership.save();

  try {
    await sendMail({
      name: membership.fullName,
      email: membership.email,
      phone: membership.phone,
      interest: "Membership Payment Confirmation",
      message: `Payment completed for ${membership.plan}. Membership is pending admin verification.`,
    });
  } catch (error) {
    logger.warn({ error }, "Unable to send membership payment confirmation");
  }

  res.json({ message: "Payment verified. Membership pending admin approval.", membership });
});

export const getMembershipProfile = asyncHandler(async (req: Request, res: Response) => {
  const id = String(req.query.membershipId || "");
  if (!id) {
    res.status(400).json({ message: "membershipId query is required" });
    return;
  }
  const membership = await Membership.findById(id);
  if (!membership) {
    res.status(404).json({ message: "Membership not found" });
    return;
  }
  res.json(membership);
});

export const getMembershipCard = asyncHandler(async (req: Request, res: Response) => {
  const membership = await Membership.findOne({ memberId: req.params.memberId });
  if (!membership) {
    res.status(404).json({ message: "Member not found" });
    return;
  }
  if (membership.membershipStatus !== "approved") {
    res.status(403).json({ message: "Membership card is available after admin approval only" });
    return;
  }
  res.json({
    memberId: membership.memberId,
    fullName: membership.fullName,
    plan: membership.plan,
    joinDate: membership.joinDate,
    validTill: membership.validTill,
    status: membership.membershipStatus,
    profilePhotoUrl: membership.profilePhotoUrl,
    cardUrl: membership.cardUrl,
    qrVerificationUrl: membership.qrVerificationUrl,
  });
});

export const verifyMembershipById = asyncHandler(async (req: Request, res: Response) => {
  const membership = await Membership.findOne({ memberId: req.params.memberId });
  if (!membership) {
    res.status(404).json({ message: "Member not found" });
    return;
  }
  res.json({
    memberId: membership.memberId,
    fullName: membership.fullName,
    plan: membership.plan,
    membershipStatus: membership.membershipStatus,
    joinDate: membership.joinDate,
    validTill: membership.validTill,
  });
});

export const adminGetMemberships = asyncHandler(async (_req: Request, res: Response) => {
  const memberships = await Membership.find().sort({ createdAt: -1 });
  res.json(memberships);
});

export const adminUpdateMembershipStatus = asyncHandler(async (req: Request, res: Response) => {
  const { membershipStatus } = membershipStatusUpdateSchema.parse(req.body);
  const membership = await Membership.findById(req.params.id);
  if (!membership) {
    res.status(404).json({ message: "Membership not found" });
    return;
  }
  membership.membershipStatus = membershipStatus;
  await membership.save();
  res.json({ message: "Membership status updated", membership });
});

export const adminGenerateMembershipCard = asyncHandler(async (req: Request, res: Response) => {
  const membership = await Membership.findById(req.params.id);
  if (!membership) {
    res.status(404).json({ message: "Membership not found" });
    return;
  }

  if (membership.membershipStatus !== "approved") {
    res.status(400).json({ message: "Membership must be approved before card generation" });
    return;
  }

  if (!membership.memberId) {
    membership.memberId = `BHSF-${String(membership._id).slice(-6).toUpperCase()}`;
  }

  const now = new Date();
  membership.joinDate = now;
  membership.validTill = membership.plan === "Lifetime Member" ? null : new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  membership.qrVerificationUrl = `/verify-member/${membership.memberId}`;
  membership.cardUrl = `/api/membership/card/${membership.memberId}`;
  await membership.save();

  res.json({ message: "Membership card generated", membership });
});
