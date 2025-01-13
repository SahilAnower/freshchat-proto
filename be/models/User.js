import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
  },
  hashedPassword: {
    type: String,
  },
  userType: {
    type: String,
    default: "ADMIN",
    enum: ["USER", "ADMIN"],
  },
}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;
