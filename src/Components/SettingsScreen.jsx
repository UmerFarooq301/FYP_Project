import React, { useState } from "react";
import {
  FaMoon,
  FaSun,
  FaFont,
  FaRobot,
  FaSave,
  FaKey,
  FaUserShield,
  FaKeyboard,
  FaImage,
  FaUser,
  FaClock,
  FaHistory,
  FaFlask,
  FaLaptopCode,
  FaCodeBranch,
  FaTrashAlt,
  FaBell,
  FaCogs
} from "react-icons/fa";

const SettingsScreen = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [fontSize, setFontSize] = useState(14);
  const [aiBehavior, setAiBehavior] = useState("trigger");
  const [codeExplanationLevel, setCodeExplanationLevel] = useState("Beginner");
  const [runtimeEnv, setRuntimeEnv] = useState("Python 3.10");
  const [memoryLimit, setMemoryLimit] = useState("512MB");
  const [usedStorage, setUsedStorage] = useState(1.2);
  const [storageLimit] = useState(5);
  const [practiceMode, setPracticeMode] = useState(false);
  const [autoLogout, setAutoLogout] = useState("15min");
  const [editorLayout, setEditorLayout] = useState("Vertical");
  const [lineNumbersVisible, setLineNumbersVisible] = useState(true);
  const [aiPanelDefaultOpen, setAiPanelDefaultOpen] = useState(true);
  const [devices, setDevices] = useState(["Chrome - Windows", "Safari - iPhone"]);
  const [notifications, setNotifications] = useState({ feedback: true, assignment: true, results: false });
  const [betaFeatures, setBetaFeatures] = useState({ testLab: true, autoTheme: false });

  return (
    <div className="w-screen min-h-screen bg-[#1E1E2F] text-white p-6 font-poppins overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">⚙️ Editor Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <SettingCard title="Theme" icon={darkMode ? <FaMoon /> : <FaSun />}>          
          <button onClick={() => setDarkMode(!darkMode)} className="px-4 py-2 bg-blue-600 rounded">Toggle {darkMode ? "Light" : "Dark"}</button>
        </SettingCard>

        <SettingCard title="Font Size" icon={<FaFont />}>
          <input type="range" min={12} max={24} value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
          <p className="text-sm mt-2">Font size: {fontSize}px</p>
        </SettingCard>

        <SettingCard title="AI Assistance" icon={<FaRobot />}>
          <select value={aiBehavior} onChange={(e) => setAiBehavior(e.target.value)} className="w-full p-2 bg-[#1e1e2f] border border-gray-600 rounded">
            <option value="auto">Auto Suggestions</option>
            <option value="trigger">Only on Request</option>
            <option value="bugs">Fix Bugs</option>
            <option value="explain">Explain Code</option>
            <option value="comments">Auto Comments</option>
            <option value="improvements">Code Improvements</option>
            <option value="tests">Generate Tests</option>
          </select>
          <p className="mt-2 text-sm">Code Explanation Level:</p>
          <select value={codeExplanationLevel} onChange={(e) => setCodeExplanationLevel(e.target.value)} className="w-full p-2 bg-[#1e1e2f] border border-gray-600 rounded">
            <option>Student</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>
        </SettingCard>

        <SettingCard title="Runtime Settings" icon={<FaLaptopCode />}>
          <select value={runtimeEnv} onChange={(e) => setRuntimeEnv(e.target.value)} className="w-full p-2 mb-2 bg-[#1e1e2f] border border-gray-600 rounded">
            <option>Python 3.8</option>
            <option>Python 3.10</option>
            <option>Node.js 16</option>
          </select>
          <p className="text-sm">Memory Limit:</p>
          <select value={memoryLimit} onChange={(e) => setMemoryLimit(e.target.value)} className="w-full p-2 bg-[#1e1e2f] border border-gray-600 rounded">
            <option>256MB</option>
            <option>512MB</option>
            <option>1GB</option>
          </select>
        </SettingCard>

        <SettingCard title="Storage Usage" icon={<FaSave />}>
          <p className="text-sm mb-2">{usedStorage}GB / {storageLimit}GB used</p>
          <button className="bg-red-600 px-4 py-2 rounded text-sm" onClick={() => setUsedStorage(0)}>Clear Cache</button>
        </SettingCard>

        <SettingCard title="Practice Mode" icon={<FaFlask />}>
          <button onClick={() => setPracticeMode(!practiceMode)} className="px-4 py-2 bg-purple-600 rounded text-sm">
            {practiceMode ? "Disable" : "Enable"} Practice Mode
          </button>
        </SettingCard>

        <SettingCard title="Session Timeout" icon={<FaClock />}>
          <select value={autoLogout} onChange={(e) => setAutoLogout(e.target.value)} className="w-full p-2 bg-[#1e1e2f] border border-gray-600 rounded">
            <option>5min</option>
            <option>15min</option>
            <option>30min</option>
            <option>Never</option>
          </select>
        </SettingCard>

        <SettingCard title="Editor Layout" icon={<FaCodeBranch />}>
          <select value={editorLayout} onChange={(e) => setEditorLayout(e.target.value)} className="w-full p-2 bg-[#1e1e2f] border border-gray-600 rounded mb-2">
            <option>Vertical</option>
            <option>Horizontal</option>
          </select>
          <div className="flex items-center gap-2 text-sm">
            <label><input type="checkbox" checked={lineNumbersVisible} onChange={() => setLineNumbersVisible(!lineNumbersVisible)} /> Show Line Numbers</label>
            <label><input type="checkbox" checked={aiPanelDefaultOpen} onChange={() => setAiPanelDefaultOpen(!aiPanelDefaultOpen)} /> AI Panel Default</label>
          </div>
        </SettingCard>

        <SettingCard title="Device Login History" icon={<FaUserShield />}>
          <ul className="text-sm space-y-1">
            {devices.map((d, idx) => <li key={idx}>✅ {d}</li>)}
          </ul>
          <button onClick={() => setDevices([])} className="mt-2 text-xs text-red-400 underline">Clear All Devices</button>
        </SettingCard>

        <SettingCard title="Notification Preferences" icon={<FaBell />}>
          {Object.keys(notifications).map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={notifications[key]}
                onChange={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
              /> Enable {key.charAt(0).toUpperCase() + key.slice(1)} Alerts
            </label>
          ))}
        </SettingCard>

        <SettingCard title="Experimental Features" icon={<FaCogs />}>
          {Object.keys(betaFeatures).map((key) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={betaFeatures[key]}
                onChange={() => setBetaFeatures({ ...betaFeatures, [key]: !betaFeatures[key] })}
              /> {key.replace(/([A-Z])/g, ' $1').trim()}
            </label>
          ))}
        </SettingCard>

      </div>
    </div>
  );
};

const SettingCard = ({ title, icon, children }) => (
  <div className="bg-[#2A2A40] p-5 rounded-xl border border-gray-700 shadow-md">
    <h2 className="text-lg font-semibold flex items-center gap-2 mb-3">{icon} {title}</h2>
    {children}
  </div>
);

export default SettingsScreen;
