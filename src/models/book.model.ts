import { Schema, model, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  year: number;
  topic: string;
  rating: number;
  available: boolean;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true, unique: true },
    author: { type: String, required: true, trim: true, },
    year: { type: Number, required: true, min: 1950 },
    topic: { type: String, required: true, },
    rating: { type: Number, required: true, min: 1 },
    available: { type: Boolean, required: true, },
  },
  { timestamps: true }
);

bookSchema.index({ author: 1, year: 1, topic: 1 });
bookSchema.index({ rating: -1 })

const BookModel = model<IBook>("Book", bookSchema);

export default BookModel;
