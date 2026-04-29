import nodemailer from "nodemailer";
import { env } from "../config/env";
import { logger } from "./logger";
import type { IVolunteerApplication } from "../models/VolunteerApplication";

export async function sendVolunteerApplicationMail(application: IVolunteerApplication): Promise<void> {
  if (!env.EMAIL_USER || !env.EMAIL_PASS) {
    logger.warn("Email credentials not configured; skipping volunteer application mail");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: env.EMAIL_USER,
      pass: env.EMAIL_PASS,
    },
  });

  const adminRecipient = "join@bhagwatheritage.org";

  await transporter.sendMail({
    from: `"Bhagwat Heritage Volunteer Desk" <${env.EMAIL_USER}>`,
    to: adminRecipient,
    subject: `New Volunteer Application: ${application.fullName}`,
    html: `
      <h2>New Volunteer Registration</h2>
      <p><strong>Name:</strong> ${application.fullName}</p>
      <p><strong>Email:</strong> ${application.email}</p>
      <p><strong>Mobile:</strong> ${application.mobile}</p>
      <p><strong>WhatsApp:</strong> ${application.whatsapp ?? "N/A"}</p>
      <p><strong>City/State:</strong> ${application.city}, ${application.state}</p>
      <p><strong>Age Group:</strong> ${application.ageGroup}</p>
      <p><strong>Seva Area:</strong> ${application.sevaArea}</p>
      <p><strong>Availability:</strong> ${application.availability ?? "N/A"}</p>
      <p><strong>Hours/Week:</strong> ${application.hoursPerWeek ?? "N/A"}</p>
      <p><strong>Preferred Mode:</strong> ${application.preferredMode ?? "N/A"}</p>
      <p><strong>Skills:</strong> ${application.skills ?? "N/A"}</p>
      <p><strong>Motivation:</strong> ${application.motivation}</p>
      <p><strong>Experience:</strong> ${application.experience ?? "N/A"}</p>
      <p><strong>WhatsApp Updates Consent:</strong> ${application.whatsappConsent ? "Yes" : "No"}</p>
      <p><strong>Status:</strong> ${application.status}</p>
      <p><strong>Source:</strong> ${application.sourcePage}</p>
      <p><strong>Submitted At:</strong> ${application.createdAt.toISOString()}</p>
    `,
  });

  await transporter.sendMail({
    from: `"Bhagwat Heritage Service Foundation Trust" <${env.EMAIL_USER}>`,
    to: application.email,
    subject: "Application Submitted Successfully",
    html: `
      <h2>Thank you for your seva sankalp</h2>
      <p>Dear ${application.fullName},</p>
      <p>Thank you for registering as a volunteer with Bhagwat Heritage Service Foundation Trust.</p>
      <p>Our team will review your application and contact you soon.</p>
      <p>With gratitude,<br/>Bhagwat Heritage Service Foundation Trust</p>
    `,
  });
}
