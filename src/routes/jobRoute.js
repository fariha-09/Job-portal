import express from "express";
import { getJobs,addJob,updateJob,deleteJob, getJobById } from "../controller/Jobs.js";

const jobRouter=express.Router();

jobRouter.get("/",getJobs);
jobRouter.get("/:id", getJobById)
jobRouter.post("/",addJob);
jobRouter.put("/:id",updateJob);
jobRouter.delete("/:id",deleteJob);


export default jobRouter;