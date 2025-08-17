import React from "react";
import { FaDatabase, FaProjectDiagram, FaRobot } from "react-icons/fa";

const DataScientistDashboard = () => {
  return (
    <div className="w-screen min-h-screen bg-[#1E1E2F] text-white font-poppins p-10">
      <h1 className="text-3xl font-bold mb-4">Welcome Data Scientist </h1>
      <p className="text-gray-400 mb-8">Access datasets, train models, and collaborate on ML projects.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer">
          <FaDatabase size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Upload Dataset</h3>
          <p className="text-sm text-gray-400 mt-2">Manage and preprocess data for training</p>
        </div>

        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer">
          <FaRobot size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Train ML Model</h3>
          <p className="text-sm text-gray-400 mt-2">Write training code, evaluate performance</p>
        </div>

        <div className="bg-[#2A2A40] p-6 rounded-lg shadow hover:shadow-xl cursor-pointer">
          <FaProjectDiagram size={30} className="text-green mb-3" />
          <h3 className="text-xl font-semibold">Collaborate</h3>
          <p className="text-sm text-gray-400 mt-2">Join team sessions and share insights</p>
        </div>
        
      </div>
    </div>
  );
};

export default DataScientistDashboard;