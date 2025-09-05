import ApplicationModel from "../Model/Applications.model.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId, userId } = req.params;

    const application = new ApplicationModel({
      jobId,
      jobSeekerId: userId,
      resumeUrl: req.file.path,
    });

    await application.save();
    res.status(201).json({
      success: true,
      message: "Job applied successfully",
    });
  } catch (error) {
    console.error("Apply Job Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to apply job",
    });
  }
};

// to fetch the applied jobs
export const fetchAppliedJobs = async (req, res) => {
  const { userId } = req.params;

  try {
    const appliedJobs = await ApplicationModel.find({
      jobSeekerId: userId,
    }).populate({
      path: "jobId",
      populate: {
        path: "postedBy",
        model: "User",
        select: "phone",
      },
    });

    res.status(200).json({
      message: "Fetched applied jobs successfully",
      success: true,
      jobs: appliedJobs,
    });
  } catch (error) {
    console.error("Fetch Applied Jobs Error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch applied jobs" });
  }
};

export const fetchApplicants = async (req, res) => {
  const { userId } = req.params;

  try {
    const applicants = await ApplicationModel.find()
      .populate({
        path: "jobId",
        match: { postedBy: userId },
        populate: {
          path: "postedBy",
          model: "User",
          select: "phone email",
        },
      })
      .populate("jobSeekerId", "name email phone");

    // filter out null jobs (dusre employers ki)
    const filtered = applicants.filter((app) => app.jobId !== null);

    res.status(200).json({ success: true, applicants: filtered });
  } catch (error) {
    console.error("Fetch Applicants Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  const { applicationId } = req.params;
  const status = req.body.status;

  try {
    console.log(applicationId, status);
    const updatedApplication = await ApplicationModel.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );
    console.log(updatedApplication);
    res
      .status(200)
      .json({
        success: true,
        message: "Status updated successfully",
        updatedApplication,
      });
  } catch (error) {
    console.error("Update Application Status Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
