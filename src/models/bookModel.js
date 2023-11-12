import { Schema, model } from "mongoose";

const BookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    author: { type: String, required: true },
    rating: { type: Number, default: 0 },
    fileCover: { type: String },
    fileBook: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default model("Book", BookSchema);
