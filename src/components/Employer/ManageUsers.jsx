import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import axios from "axios";
import Loader from "../Reusable.jsx/Loader.jsx";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [allFetchedUsers, setAllFetchedUsers] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [editModel, setEditModel] = useState(false);

  const [editFormData, setEditFormData] = useState({
    _id: "",
    name: "",
    email: "",
    RegisterAs: "",
    phone: "",
  });

  // Fetch users
  const handleManageUsers = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        "https://hh-backend-deployment.onrender.com/user/admin/fetch/jobs",
        {
          withCredentials: true,
        }
      );
      setAllFetchedUsers(res.data.users || []);
      console.log(res.data.users, "fetched users");
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    } finally {
      setIsLoading(false);
    }
  };

  // Call on mount + refresh
  useEffect(() => {
    handleManageUsers();
  }, [refreshFlag]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filtered users
  const filteredUsers = allFetchedUsers.filter((user) => {
    const term = debouncedSearchTerm?.trim().toLowerCase();
    if (!term) return true;
    return (
      user?.name?.toLowerCase().includes(term) ||
      user?.email?.toLowerCase().includes(term) ||
      user?.RegisterAs?.toLowerCase().includes(term) ||
      user?.phone?.toString().includes(term)
    );
  });

  const handleDelete = async (userId) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(
        `https://hh-backend-deployment.onrender.com/user/admin/delete/jobs/${userId}`,
        { withCredentials: true }
      );
      console.log(res.data, "user deleted");
      toast.success("User deleted successfully");
      setRefreshFlag((p) => !p);
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    } finally {
      setIsLoading(false);
    }
  };

  // Open edit modal
  const handleEditUser = (user) => {
    setEditModel(true);
    setEditFormData({
      _id: user._id,
      name: user.name,
      email: user.email,
      RegisterAs: user.RegisterAs,
      phone: user.phone,
    });
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit edit
  const submitEditUser = async (e) => {
    e.preventDefault();
    const userID = editFormData._id;

    try {
      const res = await axios.patch(
        `// TODO: PATCH edit user endpoint/${userID}`,
        editFormData,
        { withCredentials: true }
      );
      toast.success("User updated successfully");
      setEditModel(false);
      setRefreshFlag((p) => !p);
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
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

        <h1 className="text-3xl font-semibold">Manage Users</h1>

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
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-[60%] text-center"
            type="text"
            placeholder="Search by Name, Email, Role, Phone..."
          />
          <button
            onClick={() => setDebouncedSearchTerm(searchTerm)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
          <button
            onClick={() => {
              setSearchTerm("");
              setDebouncedSearchTerm("");
            }}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Clear
          </button>
        </div>

        {/* table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="py-8">
              <Loader />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="text-center text-2xl mt-6">No users found</div>
          ) : (
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-2 border-b">Name</th>
                  <th className="py-2 px-2 border-b">Email</th>
                  <th className="py-2 px-2 border-b">Role</th>
                  <th className="py-2 px-2 border-b">Phone</th>
                  <th className="py-2 px-2 border-b">Actions</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {filteredUsers.map((user, idx) => (
                  <tr key={user._id ?? idx}>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.email}</td>
                    <td className="py-2 px-4 border-b">{user.RegisterAs}</td>
                    <td className="py-2 px-4 border-b">{user.phone}</td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-500 hover:underline mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
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

        {/* Edit Modal */}
        {editModel && (
          <form
            onSubmit={submitEditUser}
            className="absolute top-0 bg-white shadow-lg p-8 w-full m-auto"
          >
            <div className="flex items-center justify-between bg-black text-[#E0C163] p-2 shadow-lg w-full mb-6 rounded-lg">
              <button
                className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
                onClick={() => setEditModel(false)}
              >
                <MdArrowBack />
              </button>
              <h1 className="text-3xl font-semibold">Edit User</h1>
              <button
                onClick={() => setEditModel(false)}
                className="text-2xl hover:text-black hover:bg-[#E0C163] p-2 rounded-full transition"
              >
                <IoCloseOutline />
              </button>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block font-semibold mb-1">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={editFormData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-semibold mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={editFormData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="RegisterAs"
                  className="block font-semibold mb-1"
                >
                  Role
                </label>
                <select
                  id="RegisterAs"
                  name="RegisterAs"
                  value={editFormData.RegisterAs}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select</option>
                  <option value="jobseeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </select>
              </div>

              <div>
                <label htmlFor="phone" className="block font-semibold mb-1">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="number"
                  value={editFormData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-8 bg-black text-[#E0C163] font-semibold py-2 rounded hover:bg-[#333] transition duration-300"
            >
              Update User
            </button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ManageUsers;
