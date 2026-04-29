import mongoose, { Document, Schema } from "mongoose";

export type MembershipStatus = "pending" | "approved" | "rejected";
export type PaymentStatus = "pending" | "created" | "paid" | "failed";

export interface IMembership extends Document {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  plan: "Basic Member" | "Premium Member" | "Lifetime Member";
  sevaInterest: string;
  profilePhotoUrl?: string;
  idProofUrl?: string;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  orderId?: string;
  membershipStatus: MembershipStatus;
  memberId?: string;
  cardUrl?: string;
  qrVerificationUrl?: string;
  joinDate?: Date;
  validTill?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const membershipSchema = new Schema<IMembership>(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    dob: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    plan: { type: String, required: true, enum: ["Basic Member", "Premium Member", "Lifetime Member"] },
    sevaInterest: { type: String, required: true, trim: true },
    profilePhotoUrl: { type: String, trim: true },
    idProofUrl: { type: String, trim: true },
    paymentStatus: { type: String, enum: ["pending", "created", "paid", "failed"], default: "pending" },
    paymentId: { type: String, trim: true },
    orderId: { type: String, trim: true },
    membershipStatus: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    memberId: { type: String, trim: true },
    cardUrl: { type: String, trim: true },
    qrVerificationUrl: { type: String, trim: true },
    joinDate: { type: Date },
    validTill: { type: Date, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IMembership>("Membership", membershipSchema);
