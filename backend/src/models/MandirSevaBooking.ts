import mongoose, { Document, Schema } from "mongoose";

export type MandirSevaBookingStatus = "New" | "Contacted" | "Confirmed" | "Completed";

export interface IMandirSevaBooking extends Document {
  fullName: string;
  mobile: string;
  email: string;
  serviceName: string;
  preferredDate: Date;
  message?: string;
  status: MandirSevaBookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const mandirSevaBookingSchema = new Schema<IMandirSevaBooking>(
  {
    fullName: { type: String, required: true, trim: true, maxlength: 140 },
    mobile: { type: String, required: true, trim: true, maxlength: 30 },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 140 },
    serviceName: { type: String, required: true, trim: true, maxlength: 180 },
    preferredDate: { type: Date, required: true },
    message: { type: String, trim: true, maxlength: 1400 },
    status: {
      type: String,
      enum: ["New", "Contacted", "Confirmed", "Completed"],
      default: "New",
    },
  },
  { timestamps: true },
);

mandirSevaBookingSchema.index({ status: 1, createdAt: -1 });
mandirSevaBookingSchema.index({ preferredDate: 1, createdAt: -1 });

export default mongoose.model<IMandirSevaBooking>("MandirSevaBooking", mandirSevaBookingSchema);

