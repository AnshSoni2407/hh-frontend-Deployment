import express, { Router } from 'express'
import {
  applyJob,
  fetchAppliedJobs,
  fetchApplicants,
  updateApplicationStatus,
} from "../Controller/Application.controller.js";
import upload from '../Middlewares/Multer.js';

const router = express.Router();

router.post("/apply/:jobId/:userId", upload.single("resume"), applyJob);

router.get("/fetch/:userId", fetchAppliedJobs);

router.get('/fetch/applicants/:userId', fetchApplicants)

router.patch("/update/:applicationId", updateApplicationStatus);



export default router
