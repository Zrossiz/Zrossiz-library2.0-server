import { Schema, model } from "mongoose";

const CommentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    bookId: { type: Schema.Types.ObjectId, ref: "Book" },
    rating: { type: Number, default: 0, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model("Comment", CommentSchema);
