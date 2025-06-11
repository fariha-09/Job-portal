import Users from "../model/usersModel.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const {role, email, password, firstName,lastName,fullName,confirmPassword,industry,jobTitle,location,keySkills,phoneNumber,currentJobTitle } = req.body;
     if ( !role ||  !email || !password || !confirmPassword || !phoneNumber ) { 
      return res.status(400).json({
        message: "role,email and password fields are required.",
      });
    }
    const existingUser = await Users.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message:"user with this email already exists.Kindly try with another email.",
        data: existingUser,
      });
      
    if (password !== confirmPassword)
      return (
        res.status(409).
        json({
          message: "password doesn't match confirm password",
        })
      );
      if(role=="user"){
        if(!firstName || !lastName || !location || !keySkills || !currentJobTitle){
 return res.status(400).json({
        message: "All user fields are required.",
      });
        }
       
      }else{
        if(!fullName || !email ||!industry ||!fullName ||!jobTitle ){
return res.status(400).json({
        message: "All company fields are required."
      });
        }
      }
      
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new Users({
      location,
      keySkills,
      phoneNumber,
      currentJobTitle,
      firstName,
      lastName,
      email,
      confirmPassword,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).json({
      message:` ${role}  signed up successfully.`,
    });
  } catch (error) {
    res.status(409).json({
      message: "Error found here",
      error: error,
    });
  }
};
export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser =await Users.findOne({ email });

    if (!existingUser)
      return res.status(500).json({
        message: "User not found with this email.",
      });
    const isUser = await bcrypt.compare(password, existingUser.password);
    if (!isUser)
      return res.status(209).json({
        message: "Invalid password.Enter correct password.",
      });
   
    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
     res.cookie("token", token, {
      httpOnly: true,
    });
    res.json({
      message: "User login successfully.",
      data: token,
       role: existingUser.role,
    });
    
  } catch (error) {
    res.status(409).json({
      message: "Error found here",
      error: error,
    });
  }
};

export default { signUp, logIn };