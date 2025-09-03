import React, { useState } from "react";
import CreateJob from "./CreateJob.jsx";
import CreatedJobTable from "./CreatedJobTable.jsx";
import { GoPlus } from "react-icons/go";


const MidSection = () => {
  const [createJobModal, setcreateJobModal] = useState(false);


  
  return (
    <div>
      <div
        id="created-jobs"
        className="relative text-center bg-black text-[#E0C163] font-semibold text-2xl p-4 mt-8"
      >
        {" "}
        Create Jobs
      </div>
      <CreateJob />
    </div>
  );
};

export default MidSection;
