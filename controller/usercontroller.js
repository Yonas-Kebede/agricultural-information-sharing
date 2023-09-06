import bcrypt from 'bcryptjs'
import validator from "validator"
import  Jwt  from 'jsonwebtoken';
import dotev from 'dotenv';
import usermodel from '../model/usermodel.js';
import fs from 'fs'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import { error } from 'console';
import sendEmail from './sendEmail.js'
import { types } from 'util';
dotev.config()
//login secretkey..
//to register user

export const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role,chatlink,phone } = req.body;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // Check if a user with the same email already exists
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Email already exists' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Validate password format
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character',
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check if role is empty
    if (!role) {
      return res.status(400).json({ success: false, message: 'Role is required' });
    }

    // Check if name is empty
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);


    let user;
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'image is required' });
    }
      // If file is provided, save image data to the user
      user = new usermodel({
        name,
        email,
        password: hashedPassword,
        role,
        phone,
        chatlink,
        image: {
          data: fs.readFileSync("uploads/" + req.file.filename),
          contentType: req.file.mimetype,
        },
      });

    // Save the user to the database
    await user.save();

    res.status(201).json(user);
    console.log(user)

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

    //this is how we handle it in the front end
    //in the frontend code when we post data or when we register
    //const response = await post('/.....
    //1. If the response status is within the range of 200-299 (indicating a successful response),
    // you can access the message property in the result object to get the success message (result.msg).
    //2. If the response status is outside of that range, indicating an error response,
    // you can access the error property in the result object to get the error message (result.error).
    // const result = await response.json();
    // import React, { useState } from 'react';
    // import axios from 'axios';
    
    // const RegistrationForm = () => {
    //   const [name, setName] = useState('');
    //   const [email, setEmail] = useState('');
    //   const [password, setPassword] = useState('');
    //   const [confirmPassword, setConfirmPassword] = useState('');
    //   const [role, setRole] = useState('');
    //   const [error, setError] = useState('');
    //   const [success, setSuccess] = useState(false);
    
    //   const handleSubmit = async (e) => {
    //     e.preventDefault();
    
    //     try {
    //       const response = await axios.post('/api/register', {
    //         name,
    //         email,
    //         password,
    //         confirmPassword,
    //         role,
    //       });
    
    //       if (response.status === 201) {
    //         setSuccess(true);
    //         setError('');
    //       }
    //     } catch (error) {
    //       setSuccess(false);
    //       if (error.response) {
    //         setError(error.response.data.message);
    //       } else {
    //         setError('An error occurred during registration.');
    //       }
    //     }
    //   };
    
    //   return (
    //     <form onSubmit={handleSubmit}>
    //       {success && <p>User registered successfully.</p>}
    //       {error && <p>{error}</p>}
    
    //       <label>
    //         Name:
    //         <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    //       </label>
    
    //       <label>
    //         Email:
    //         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
    //       </label>
    
    //       <label>
    //         Password:
    //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //       </label>
    
    //       <label>
    //         Confirm Password:
    //         <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    //       </label>
    
    //       <label>
    //         Role:
    //         <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
    //       </label>
    
    //       <button type="submit">Register</button>
    //     </form>
    //   );
    // };
    
    // export default RegistrationForm;
    
    
    export const getAllUsers = async (req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const roles = req.query.role;
      if(!roles){
        console.log(roles)

      }
 console.log(roles)
        const farmers = await usermodel
          .find({ role: roles })
          .select("-password")
          .skip(skip)
          .limit(limit);
         
    
        const count = await usermodel.countDocuments({ role:roles });
    console.log(`vvvvvvvvv+${count}`)
        const profileData = farmers.map((farmer) => {
          return {
            _id: farmer._id,
            name: farmer.name,
            email: farmer.email,
            chatlink:farmer.chatlink,
            image: {
              contentType: farmer.image.contentType,
            
              data: farmer.image.data.toString('base64'),
              
            },
          };
        });
    
        res.status(200).json({
          data: profileData,
          count,
          message: "List of farmers",
        });
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ success: false, message: "An error occurred while fetching the farmers." });
      }
    };
    

  // Backend: getUserById
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    // const user = await usermodel.findOne({ email });
    const user = await usermodel.findById({_id: id}).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    console.log(user.name)
   const { name, email } = user;
   res.json({
    name,
    email,
    image: {
      contentType: user.image.contentType,
      data: user.image.data.toString('base64'),
    },
  });
    // res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "An error occurred while fetching the user" });
  }
};
  
  export const removeAccount = async (req, res) => {
    try {
      const { id: userId } = req.params;
  
      // // Check if the authenticated user is authorized to delete the account pass authenticate middleware
      // if (req.user.role !== "admin" &&!== userId) {
      //   return res.status(403).json({
      //     success: false,
      //     message: "You are not authorized to delete this account.",
      //   });
      // }
  
      const user = await usermodel.findOneAndRemove({ _id: userId });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: `No user with id: ${userId} found.`,
        });
      }
  
      res.status(200).json({ success: true, message: "Account deleted successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred while deleting the account." });
    }
  };
  

  export const updateAccount = async (req, res) => {
    // to update the account id pass by params
   
    try {
      const { id: userId } = req.params;
      const { name, email, password,confirmPassword,role} = req.body;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
  
      if (!name || !email || !role) {
        return res.status(400).json({ success: false, message: "Please provide name, email, and role." });
      }

      // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    // Validate password format
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character',
      });
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    

      const updatedData = {
        name,
        email,
        password: hashedPassword,
        role,
      };
  
      if (req.file) {
        // If an image is uploaded, add the image data to the update data
        updatedData.image = {
          data: await fs.promises.readFile('uploads/' + req.file.filename),
          contentType: req.file.mimetype,
        };
      }
      console.log(name, email, role);
      const user = await usermodel.findByIdAndUpdate(
          userId,
          updatedData,
        { runValidators: true, new: true }
      );
  
      if (!user) {
        return res.status(400).json({ success: false, message: "Unable to update the account." });
      }
  
      res.status(200).json({ success: true,user, message: "Account updated successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred while updating the account." });
    }
  };
  

 
 
  export const login = async (req, res) => {
    const { email, password } = req.body;
 
    // Validate the request parameters
    if (!password || !email) {
      return res.status(400).json({ success: false, message: "Please provide the email and password." });
    }
  
    try {
      // Find the user based on the provided email
      const user = await usermodel.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: "Invalid credentials." });
      }
  
      // Compare the provided password with the stored password hash
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Incorrect password." });
      }
    
      // Construct the saved data object
     
       
      
    
        // Include other properties you want to return...
     
  
      // Generate a JWT token with the user ID as the payload
      let token= Jwt.sign({ userId: user._id }, process.env.secret_key, { expiresIn: '1h' });
        // Save the token to the user's tokens array
        user.tokens.push({ token });
      
      // Save the updated user document
      await user.save();
      res.status(201).json(user)
      // res.status(201).json({user, token})
      console.log('1')
      // Return the token and saved data in the response
      //res.status(201).json({ success: true, token, data: savedData, message: "Logged in successfully." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred while logging in." });
    }
  };
  
  //login frontend
//   import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import axios from 'axios';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(false);

//   const history = useHistory();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('/api/login', {
//         email,
//         password,
//         rememberMe,
//       });

//       if (response.status === 201) {
//         const { token } = response.data;
//         // Save the token in localStorage or cookies for future requests
//         localStorage.setItem('token', token);
//         setSuccess(true);
//         setError('');

//         // Redirect to the "melkamu" component
//         history.push('/melkamu');
//       }
//     } catch (error) {
//       setSuccess(false);
//       if (error.response) {
//         setError(error.response.data.message);
//       } else {
//         setError('An error occurred while logging in.');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       {success && <p>Logged in successfully.</p>}
//       {error && <p>{error}</p>}

//       <label>
//         Email:
//         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       </label>

//       <label>
//         Password:
//         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       </label>

//       <label>
//         Remember me:
//         <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
//       </label>

//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default LoginForm;


  export const changePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
  
    // Validate the request parameters
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ success: false, message: "Please provide the old password, new password, and confirm new password." });
    }
  
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ success: false, message: "The new password and confirm new password do not match." });
    }
  
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({ success: false, message: "The new password should contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol. It should be at least 8 characters long." });
    }
  
    try {
      // Retrieve the user's data from the database
      const user = await usermodel.findById(req.user._id);
      if (!user) {
        return res.status(404).json({ success: false, message: `No user with id: ${req.user._id} found.` });
      }
  
      // Verify that the old password matches the password stored in the database
      const isMatch = await bcrypt.compare(oldPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ success: false, message: "The old password is incorrect." });
      }
  
      // Hash and update the user's password with the new password in the database
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ success: true, message: "Password successfully updated." });
    } catch (error) {
      // Handle any database or server errors
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred while changing the password." });
    }
  };
  
  export const updateUserRole = async (req, res) => {
    const { newRole } = req.body;
    const userId = req.user._id;
  
    // Validate the request parameters
    if (!newRole) {
      return res.status(400).json({ success: false, message: "Please provide the new role." });
    }
  
    try {
      // Retrieve the user's data from the database
      const user = await usermodel.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: `No user with id: ${userId} found.` });
      }
  
      // Update the user's role
      user.role = newRole;
      await user.save();
  
      res.status(200).json({ success: true, message: "User role successfully updated." });
    } catch (error) {
      // Handle any database or server errors
      console.error(error);
      res.status(500).json({ success: false, message: "An error occurred while updating the user role." });
    }
  };
  

// Logout route
 export const logout = async (req, res) => {
  try {
    // Remove the current token from the user's tokens array
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);

    // Save the updated user document
    await req.user.save();

    res.status(200).json({ success: true, message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
  //font end ode for logout
  //function Logout() {
  //   const handleLogout = async () => {
  //     try {
  //       // Send a request to the backend to logout
  //       const response = await fetch('/api/logout', {
  //         method: 'POST',
  //         credentials: 'include',
  //       });
  
  //       if (response.ok) {
           //remove token
  //         // Successful logout
  //         // Redirect the user to the login page or perform any other necessary actions
  //         window.location.href = '/login';
  //       } else {
  //         // Failed logout
  //         // Handle the error or display an error message
  //         console.error('Logout failed');
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };
  
  //   return (
  //     <button onClick={handleLogout}>
  //       Logout
  //     </button>
  //   );
  // }
  // export default Logout;}
 };



// password reset
// Endpoint to handle sending the reset email
//app.post('/api/send-reset-email',
// Assuming you have the necessary dependencies and configurations already set up

// Route for sending reset email
export const resetwithemail =  async (req, res) => {
  const { email } = req.body;
  console.log(email)
  try {
  const user = await usermodel.findOne({ email });
  if (!user) {
        return res.status(404).json({ message: 'User not found.' });
        console.log(email)
      }
  
    // Generate a reset token and expiration
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
    // Update the user with the reset token and expiration
    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();
  //    // Send an email to the user with a link to the reset password page
  // const requestLink = `http://localhost:3000/reset-password/${token}/${user._id}`;
    // Send the reset email

// send eamil with token
let subject = 'Password Reset Request';
 
let text = `Hello ${user.name},Click on the following link to reset your password: http://localhost:3000/ResetPasswordPage/${resetToken}`;
await sendEmail( email,subject , text);
res.status(200).json({ message: ' Password reset link sent Successfully to your email.               Visit your EMail' });

  

    }
    catch (error) {
        console.error('Error sending reset email:', error);
      //  return res.status(500).json({ message: 'Failed to send reset email.' });
        return res.status(404).json({ message: 'Failed to send reset email.' });
      }

 
  }


// app.post('/api/reset-password'

export const resetpassword =async (req, res) => {
  const {newPassword, confirmPassword} = req.body;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

console.log(newPassword)
  try {
      // Validate password format
    if (!passwordRegex.test(newPassword)) {
      return res.status(400).json({
        success: false,
        message:
          'Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one digit, and one special character',
      });
    }
    
    // Check if password and confirm password match
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }
    // Find the user by email and valid reset token
    const user = await usermodel.findOne({
      resetToken: req.body.resetToken,
      resetTokenExpiration: { $gt: Date.now() },// Check if the token has not expired
    });

    if (!user) {
      console.log("1")
      return res.status(404).json({ message: 'Invalid or expired  reset token.' });
    }
     // Hash the password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();
    console.log("2")
    return res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Failed to reset password.' });
  }
};


  

