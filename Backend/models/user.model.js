import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    fullname: {
      firstname: {
        type: String,
        required: true,
        min: [3, "First Name required atleast 3 characters"],
      },
      lastname: {
        type: String,
        min: [3, "Last Name required atleast 3 characters"],
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      line1: {
        type: String,
      },
      line2: {
        type: String,
      },
    },
    image: {
      type: String,
      default: "",
    },
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
  },
  { timestamps: true }
);

userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 12);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.setToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

const User = mongoose.model("User", userSchema);

export default User;
