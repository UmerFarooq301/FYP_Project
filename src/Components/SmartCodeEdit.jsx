<link rel="stylesheet" href="style.css" />
import React, { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import {
  FaPlay,
  FaRobot,
  FaSave,
  FaComments,
  FaPaperPlane,
  FaLightbulb,
  FaUsers,
} from "react-icons/fa";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");

const CodeEditor = () => {
  const [code, setCode] = useState("# Write your Python code here");
  const [output, setOutput] = useState("");
  const [isAIVisible, setIsAIVisible] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [chatMessages, setChatMessages] = useState([
    { name: "Umer Farooq", message: "Let's start the project!", initial: "U" },
    { name: "Hafiz Ahtisham", message: "Discuss on the project features first?", initial: "A" },
    { name: "Hussnain", message: "Okay!", initial: "H" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [sessionId, setSessionId] = useState("");

  const editorRef = useRef(null);
  useEffect(() => {
    socket.on("code-change", (newCode) => {
      if (newCode !== code) setCode(newCode);
    });
    socket.on("chat", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("code-change");
      socket.off("chat");
    };
  }, [code]);

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const model = editor.getModel();
    if (!model) return;

    const decorations = [];

    model.getLinesContent().forEach((lineText, index) => {
      const start = lineText.indexOf("print");
      if (start !== -1) {
        decorations.push({
          range: {
            startLineNumber: index + 1,
            startColumn: start + 1,
            endLineNumber: index + 1,
            endColumn: start + 6,
          },
          options: {
            inlineClassName: "ai-suggestion-underline",
            hoverMessage: {
              value: "**💡 AI Tip:** `print()` displays output on the console.\nUse it for debugging and messages.",
            },
          },
        });
      }
    });

    const ids = editor.deltaDecorations([], decorations);
    return () => editor.deltaDecorations(ids, []);
  }, [code]);

  const handleEditorChange = (value) => {
    setCode(value);
    setSaveStatus("Unsaved");
    socket.emit("code-change", value);
    setTimeout(() => setSaveStatus("Saved"), 1000);
  };

  const handleRun = () => {
    setOutput(">>> Output will appear here\n(Simulated for now)");
  };

  const toggleAI = () => setIsAIVisible(!isAIVisible);
  const toggleChat = () => setIsChatVisible(!isChatVisible);

  const handleFixBugs = () => setOutput("🛠 AI Suggestion: Check for syntax errors or logic bugs.");
  const handleExplainCode = () => setOutput("🔍 AI Explanation: This loop prints numbers from 1 to 10.");
  const handleGenerateComments = () =>
    setOutput("💬 AI Comments:\n# Initialize the list\n# Loop through each item\n# Print square");
  const handleAISuggestions = () =>
    setOutput("💡 Code Improvement: Consider using functions for repeated code.");

  const handleSendChat = () => {
    if (chatInput.trim()) {
      const message = { name: "You", message: chatInput, initial: "Y" };
      socket.emit("chat", message);
      setChatMessages((prev) => [...prev, message]);
      setChatInput("");
    }
  };

  const handleJoinCollab = () => {
    if (sessionId.trim()) {
      socket.emit("join-room", sessionId);
      alert(`✅ Joined collaboration session: ${sessionId}`);
      setShowCollabModal(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-[#1E1E2F] text-white font-poppins flex relative overflow-hidden">
      <aside className={`fixed top-0 right-0 h-full w-80 bg-[#2A2A40] shadow-lg border-l border-gray-700 transition-transform duration-300 z-20 ${isAIVisible ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-600 pb-2">🤖 AI Assistant</h2>
          <div className="space-y-4 text-sm">
            <button onClick={handleFixBugs} className="w-full text-left bg-[#3b3b50] px-4 py-3 rounded-md border border-gray-600 hover:bg-green-800 transition">🛠 Fix Bug Suggestions</button>
            <button onClick={handleExplainCode} className="w-full text-left bg-[#3b3b50] px-4 py-3 rounded-md border border-gray-600 hover:bg-blue-800 transition">🔍 Explain Code</button>
            <button onClick={handleGenerateComments} className="w-full text-left bg-[#3b3b50] px-4 py-3 rounded-md border border-gray-600 hover:bg-purple-800 transition">💬 Generate Comments</button>
            <button onClick={handleAISuggestions} className="w-full text-left bg-[#3b3b50] px-4 py-3 rounded-md border border-gray-600 hover:bg-yellow-700 transition"><FaLightbulb className="inline mr-2" /> Code Improvement</button>
          </div>
        </div>
      </aside>
      <aside className={`fixed top-0 left-0 h-full w-80 bg-[#2A2A40] border-r border-gray-700 p-4 z-20 transition-transform duration-300 ${isChatVisible ? "translate-x-0" : "-translate-x-full"}`}>
        <h2 className="text-xl font-bold mb-4">💬 Chat</h2>
        <div className="h-[calc(100%-100px)] overflow-y-auto text-sm bg-[#1e1e2f] p-2 rounded mb-3 space-y-4">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center font-bold">{msg.initial}</div>
              <div>
                <div className="font-semibold">{msg.name}</div>
                <div className="text-gray-300">{msg.message}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input className="flex-1 p-2 rounded bg-[#3b3b50] text-white" placeholder="Type a message..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSendChat()} />
          <button onClick={handleSendChat} className="p-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition"><FaPaperPlane /></button>
        </div>
      </aside>
      <div className={`flex-1 flex flex-col px-6 py-4 space-y-4 ${isChatVisible ? "ml-80" : "ml-0"}`}>
        <div className="flex justify-between items-center bg-[#2A2A40]/80 p-4 rounded-xl shadow-xl border border-gray-700">
          <div className="flex gap-4 flex-wrap">
            <button onClick={handleRun} className="flex items-center gap-2 px-5 py-2 bg-green-500 rounded-full shadow hover:scale-105"><FaPlay /> Run</button>
            <button onClick={toggleAI} className="flex items-center gap-2 px-5 py-2 bg-blue-600 rounded-full shadow hover:scale-105"><FaRobot /> {isAIVisible ? "Hide AI" : "Show AI"}</button>
            <button onClick={toggleChat} className="flex items-center gap-2 px-5 py-2 bg-purple-600 rounded-full shadow hover:scale-105"><FaComments /> {isChatVisible ? "Hide Chat" : "Show Chat"}</button>
            <button onClick={() => setShowCollabModal(true)} className="flex items-center gap-2 px-5 py-2 bg-teal-600 rounded-full shadow hover:scale-105"><FaUsers /> Join Collaboration</button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FaSave className="text-green-400" />
            <span className={saveStatus === "Saved" ? "text-green-400" : "text-red-400"}>{saveStatus}</span>
          </div>
        </div>

        <div className="flex-1 rounded-xl overflow-hidden border border-gray-700 shadow-inner">
          <Editor
            height="100%"
            defaultLanguage="python"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            onMount={(editor) => (editorRef.current = editor)}
            options={{
              fontSize: 15,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              wordWrap: "on",
              fontFamily: "Fira Code, monospace",
              fontLigatures: true,
            }}
          />
        </div>

        <div className="bg-[#2A2A40] p-5 h-44 rounded-xl border border-gray-700 shadow-inner text-sm text-gray-300">
          <h3 className="text-white font-bold mb-2">🖥 Console Output:</h3>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
      {showCollabModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-30">
          <div className="bg-[#2A2A40] border border-gray-700 p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-white text-center">🔗 Join Collaboration Session</h2>
            <input type="text" placeholder="Enter Session ID" className="w-full mb-4 px-4 py-2 rounded bg-[#1e1e2f] border border-gray-600 text-white" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
            <div className="flex justify-end gap-3">
              <button onClick={() => setShowCollabModal(false)} className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded">Cancel</button>
              <button onClick={handleJoinCollab} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded">Join</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
