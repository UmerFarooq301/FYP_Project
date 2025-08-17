import React from "react";
import { FaRedo, FaExclamationTriangle, FaSync, FaDownload, FaHeadset, FaCode } from "react-icons/fa";

const ErrorRecoveryScreen = ({ errorCode = "ERR_504", errorMessage = "Connection Timeout. Please try again." }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-[#1E1E2F] to-[#141421] text-white font-poppins p-6">
      <div className="bg-[#2A2A40] w-full max-w-2xl rounded-xl shadow-2xl p-8 border border-gray-700">
        <div className="text-center space-y-4">
          <FaExclamationTriangle size={48} className="text-yellow-400 mx-auto" />
          <h1 className="text-3xl font-bold">Oops! Something went wrong</h1>
          <p className="text-gray-400">An unexpected error has occurred in your code session.</p>

          <div className="bg-[#1E1E2F] p-4 rounded-md border border-gray-600 mt-4">
            <p className="text-sm text-gray-400 mb-2">Error Code:</p>
            <div className="text-lg font-semibold text-red-400">{errorCode}</div>
            <div className="text-sm text-gray-300 mt-1">{errorMessage}</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <button className="flex items-center gap-2 justify-center bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm">
              <FaSync /> Retry Session
            </button>
            <button className="flex items-center gap-2 justify-center bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md text-sm">
              <FaDownload /> Restore from Autosave
            </button>
            <button className="flex items-center gap-2 justify-center bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm">
              <FaCode /> Reload Editor
            </button>
            <button className="flex items-center gap-2 justify-center bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm">
              <FaHeadset /> Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorRecoveryScreen;
