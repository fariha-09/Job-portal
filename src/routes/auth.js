import express from "express";
import {logIn, signUp} from "../controller/user.js";
import authentication from "../middlewares/authentication.js";

const authRouter=express.Router();
 
authRouter.post("/signup",signUp)
authRouter.post("/login",authentication,logIn)

export default authRouter;