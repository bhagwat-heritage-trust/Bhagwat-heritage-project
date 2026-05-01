import mongoose, { Document, Schema } from "mongoose";

export type DonationType = "Annadaan" | "Jal Seva" | "Both";
export type DonationMode = "One-Time" | "Monthly";
export type DonationFundType = "general" | "gau-seva" | "annadan" | "bhagwat-dham";
export type DonationPaymentFlow = "Order" | "Subscription" | "Manual";
export type DonationPaymentStatus = "Pending" | "Created" | "Paid" | "Failed";
export type DonationStatus = "Pending" | "Completed" | "Failed";

export interface IDonation extends Document {
  amount: number;
  name: string;
  email: string;
  mobile?: string;
  donationType: DonationType;
  fund_type: DonationFundType;
  occasion?: string;
  message?: string;
  sponsorLabel?: string;
  campaignId?: mongoose.Types.ObjectId;
  campaignTitle?: string;
  donationMode: DonationMode;
  recurringPlan?: number;
  paymentProvider: string;
  paymentFlow: DonationPaymentFlow;
  paymentStatus: DonationPaymentStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  razorpaySubscriptionId?: string;
  receiptId?: string;
  status: DonationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    amount: { type: Number, required: true, min: 1 },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    mobile: { type: String, trim: true },
    donationType: {
      type: String,
      enum: ["Annadaan", "Jal Seva", "Both"],
      default: "Both",
    },
    fund_type: {
      type: String,
      enum: ["general", "gau-seva", "annadan", "bhagwat-dham"],
      default: "general",
      index: true,
    },
    occasion: { type: String, trim: true },
    message: { type: String, trim: true },
    sponsorLabel: { type: String, trim: true },
    campaignId: { type: Schema.Types.ObjectId, ref: "Campaign" },
    campaignTitle: { type: String, trim: true },
    donationMode: {
      type: String,
      enum: ["One-Time", "Monthly"],
      default: "One-Time",
    },
    recurringPlan: { type: Number, min: 1 },
    paymentProvider: { type: String, default: "Razorpay" },
    paymentFlow: {
      type: String,
      enum: ["Order", "Subscription", "Manual"],
      default: "Manual",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Created", "Paid", "Failed"],
      default: "Pending",
    },
    razorpayOrderId: { type: String, trim: true },
    razorpayPaymentId: { type: String, trim: true },
    razorpaySignature: { type: String, trim: true },
    razorpaySubscriptionId: { type: String, trim: true },
    receiptId: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Pending", "Completed", "Failed"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

donationSchema.index({ createdAt: -1 });
donationSchema.index({ paymentStatus: 1, donationType: 1 });
donationSchema.index({ fund_type: 1, paymentStatus: 1 });

export default mongoose.model<IDonation>("Donation", donationSchema);
