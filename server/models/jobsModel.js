import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    jobrole: {
      type: String,
      required: [true, "JobRole is required"],
    },
    requiredSkills: {
      type: String,
      required: [true, "Skills are required"],
      maxlength: 100,
    },
    salary: {
      type: String,
      required: [true, "Salary is required"],
      maxlength: 100,
    },
    jobDescription: {
      type: String,
      default: "We are hiring",
      minlength: 100,
      maxlength: 1200,
      
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "internship", "contract"],
      default: "full-time",
    },
    workLocation: {
      type: String,
      required: [true, "Work location is required"],
    },
    Yourweb: {
      type: String,
      required: [true, "Website Link is required"],
    },
    eligibility: {
      type: String, // Array of strings to store the eligibility criteria
      required: [true, "Eligibility criteria are required"],
    },
    workDays: {
      type: String,
      required: [true, "Working days are required"],
    },
    deadline: {
      type: String,
      required: [true, "Deadline details are required"],
    },
    applications:{
      type:[String]
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required:[true]
    },
  },
  { timestamps: true }
);

// Pre-save hook to convert eligibility from a comma-separated string to an array


export default mongoose.model("Job", jobSchema);
