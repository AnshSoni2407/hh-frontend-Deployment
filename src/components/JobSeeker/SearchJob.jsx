import React, { useState, useEffect } from 'react'
import { FaSearch } from "react-icons/fa"; // search icon


const SearchJob = ({ onSearch }) => {
  const [searchTerm, setsearchTerm] = useState("");

  useEffect(() => {
    onSearch(searchTerm);
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center justify-center p-4 mt-10 mb-9 bg-white">
      <div className=" text-4xl sm:text-6xl text-center">
        {" "}
        <p className="inline mb-5 text-gray-700 font-semibold ">
          Search, Apply & Get <br /> Your{" "}
          <span className="text-blue-500 hover:text-blue-700 transition-colors duration-200 ">
            Dream Jobs
          </span>
        </p>
      </div>

      <div className="w-[75%] flex items-center bg-white border-2 border-gray-600 rounded-lg overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-purple-500 m-auto mt-10">
        <input
          value={searchTerm}
          onChange={(e) => {
            setsearchTerm(e.target.value);
          }}
          type="text"
          placeholder="Find jobs here... (MERN Stack, Delhi etc.)"
          className="flex-grow px-4 py-2 text-gray-700 focus:outline-none"
        />
       
      </div>
    </div>
  );
};

export default SearchJob