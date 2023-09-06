import mongoose from "mongoose";

const marketDataSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true},
  date: { 
    type: Date, 
    required: true,
    default:Date.now },
  price: { 
    type: Number,
     required: true },
});

export default mongoose.model('marketmodel', marketDataSchema);


