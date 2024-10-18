import { Schema, model, Document } from "mongoose";

// Define an interface for the Book document
export interface IBook extends Document {
  title: string;
  author: string;
  year: number;
  topic: string;
  rating: number;
  available: boolean;
}

// Create the Mongoose schema for a Book
const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true, unique: true },
    author: { type: String, required: true, trim: true, },
    year: { type: Number, required: true, min: 1950 }, // Basic validation to ensure year is a reasonable value},
    topic: { type: String, required: true, },
    rating: { type: Number, required: true, min: 1 }, // Minimum rating of 1max: 5, // Maximum rating of 5},
    available: { type: Boolean, required: true, },
  },
  { timestamps: true }
);

bookSchema.index({ author: 1, year: 1, topic: 1 });
bookSchema.index({ rating: -1 })

// Export the Book model
const BookModel = model<IBook>("Book", bookSchema);

export default BookModel;
