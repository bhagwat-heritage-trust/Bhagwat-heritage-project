import type { Request, Response } from "express";
import MandirSevaBooking from "../models/MandirSevaBooking";
import { mandirSevaBookingCreateSchema, mandirSevaBookingStatusSchema } from "../schemas/mandirSevaBooking.schemas";
import { asyncHandler } from "../utils/asyncHandler";

function parsePreferredDate(value: string) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    throw Object.assign(new Error("Invalid preferredDate"), { statusCode: 400 });
  }
  return parsed;
}

export const createMandirSevaBooking = asyncHandler(async (req: Request, res: Response) => {
  const payload = mandirSevaBookingCreateSchema.parse(req.body);

  const booking = await MandirSevaBooking.create({
    fullName: payload.fullName,
    mobile: payload.mobile,
    email: payload.email,
    serviceName: payload.serviceName,
    preferredDate: parsePreferredDate(payload.preferredDate),
    message: payload.message,
  });

  res.status(201).json({
    message: "Your seva request has been received. Our team will contact you shortly.",
    booking,
  });
});

export const getMandirSevaBookingsAdmin = asyncHandler(async (_req: Request, res: Response) => {
  const items = await MandirSevaBooking.find().sort({ createdAt: -1 });
  res.json({ items });
});

export const updateMandirSevaBookingStatus = asyncHandler(async (req: Request, res: Response) => {
  const payload = mandirSevaBookingStatusSchema.parse(req.body);
  const booking = await MandirSevaBooking.findById(req.params.id);

  if (!booking) {
    res.status(404).json({ message: "Booking request not found" });
    return;
  }

  booking.status = payload.status;
  await booking.save();

  res.json({ message: "Booking status updated", booking });
});

