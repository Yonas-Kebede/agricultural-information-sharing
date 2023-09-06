import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
 
  phone: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'usermodel',
    required: true,
  },
  image: {
    data: Buffer,
    contentType: String
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('productmodel', productSchema);

