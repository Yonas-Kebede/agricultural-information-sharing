import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel",
  },
});

export default mongoose.model("newsmodel", newsSchema);
