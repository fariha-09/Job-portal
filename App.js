import dotenv from 'dotenv';
dotenv.config();
import authRouter from './src/routes/auth.js';
import cors from "cors";
import authentication from './src/middlewares/authentication.js';

import express from 'express';
import mongoose from 'mongoose';
import jobRouter from './src/routes/jobRoute.js';
import formRouter from './src/routes/formRoute.js';

const app=express();

app.use(express.json());
app.use(cors({
  origin: "https://job-qbalnmxqx-farihas-projects-aaef69fe.vercel.app", // your React frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


const port=process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

app.use("/api",authRouter);
app.use("/jobs",jobRouter);
app.use("/form",formRouter);



app.get("/",(req,res)=>{
    res.send(`Users Id is:${req.userid}`);
})

app.listen(port,()=>{
    console.log(`Port is running on ${port}`)
})