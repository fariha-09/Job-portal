import Users from "../model/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  try {
    const {
      role,
      email,
      password,
      firstName,
      lastName,
      fullName,
      confirmPassword,
      industry,
      jobTitle,
      location,
      keySkills,
      phoneNumber,
      currentJobTitle,
    } = req.body;

    if (!role || !email || !password || !confirmPassword || !phoneNumber) {
      return res.status(400).json({
        message: "Role, email, password, confirmPassword, and phoneNumber are required.",
      });
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists. Kindly try with another email.",
      });
    }

    if (password !== confirmPassword) {
      return res.status(409).json({
        message: "Password doesn't match confirm password.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (role === 'user') {
      if (!firstName || !lastName || !location || !keySkills || !currentJobTitle) {
        return res.status(400).json({
          message: "All user fields are required.",
        });
      }

      const newUser = new Users({
        role,
        location,
        keySkills,
        phoneNumber,
        currentJobTitle,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      return res.status(200).json({
        message: "User signed up successfully.",
      });
    } else if (role === 'company') {
      if (!fullName || !email || !industry || !jobTitle) {
        return res.status(400).json({
          message: "All company fields are required.",
        });
      }

      const newCompany = new Users({
        role,
        email,
        password: hashedPassword,
        fullName,
        industry,
        jobTitle,
        phoneNumber,
      });

      await newCompany.save();

      return res.status(200).json({
        message: "Company signed up successfully.",
      });
    } else {
      return res.status(400).json({
        message: "Invalid role provided.",
      });
    }

  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({
      message: "Error during signup",
      error: error.message,
    });
  }
};

export const logIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found with this email.",
      });
    }

    const isUser = await bcrypt.compare(password, existingUser.password);
    if (!isUser) {
      return res.status(401).json({
        message: "Invalid password. Enter correct password.",
      });
    }

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie("token", token, { httpOnly: true });

    return res.status(200).json({
      message:`${existingUser.role === 'company' ? 'Company' : 'User'} logged in successfully.`,
      token: token,
      role: existingUser.role,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export default { signUp, logIn };
