  import React from "react";
  import JobCards from "./JobCards";

  const CardContainer = ({jobs}) => {
    return (
      <div className="p-6 bg-white">
        <h2
          className="text-center text-4xl text-[#c8ac5a] bg-black p-1 rounded-lg "
          id="featured-jobs"
        >
          {" "}
          FEATURED JOBS
        </h2>
        <div className="flex flex-wrap gap-6 mt-6 justify-evenly ">
          <JobCards jobs={jobs} />
        </div>
      </div>
    );
  };

  export default CardContainer;
