import { Schema, model } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true },
    userName: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatarUrl: {
      type: String,
      default: `${process.env.API_URL}/src/upload/DefaultAvatar.svg`,
    },
    isActivated: { type: Boolean, default: false },
    activationLink: { type: String },
    role: { type: String, default: "USER" },
    favorites: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
