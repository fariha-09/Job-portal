import express from "express";
import { submitForm } from "../controller/form.js";


const formRouter=express.Router();

formRouter.post("/formsubmit",submitForm);

export default formRouter;