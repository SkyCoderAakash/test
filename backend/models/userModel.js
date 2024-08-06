import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
      lowercase: true,
    },
    email: {
      required: true,
      type: String,
      lowercase: true,
    },
    password: {
      required: true,
      type: String,
    },
    isAdmin: {
      default: 0,
      type: Number,
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
