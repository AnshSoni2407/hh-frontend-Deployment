import express from "express";
import {
  create,
  fetch,
  saveJob,
  fetchSaveJob,
  fetchCreatedJobs,
  removeSavedJob,
  deleteJob,
  updateJob,
} from "../Controller/JobController.js";
import { verifyToken } from "../Middlewares/Token.js";
const router = express.Router();

router.post("/create", verifyToken, create);

router.get("/fetch", fetch);

router.post("/savedJobs/:job/:userId", saveJob);

router.get("/fetch/savedJobs/:userId", fetchSaveJob);

router.get("/fetch/createdJobs/:userId", fetchCreatedJobs);

router.delete("/removeSavedJob/:jobId/:userId", removeSavedJob);

router.delete("/deleteJob/:jobId/:userId", deleteJob);

router.put("/update/:jobId", updateJob);
export default router;
