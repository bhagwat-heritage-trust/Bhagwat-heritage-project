import mongoose, { Document, Schema } from "mongoose";

export interface IOnlineSatsangRequest extends Document {
  fullName: string;
  mobileNumber: string;
  email: string;
  cityCountry: string;
  satsangType: "Family" | "Group" | "Community" | "Institution" | "Festival" | "Special Occasion";
  preferredMode: "Audio" | "Video" | "Zoom" | "YouTube" | "WhatsApp" | "Website Live";
  preferredDate: string;
  preferredTime: string;
  messagePurpose?: string;
  createdAt: Date;
}

const onlineSatsangRequestSchema = new Schema<IOnlineSatsangRequest>({
  fullName: { type: String, required: true, trim: true },
  mobileNumber: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  cityCountry: { type: String, required: true, trim: true },
  satsangType: {
    type: String,
    enum: ["Family", "Group", "Community", "Institution", "Festival", "Special Occasion"],
    required: true,
  },
  preferredMode: {
    type: String,
    enum: ["Audio", "Video", "Zoom", "YouTube", "WhatsApp", "Website Live"],
    required: true,
  },
  preferredDate: { type: String, required: true, trim: true },
  preferredTime: { type: String, required: true, trim: true },
  messagePurpose: { type: String, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOnlineSatsangRequest>("OnlineSatsangRequest", onlineSatsangRequestSchema);
