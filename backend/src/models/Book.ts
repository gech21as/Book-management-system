import { Schema, model, Document } from 'mongoose';

export interface IBook extends Document {
  title: string;
  author: string;
  year?: number;
  language?: string;
  origin?: string;
  category?: string;
  description?: string;
  coverImage?: string;
  pages?: number;
  institution?: string;
  condition?: string;
  digitalizedDate?: Date | string;
  rating?: number;
  totalRatings?: number;
  content?: string;
}

const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  year: { type: Number },
  language: { type: String },
  origin: { type: String },
  category: { type: String },
  description: { type: String },
  coverImage: { type: String },
  pages: { type: Number },
  institution: { type: String },
  condition: { type: String },
  digitalizedDate: { type: Schema.Types.Mixed },
  rating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  content: { type: String }
}, { timestamps: true });

export default model<IBook>('Book', BookSchema);
