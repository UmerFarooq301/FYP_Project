import React from "react";
import { FaUserCheck, FaClipboardList, FaChalkboardTeacher } from "react-icons/fa";

const InstructorDashboard = () => {
  return (
    <div className="w-screen min-h-screen bg-[#1E1E2F] text-white font-poppins p-10">
      <h1 className="text-3xl font-bold mb-4">Welcome Instructor</h1>
      <p className="text-gray-400 mb-8">Manage your classes, monitor student progress and assignments.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer">
          <FaClipboardList size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Create Assignments</h3>
          <p className="text-sm text-gray-400 mt-2">Design and assign coding tasks</p>
        </div>

        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer">
          <FaUserCheck size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Track Students</h3>
          <p className="text-sm text-gray-400 mt-2">Monitor student submissions and activity</p>
        </div>

        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer">
          <FaChalkboardTeacher size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Start Live Session</h3>
          <p className="text-sm text-gray-400 mt-2">Collaborate with your students in real time</p>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
