import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profileImg: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("Authenticate", userSchema);
