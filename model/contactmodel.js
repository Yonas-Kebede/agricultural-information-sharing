//for now here is the model for user it will be updated latter on
import mongoose from "mongoose";
// Job model schema
const contactSchema = new mongoose.Schema({
    phoneNumber: {
        type: Number,
        required: true,
      },
});

    
export default mongoose.model('contactmodel', contactSchema);