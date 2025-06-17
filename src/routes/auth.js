import express from "express";
import {logIn, userSignUp,companySignUp} from "../controller/user.js";
import authentication from "../middlewares/authentication.js";

const authRouter=express.Router();
 
authRouter.post("/user/signup",userSignUp)
authRouter.post("/company/signup",companySignUp)
authRouter.post("/login",authentication,logIn)

export default authRouter;