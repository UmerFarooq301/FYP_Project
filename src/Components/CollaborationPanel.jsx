import React, { useState } from "react";
import { FaUsers, FaUserShield, FaRocket, FaSync } from "react-icons/fa";

const CollaborationPanel = () => {
  const [sessionActive, setSessionActive] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([
    { name: "Umer Farooq", role: "Editor", initial: "U" },
    { name: "Ahtisham", role: "Viewer", initial: "A" },
    { name: "Hussnain", role: "Editor", initial: "H" },
  ]);

  const handleStartSession = () => setSessionActive(true);
  const handleJoinSession = () => setSessionActive(true);

  return (
    <div className="w-screen h-screen bg-[#1E1E2F] text-white font-poppins p-6 overflow-y-auto">
      <div className="bg-[#2A2A40] p-10 rounded-3xl shadow-2xl border border-gray-700 max-w-6xl mx-auto w-full h-full flex flex-col gap-8">
        <header className="flex items-center gap-4 text-3xl font-bold text-white">
          <FaUsers className="text-green-400" />
          <span>Collaboration Session Manager</span>
        </header>

        <section className="flex flex-wrap gap-6">
          {!sessionActive ? (
            <>
              <button
                onClick={handleStartSession}
                className="flex items-center gap-2 px-8 py-3 bg-green-600 text-white rounded-full text-lg shadow-lg hover:bg-green-700 hover:scale-105 transition"
              >
                <FaRocket /> Start Session
              </button>
              <button
                onClick={handleJoinSession}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-full text-lg shadow-lg hover:bg-blue-700 hover:scale-105 transition"
              >
                <FaSync /> Join Existing Session
              </button>
            </>
          ) : (
            <div className="text-green-400 text-lg font-medium">Live collaboration session is active</div>
          )}
        </section>

        <section className="bg-[#1e1e2f] rounded-2xl p-6 border border-gray-600 shadow-inner">
          <h3 className="text-2xl font-semibold mb-6 border-b border-gray-600 pb-2">👥 Online Participants</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {onlineUsers.map((user, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 bg-[#2A2A40] p-4 rounded-xl border border-gray-600 hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {user.initial}
                </div>
                <div>
                  <div className="text-white font-semibold text-lg">{user.name}</div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <FaUserShield className={user.role === "Editor" ? "text-yellow-400" : "text-blue-400"} />
                    <span>{user.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="text-sm text-gray-400 leading-relaxed bg-[#1e1e2f] p-5 rounded-xl border border-gray-600 shadow-md">
          <p>No external links needed — participants are auto-joined via class/project sessions.</p>
          <p>Powered by WebSocket or CRDT-based sync engine for real-time code collaboration.</p>
          <p>Shared cursors and collaborative states are visible within the editor (feature simulated).</p>
        </footer>
      </div>
    </div>
  );
};

export default CollaborationPanel;
