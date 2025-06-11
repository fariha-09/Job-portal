import Forms from "../model/formModel.js";

export const submitForm=async(req,res)=>{
    try {
        const {fullName,email,phoneNumber}=req.body;
         if (!fullName || !email || !phoneNumber) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newForm=new Forms({
        fullName,
        email,
        phoneNumber
    })

    await newForm.save();
    res.status(201).json({
        message:"form submitted successfully"
    })
    } catch (error) {
         res.status(500).json({
      message: "Error fetching form data",
      error: error,
    });
    }
}