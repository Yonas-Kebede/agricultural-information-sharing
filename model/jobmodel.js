//for now here is the model for user it will be updated latter on
import mongoose from "mongoose";
// Job model schema
const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  company: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'usermodel' }, // Reference to the User model
  date: { type: Date, default: Date.now } ,// Date field with default value of current date

});

    
export default mongoose.model('jobmodel', jobSchema);