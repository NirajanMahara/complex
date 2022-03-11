import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema(
  {
    email: { type: String },
    code: { type: String },
    expireIn: { type: Number },
  },
  {
    timestamps: true,
  }
);

const otp = mongoose.model('otp', otpSchema, 'otp');

export default otp;
