import express from "express";
import Jobs from "../model/jobModel.js";

export const getJobs = async (req, res) => {
  try {
    const getAllJobs = await Jobs.find();
    res.send(getAllJobs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error,
    });
  }
};

export const getJobById = async (req, res) => {
try {
  const {id} = req.params

  const job = await Jobs.findById(id);
if (!job) return res.status(400).json({
  message:"please enter correct id.job with this id is not found."
})

console.log("Job: ", job );

  res.status(200).send(job)

} catch (error) {
   res.status(500).json({
      message: "error getting job by id.",
      error: error,
    });
}
}

export const addJob = async (req, res) => {
  try {
    const {
      jobTitle,
      jobDescription,
      company,
      minSalary,
      maxSalary,
      keySkills,
      responsibilities,
      requirements,
      benefits,
      jobType,
      location,
    } = req.body;
    const newJob = new Jobs({
      jobTitle,
      jobDescription,
      company,
      minSalary,
      maxSalary,
      keySkills,
      responsibilities,
      requirements,
      benefits,
      jobType,
      location,
    });
    await newJob.save();
    res.status(201).json({
      message: "Job added successfully.",
      data: newJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add job.",
      error: error,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Jobs.findByIdAndDelete(id);
    res.status(200).json({
      message: "job deleted successfully.",
      data: deleteJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting job",
      error: error,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      jobTitle,
      jobDescription,
      company,
      minSalary,
      maxSalary,
      keySkills,
      responsibilities,
      requirements,
      benefits,
      jobType,
      location,
    } = req.body;

    const isJob = await Jobs.findById(id);
    if (!isJob)
      return res.status(400).json({
        message: "Job not found.kindly give correct id.",
      });

    isJob.jobTitle = jobTitle;
    isJob.jobDescription = jobDescription;
    isJob.company = company;
    isJob.minSalary = minSalary;
    isJob.maxSalary = maxSalary;
    isJob.keySkills = keySkills;
    isJob.location= location;
    isJob.responsibilities = responsibilities;
    isJob.requirements = requirements;
    isJob.benefits = benefits;
    isJob.jobType = jobType;

    const updatedJob = await isJob.save();
    res.status(200).json({
      message: "Job updated successfully.",
      data: updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching data",
      error: error,
    });
  }
};
