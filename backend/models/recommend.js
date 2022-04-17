import mongoose from 'mongoose';

const recommend = new mongoose.Schema(
  {
    userId: { type: String },
    productId: { type: String },
    ratings: { type: Number },
  },
  {
    timestamps: true,
  }
);

const recommendModel = mongoose.model('recommend', recommend, 'recommend');

export default recommendModel;
