import mongoose from 'mongoose';

const recommend = new mongoose.Schema(
  {
    user_id: { type: Number },
    userId: { type: String, required: true, unique: true },
    productId: { type: String },
    ratings: { type: Number },
  },
  {
    timestamps: true,
  }
);

const recommendModel = mongoose.model('recommend', recommend, 'recommend');

export default recommendModel;
