import React from "react";
import { FaInfoCircle, FaUserPlus, FaEye } from "react-icons/fa";

const GuestDashboard = () => {
  return (
    <div className="w-screen min-h-screen bg-[#1E1E2F] text-white font-poppins p-10">
      <h1 className="text-3xl font-bold mb-4">Welcome Guest 👋</h1>
      <p className="text-gray-400 mb-8">You have limited access. Please register or log in with a role to explore more features.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer">
          <FaInfoCircle size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Preview Features</h3>
          <p className="text-sm text-gray-400 mt-2">See what's possible in the full version</p>
        </div>

        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer">
          <FaUserPlus size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Register Now</h3>
          <p className="text-sm text-gray-400 mt-2">Create your account to unlock full access</p>
        </div>

        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer">
          <FaEye size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Read Only Mode</h3>
          <p className="text-sm text-gray-400 mt-2">Explore limited editor features</p>
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
