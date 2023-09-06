import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export default mongoose.model('cropmodel', cropSchema);
