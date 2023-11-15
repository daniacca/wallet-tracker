import mongoose, { Schema, Document } from "mongoose";
import { IUser, Roles } from "./interfaces/IUser.js";

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, maxlength: 50 },
    email: { type: String, required: true, maxlength: 100 },
    password: { type: String, required: true, maxlength: 100 },
    role: { type: String, required: true, default: Roles.USER, enum: Object.values(Roles) },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export type UserDocument = IUser & Document;

const User = mongoose.model<UserDocument>("User", UserSchema);
export default User;
