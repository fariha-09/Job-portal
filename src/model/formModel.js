import mongoose, { Schema } from "mongoose";

const formsSchema=new mongoose.Schema({
    fullName:{
         type: String,
      required: true,
    },
     email:{
         type: String,
      required: true,
    },
     phoneNumber:{
         type: String,
      required: true,
    }, 
    applyJobById:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Jobs",
    }
},
 { timestamps: true }
);

const Forms = mongoose.model("Form", formsSchema);
export default Forms;