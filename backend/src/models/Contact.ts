import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  fullName: string;
  phone: string;
  email: string;
  city: string;
  inquiryType: string;
  preferredContactMethod: "Phone Call" | "WhatsApp" | "Email";
  urgency: "Normal" | "Important" | "Emergency Seva Support";
  subject: string;
  message: string;
  consent: boolean;
  createdAt: Date;
}

const contactSchema = new Schema<IContact>({
  fullName: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, required: true },
  city: { type: String, required: true, trim: true },
  inquiryType: { type: String, required: true, trim: true },
  preferredContactMethod: { type: String, required: true, enum: ["Phone Call", "WhatsApp", "Email"] },
  urgency: { type: String, required: true, enum: ["Normal", "Important", "Emergency Seva Support"] },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true },
  consent: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IContact>("Contact", contactSchema);
