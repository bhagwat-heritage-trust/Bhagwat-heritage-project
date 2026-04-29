import mongoose, { Document, Schema } from "mongoose";

export interface IJoin extends Document {
  name: string;
  email: string;
  phone?: string;
  city?: string;
  age?: number;
  interest?: string;
  helpType?: string;
  preferredSevaArea?: string;
  availability?: string;
  skills?: string;
  contributionMode?: string;
  joinTimeline?: string;
  message?: string;
  createdAt: Date;
}

const joinSchema = new Schema<IJoin>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  city: { type: String },
  age: { type: Number },
  interest: { type: String },
  helpType: { type: String },
  preferredSevaArea: { type: String },
  availability: { type: String },
  skills: { type: String },
  contributionMode: { type: String },
  joinTimeline: { type: String },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IJoin>("Join", joinSchema);
