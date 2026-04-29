import mongoose, { Document, Schema } from "mongoose";

export type VolunteerApplicationStatus = "pending" | "reviewing" | "approved" | "rejected";

export interface IVolunteerApplication extends Document {
  fullName: string;
  email: string;
  mobile: string;
  whatsapp?: string;
  city: string;
  state: string;
  ageGroup: "16-20" | "21-30" | "31-45" | "46-60" | "60+";
  sevaArea: string;
  skills?: string;
  availability?: "Weekdays" | "Weekends" | "Flexible";
  hoursPerWeek?: "2" | "4" | "6" | "8" | "10+";
  preferredMode?: "On-site" | "Remote" | "Hybrid";
  motivation: string;
  experience?: string;
  consent: boolean;
  whatsappConsent: boolean;
  sourcePage: string;
  status: VolunteerApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const volunteerApplicationSchema = new Schema<IVolunteerApplication>(
  {
    fullName: { type: String, required: true, trim: true, minlength: 3 },
    email: { type: String, required: true, lowercase: true, trim: true, match: [/^\S+@\S+\.\S+$/, "Invalid email"] },
    mobile: { type: String, required: true, trim: true, match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"] },
    whatsapp: { type: String, trim: true, match: [/^[6-9]\d{9}$/, "Invalid Indian mobile number"] },
    city: { type: String, required: true, trim: true, maxlength: 120 },
    state: { type: String, required: true, trim: true, maxlength: 120 },
    ageGroup: { type: String, required: true, enum: ["16-20", "21-30", "31-45", "46-60", "60+"] },
    sevaArea: { type: String, required: true, trim: true, maxlength: 160 },
    skills: { type: String, trim: true, maxlength: 320 },
    availability: { type: String, enum: ["Weekdays", "Weekends", "Flexible"] },
    hoursPerWeek: { type: String, enum: ["2", "4", "6", "8", "10+"] },
    preferredMode: { type: String, enum: ["On-site", "Remote", "Hybrid"] },
    motivation: { type: String, required: true, trim: true, maxlength: 500 },
    experience: { type: String, trim: true, maxlength: 500 },
    consent: { type: Boolean, required: true },
    whatsappConsent: { type: Boolean, default: false },
    sourcePage: { type: String, required: true, trim: true, default: "/get-involved/volunteer-registration" },
    status: { type: String, enum: ["pending", "reviewing", "approved", "rejected"], default: "pending" },
  },
  {
    timestamps: true,
    collection: "volunteer_applications",
  }
);

export default mongoose.model<IVolunteerApplication>("VolunteerApplication", volunteerApplicationSchema);
