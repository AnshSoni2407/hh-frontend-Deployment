import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import Loader from "../Reusable.jsx/Loader.jsx";
import { toast } from "react-toastify";
import CreateJob from "./CreateJob";

const ManageJobs = () => {
  const [allFetchedJobs, setallFetchedJobs] = useState([]);
  const [refreshFlag, setrefreshFlag] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [debouncedSearchTerm, setdebouncedSearchTerm] = useState("");
  const [editModel, seteditModel] = useState(false);
  const [EditFormData, setEditFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    jobType: "",
    salary: "",
    experience: "",
    description: "",
    skills: "",
  });

  // Fetch jobs
  const handleManageJobs = async () => {
    try {
      setisLoading(true);
      const res = await axios.get(
        "https://hh-backend-deployment.onrender.com/job/fetch/all/jobs",
        { withCredentials: true }
      );
      setallFetchedJobs(res.data.jobs || []);
      console.log(res.data.jobs, "fetched jobs");
    } catch (error) {
      console.error("Error fetching manage jobs:", error);
      toast.error("Error fetching jobs");
    } finally {
      setisLoading(false);
    }
  };

  // call on mount and when refreshFlag toggles
  useEffect(() => {
    handleManageJobs();
  }, [refreshFlag]);

  // Debounce searchTerm -> debouncedSearchTerm (300ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setdebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filtered array based on debouncedSearchTerm (case-insensitive)
  const filteredJobs = allFetchedJobs.filter((job) => {
    const term = debouncedSearchTerm?.trim().toLowerCase();
    if (!term) return true; // no search -> show all
    return (
      job?.jobTitle?.toLowerCase().includes(term) ||
      job?.companyName?.toLowerCase().includes(term) ||
      job?.location?.toLowerCase().includes(term) ||
      job?.postedBy?.name?.toLowerCase().includes(term) ||
      job?.postedBy?.email?.toLowerCase().includes(term)
    );
  });

  const handleDelete = async (jobId) => {
    try {
      setisLoading(true);
      const res = await axios.delete(
        `https://hh-backend-deployment.onrender.com/job/delete/byAdmin/${jobId}`,
        { withCredentials: true }
      );
      console.log(res.data, "job deleted");
      toast.success("Job deleted successfully");
      setrefreshFlag((p) => !p);
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting job");
    } finally {
      setisLoading(false);
    }
  };

  const handleEditJob = (job) => {
    seteditModel(true);
    setEditFormData(job);
    setrefreshFlag((P) => !P);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitEditJob = async (e) => {
    e.preventDefault();
    console.log(EditFormData);

    const jobID = EditFormData._id;
    console.log(jobID);

    try {
      const res = await axios.patch(
        `https://hh-backend-deployment.onrender.com/job/admin/edit/job/${jobID}`,
        EditFormData,
        { withCredentials: true }
        
      );
      toast.success("Job updated successfully");
      seteditModel(false);
    } catch (error) {
      console.log(`error while editing job by Admin`, error);
      toast.error("Error while updating job");
      seteditModel(false);

    }
  };

  return (
    <div>
      {/* header */}
      <div className="flex items-center justify-between bg-black text-[#E0C163] p-2 shadow-lg w-full mb-6">
        <Link to="/adminDash">
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <MdArrowBack />
          </button>
        </Link>

        <h1 className="text-3xl font-semibold">Manage Jobs</h1>

        <Link to="/adminDash">
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <IoCloseOutline />
          </button>
        </Link>
      </div>

      {/* search */}
      <section>
        <div className="flex items-center justify-center mb-4 p-4 bg-white shadow-md rounded space-x-2">
          <input
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)} // fixed
            className="border border-gray-300 p-2 rounded w-[60%] text-center"
            type="text"
            placeholder="Search by Job Title, Company, Location, Recruiter email/name..."
          />
          {/* Optional: immediate search trigger (bypass debounce) */}
          <button
            onClick={() => setdebouncedSearchTerm(searchTerm)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={() => {
              setsearchTerm("");
              setdebouncedSearchTerm("");
            }}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Clear
          </button>
        </div>

        {/* table / results */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-8">
              <Loader />
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center text-2xl mt-6">No jobs found</div>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 w-1/6 px-2 border-b">Job Title</th>
                  <th className="py-2 w-1/6 px-2 border-b">Company</th>
                  <th className="py-2 w-1/6 px-2 border-b">Location</th>
                  <th className="py-2 w-1/6 px-2 border-b">Posted By</th>
                  <th className="py-2 w-1/6 px-2 border-b">Recruiter Email</th>
                  <th className="py-2 w-1/6 px-2 border-b">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredJobs.map((job, idx) => (
                  <tr key={job._id ?? idx}>
                    <td className="py-2 px-4 border-b truncate max-w-[200px]">
                      {job.jobTitle}
                    </td>
                    <td className="py-2 px-4 border-b truncate max-w-[150px]">
                      {job.companyName}
                    </td>
                    <td className="py-2 px-4 border-b truncate max-w-[150px]">
                      {job.location}
                    </td>
                    <td className="py-2 px-4 border-b truncate max-w-[150px]">
                      {job.postedBy?.name}
                    </td>
                    <td className="py-2 px-4 border-b truncate max-w-[180px]">
                      {job.postedBy?.email}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => {
                          handleEditJob(job);
                        }}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {editModel && (
          <form
            onSubmit={submitEditJob}
            className="absolute top-0 bg-white shadow-lg p-8 w-full  m-auto"
          >
            {/* header of form  */}
            <div className="flex items-center justify-between bg-black text-[#E0C163] p-2 shadow-lg w-full mb-6 rounded-lg">
              <button
                className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
                onClick={() => {
                  seteditModel(false);
                }}
              >
                <MdArrowBack />
              </button>

              <h1 className="text-3xl font-semibold">Edit Job</h1>

              <button
                onClick={() => {
                  seteditModel(false);
                }}
                className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
              >
                <IoCloseOutline />
              </button>
            </div>
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block font-semibold mb-1">
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={EditFormData.jobTitle}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Frontend Developer"
                  required
                />
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block font-semibold mb-1"
                >
                  Company Name
                </label>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  value={EditFormData.companyName}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="TechCorp Inc."
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block font-semibold mb-1">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={EditFormData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Dehradun"
                  required
                />
              </div>

              {/* Job Type */}
              <div>
                <label htmlFor="jobType" className="block font-semibold mb-1">
                  Job Type
                </label>
                <select
                  id="jobType"
                  name="jobType"
                  value={EditFormData.jobType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="Full-Time">Full-Time</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Internship">Internship</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>

              {/* Salary */}
              <div>
                <label htmlFor="salary" className="block font-semibold mb-1">
                  Salary in Lakh Per Annum (LPA)
                </label>
                <input
                  id="salary"
                  name="salary"
                  type="number"
                  maxLength={3}
                  value={EditFormData.salary}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="20, 40, 60 LPA "
                  required
                />
              </div>

              {/* Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="block font-semibold mb-1"
                >
                  Experience
                </label>
                <input
                  id="experience"
                  name="experience"
                  type="text"
                  value={EditFormData.experience}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="1-2 years"
                  required
                />
              </div>
            </div>

            {/* Skills */}
            <div className="mt-6">
              <label htmlFor="skills" className="block font-semibold mb-1">
                Skills Required
              </label>
              <textarea
                id="skills"
                name="skills"
                value={EditFormData.skills}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="React, Node.js, MongoDB, etc."
                rows={3}
                required
              ></textarea>
            </div>

            {/* Description */}
            <div className="mt-6">
              <label htmlFor="description" className="block font-semibold mb-1">
                Job Description
              </label>
              <textarea
                id="description"
                name="description"
                value={EditFormData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Write about responsibilities, requirements, perks, etc."
                rows={4}
                required
              ></textarea>
            </div>

            <button
              name="submit"
              onClick={() => {
                submitEditJob;
              }}
              type="submit"
              className="w-full mt-8 bg-black text-[#E0C163] font-semibold py-2 rounded hover:bg-[#333] transition duration-300"
            >
              Edit Job
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ManageJobs;
