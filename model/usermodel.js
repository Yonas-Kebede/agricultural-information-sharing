//for now here is the model for user it will be updated latter on

import mongoose from "mongoose";
 const usermodel = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true
      },
    role: {
        type: String,
        default: "farmer",
      },
    date: {
        type: Date, 
        default: Date.now 
      },
    tokens:[{
      token:{
        type:String,
        
      }
    }],
    // resetToken: This field is specifically used for the password reset functionality
    resetToken: {
      type: String,
    },
    // This field represents the expiration time for the resetToken.
    resetTokenExpiration: {
      type: Date,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    phone: {
      type: String,
      default: ''
    },
    chatlink: {
      type: String,
      default: ''
    },
});
    
export default mongoose.model('usermodel', usermodel);