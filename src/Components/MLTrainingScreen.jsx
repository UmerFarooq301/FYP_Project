import React, { useState } from "react";
import { FaPlay, FaStop, FaUpload, FaSave, FaFolderOpen } from "react-icons/fa";
import Editor from "@monaco-editor/react";

const MLTrainingScreen = () => {
  const [code, setCode] = useState(
    "# Example: Train your model\nimport pandas as pd\nimport sklearn\nprint('Training started...')"
  );
  const [datasetName, setDatasetName] = useState("No dataset uploaded");
  const [training, setTraining] = useState(false);
  const [output, setOutput] = useState(" Logs will appear here...");
  const [progress, setProgress] = useState(0);

  const handleRunTraining = () => {
    setTraining(true);
    setOutput("🚀 Training started...\n📊 Loading dataset...\n🔧 Training in progress...");
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setOutput((prev) => prev + "\n✅ Training completed successfully!");
        setTraining(false);
      }
    }, 300);
  };

  const handleStopTraining = () => {
    setTraining(false);
    setProgress(0);
    setOutput("⛔ Training was stopped manually.");
  };

  const handleDatasetUpload = (e) => {
    const file = e.target.files[0];
    if (file) setDatasetName(file.name);
  };

  return (
    <div className="w-screen h-screen bg-[#1E1E2F] text-white font-poppins flex flex-col p-6 space-y-6">
      <header className="flex justify-between items-center mb-4 border-b border-gray-700 pb-3">
        <h1 className="text-2xl font-extrabold tracking-wide">Machine Learning Training Lab</h1>
        <label className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 text-sm shadow-lg transition-all">
          <FaUpload /> Upload Dataset
          <input type="file" accept=".csv,.xlsx" onChange={handleDatasetUpload} className="hidden" />
        </label>
      </header>

      <div className="bg-[#2A2A40] px-4 py-2 rounded-md text-sm text-green-400 w-max shadow-md border border-green-400">
        📂 Dataset: <span className="font-semibold ml-1">{datasetName}</span>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-[#2A2A40] border border-gray-700 rounded-xl overflow-hidden shadow-2xl">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              fontSize: 15,
              fontFamily: "Fira Code",
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              fontLigatures: true,
            }}
          />
        </div>

        <div className="flex flex-col space-y-6">
          <div className="bg-[#2A2A40] p-5 rounded-xl shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold"> Training Controls</h2>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleRunTraining}
                  disabled={training}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 shadow-md"
                >
                  <FaPlay /> Train
                </button>
                <button
                  onClick={handleStopTraining}
                  disabled={!training}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 shadow-md"
                >
                  <FaStop /> Stop
                </button>
                <button className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 shadow-md">
                  <FaSave /> Save Model
                </button>
                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 shadow-md">
                  <FaFolderOpen /> Load Model
                </button>
              </div>
            </div>

            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden mb-4 border border-gray-600">
              <div
                className="bg-green-500 h-4 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <div className="bg-black/60 rounded-md p-4 h-48 overflow-y-auto text-sm text-gray-200 border border-gray-700 shadow-inner">
              <pre className="whitespace-pre-wrap leading-relaxed">{output}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MLTrainingScreen;
