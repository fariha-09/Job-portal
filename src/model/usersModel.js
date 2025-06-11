import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
  {
     role: {
      type: String,
      enum: ["user", "company"],
    required: true,
    },
    firstName: {
      type: String,
    },

    lastName: {
      type: String,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
     currentJobTitle:{
      type: String,
      
    },
      location:{
      type: String,
      
    },
    keySkills:{
      type: String,
     
    },
     industry:{
      type: String,
    },
    jobTitle:{
      type: String,
    },
  },
  { timestamps: true }
);

const Users = mongoose.model("User", usersSchema);
export default Users;
