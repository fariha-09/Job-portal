import Users from "../model/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userSignUp = async (req, res) => {
  try {
    const { email, password, confirmPassword, firstName, lastName, location, keySkills, phoneNumber, currentJobTitle } = req.body;

    if (!email || !password || !confirmPassword || !firstName || !lastName || !location || !keySkills || !currentJobTitle || !phoneNumber) {
      return res.status(400).json({ message: "All user fields are required." });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(409).json({ message: "Password doesn't match confirm password." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      role: "user", 
      firstName,
      lastName,
      location,
      keySkills,
      phoneNumber,
      currentJobTitle,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({ message: "User signed up successfully." });

  } catch (error) {
    res.status(409).json({ message: "Error in user signup.", error });
  }
};


export const companySignUp = async (req, res) => {
  try {
    const { email, password, confirmPassword, fullName, industry, jobTitle, phoneNumber, location, keySkills } = req.body;


    if (!email || !password || !confirmPassword || !fullName || !industry || !jobTitle || !phoneNumber) {
      return res.status(400).json({ message: "All company fields are required." });
    }

    const existingCompany = await Users.findOne({ email });
    if (existingCompany) {
      return res.status(400).json({ message: "Company with this email already exists." });
    }

    if (password !== confirmPassword) {
      return res.status(409).json({ message: "Password doesn't match confirm password." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newCompany = new Users({
      role: "company", 
      fullName,
      industry,
      jobTitle,
      phoneNumber,
      email,
      password: hashedPassword,
      location,
      keySkills,
    });

    await newCompany.save();

    res.status(200).json({ message: "Company signed up successfully." });

  } catch (error) {
    res.status(409).json({ message: "Error in company signup.", error });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return res.status(500).json({ message: "User not found with this email." });
    }

    const isUser = await bcrypt.compare(password, existingUser.password);
    if (!isUser) {
      return res.status(209).json({ message: "Invalid password. Enter correct password." });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);

    res.cookie("token", token, { httpOnly: true });

    res.json({
      message: "User login successfully.",
      data: token,
      role: existingUser.role,
    });

  } catch (error) {
    res.status(409).json({ message: "Error in login.", error });
  }
};

export default { userSignUp, companySignUp, logIn };
