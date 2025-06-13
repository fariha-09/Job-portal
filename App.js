import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRouter from './src/routes/auth.js';
import jobRouter from './src/routes/jobRoute.js';
import formRouter from './src/routes/formRoute.js';

import authentication from './src/middlewares/authentication.js';

const app = express();

app.use(express.json());

// ✅ Recommended Dynamic CORS Setup
const allowedOrigins = [
  "https://job-3jx4vl18j-farihas-projects-aaef69fe.vercel.app", // your correct production URL
  "https://job-app-git-main-farihas-projects-aaef69fe.vercel.app", // your previous/preview URL
  "http://localhost:3000" // for local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

const port = process.env.PORT || 3001;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use("/api", authRouter);
app.use("/jobs", jobRouter);
app.use("/form", formRouter);

app.get("/", (req, res) => {
  res.send(`Users Id is: ${req.userid}`);
});

app.listen(port, () => {
  console.log(`Port is running on ${port}`);
});
