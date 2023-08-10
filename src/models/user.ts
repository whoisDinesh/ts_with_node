import { User } from "@/interfaces/users.interface";
import { Document, Schema, model } from "mongoose";

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, lowercase: true, unique: true },
    gstNumber: { type: String, required: true, unique: true },
  },
  { collection: "User", timestamps: true }
);

export const userModel = model<User & Document>("User", userSchema);
