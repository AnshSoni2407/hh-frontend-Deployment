import React from 'react'
import { Link } from 'react-router-dom';
import { MdArrowBack } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";   

const ManageUsers = () => {
  return (
    <div>
      <div className="flex items-center justify-between bg-black text-[#E0C163] p-2 shadow-lg w-full mb-6">
        <Link to="/adminDash">
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <MdArrowBack />
          </button>
        </Link>

        <h1 className="text-3xl font-semibold">Manage Users</h1>

        <Link to="/adminDash">
          <button className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition">
            <IoCloseOutline />
          </button>
        </Link>
      </div>
    </div>
  );
}

export default ManageUsers