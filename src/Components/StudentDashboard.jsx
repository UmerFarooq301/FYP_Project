import React, { useEffect, useState } from "react";
import {
  FaCode,
  FaTasks,
  FaUsers,
  FaRocket,
  FaPuzzlePiece,
} from "react-icons/fa";

const StudentDashboard = () => {
  const [role, setRole] = useState("Beginner");

  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setRole(savedRole);
  }, []);

  const isIntermediate = role === "Intermediate";

  return (
    <div className="w-screen min-h-screen bg-[#1E1E2F] text-white font-poppins p-10">
      <h1 className="text-3xl font-bold mb-4">
        Welcome Student {role === "Intermediate" ? "" : ""}
      </h1>
      <p className="text-gray-400 mb-8">
        {role === "Beginner"
          ? "Start your learning path with basic coding lessons and assignments."
          : "Explore real-world coding tasks, peer sessions, and debugging labs."}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer transition">
          <FaCode size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Learn Python Basics</h3>
          <p className="text-sm text-gray-400 mt-2">
            Interactive lessons and hands-on examples to build fundamentals.
          </p>
        </div>

        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer transition">
          <FaTasks size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Assignments</h3>
          <p className="text-sm text-gray-400 mt-2">
            Practice problems and exercises to test your skills.
          </p>
        </div>

        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer transition">
          <FaUsers size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Join Collaboration</h3>
          <p className="text-sm text-gray-400 mt-2">
            Team up with peers in live coding or review sessions.
          </p>
        </div>

        {isIntermediate && (
          <>
            <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer transition">
              <FaRocket size={30} className="text-green mb-3" />
              <h3 className="text-xl font-semibold">Advanced Projects</h3>
              <p className="text-sm text-gray-400 mt-2">
                Build real-world applications with ML, APIs, and more.
              </p>
            </div>

            <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer transition">
              <FaPuzzlePiece size={30} className="text-green mb-3" />
              <h3 className="text-xl font-semibold">Debugging Labs</h3>
              <p className="text-sm text-gray-400 mt-2">
                Practice debugging real code issues and logical errors.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
