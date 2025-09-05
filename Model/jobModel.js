import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      min: 4,
      max: 6,
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    skills: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const jobModel = mongoose.model('Job', jobSchema);

export default jobModel;