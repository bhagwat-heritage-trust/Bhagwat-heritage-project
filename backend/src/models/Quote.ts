import mongoose, { Document, Schema } from "mongoose";

export interface IQuote extends Document {
  title?: string;
  quoteText: string;
  theme: string;
  language: string;
  source: string;
  author?: string;
  publishDate: Date;
  isFeatured: boolean;
  isPublished: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

const quoteSchema = new Schema<IQuote>(
  {
    title: { type: String, trim: true, maxlength: 160 },
    quoteText: { type: String, required: true, trim: true, maxlength: 1200 },
    theme: { type: String, required: true, trim: true, maxlength: 80 },
    language: { type: String, trim: true, default: "en", maxlength: 20 },
    source: { type: String, trim: true, default: "Bhagwat Reflection Desk", maxlength: 200 },
    author: { type: String, trim: true, maxlength: 120 },
    publishDate: { type: Date, required: true },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    createdBy: { type: String, required: true, trim: true, maxlength: 120 },
  },
  { timestamps: true },
);

quoteSchema.index({ isPublished: 1, publishDate: -1 });
quoteSchema.index({ theme: 1, isPublished: 1 });
quoteSchema.index({ publishDate: -1, isFeatured: -1 });

export default mongoose.model<IQuote>("Quote", quoteSchema);
