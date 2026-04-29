import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import OnlineSatsangRequest from "../models/OnlineSatsangRequest";
import { onlineSatsangRequestSchema } from "../schemas/onlineSatsang.schemas";
import { sendMail } from "../utils/sendMail";
import { logger } from "../utils/logger";

export const createOnlineSatsangRequest = asyncHandler(async (req: Request, res: Response) => {
  const payload = onlineSatsangRequestSchema.parse(req.body);
  const request = await OnlineSatsangRequest.create({
    ...payload,
    messagePurpose: payload.messagePurpose || undefined,
  });

  try {
    await sendMail({
      name: payload.fullName,
      email: payload.email,
      phone: payload.mobileNumber,
      interest: "Online Satsang Request",
      message: `Type: ${payload.satsangType} | Mode: ${payload.preferredMode} | Date: ${payload.preferredDate} | Time: ${payload.preferredTime} | Location: ${payload.cityCountry} | Purpose: ${payload.messagePurpose || "N/A"}`,
    });
  } catch (error) {
    logger.warn({ error }, "Unable to send online satsang request email");
  }

  res.status(201).json({ message: "Online satsang request submitted", request });
});
