import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    maxSalary: {
      type: Number,
      required: true,
    },
    minSalary: {
      type: Number,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    keySkills: {
      type: [String],
      required: true,
    },
    responsibilities: {
      type: [String],
    },
    requirements: {
      type: [String],
      required: true,
    },
    benefits: {
      type: [String],
      required: true,
    },
    jobType: {
      type: String,
    },
    isHot: {
       type: Boolean, 
    },
    isFeatured: {
      type: Boolean, 
    },
    isSaved: {
      type: Boolean, 
    },
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Job", jobsSchema);
export default Jobs;
