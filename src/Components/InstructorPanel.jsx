import React, { useState } from "react";
import {
  FaUserGraduate,
  FaBookOpen,
  FaPlus,
  FaTrash,
  FaEdit,
  FaPaperPlane,
  FaSave,
} from "react-icons/fa";
import Editor from "@monaco-editor/react";

const InstructorPanel = () => {
  const [selectedTab, setSelectedTab] = useState("students");

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Umer Farooq",
      status: "Active",
      progress: 80,
      submission: "for i in range(5):\n    print(i*i)",
      feedback: "Well done!",
    },
    {
      id: 2,
      name: "Ahtisham",
      status: "Idle",
      progress: 55,
      submission: "for i in range(3):\n    print(i+1)",
      feedback: "",
    },
    {
      id: 3,
      name: "Hasnain",
      status: "Offline",
      progress: 20,
      submission: "print('Hello from Hasnain')",
      feedback: "",
    },
    {
      id: 4,
      name: "Subhan",
      status: "Active",
      progress: 90,
      submission: "for x in range(5): print(x)",
      feedback: "",
    },
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: 101,
      title: "Loops & Conditions",
      difficulty: "Easy",
      starterCode: "for i in range(5):\n    print(i)",
      expectedOutput: "0\n1\n2\n3\n4",
    },
  ]);

  const handleFeedbackChange = (id, value) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, feedback: value } : s
      )
    );
  };

  const handleSendFeedback = (id) => {
    const student = students.find((s) => s.id === id);
    alert(`📩 Feedback sent to ${student.name}:\n"${student.feedback}"`);
  };

  const handleDeleteSubmission = (id) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, submission: "" } : s
      )
    );
  };

  const handleEditAssignment = (id, key, value) => {
    setAssignments((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, [key]: value } : a
      )
    );
  };

  const handleDeleteAssignment = (id) => {
    setAssignments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleAddAssignment = () => {
    const newId = Date.now();
    setAssignments((prev) => [
      ...prev,
      {
        id: newId,
        title: "New Assignment",
        difficulty: "Medium",
        starterCode: "# write your code here",
        expectedOutput: "",
      },
    ]);
  };

  return (
    <div className="w-screen min-h-screen bg-[#1E1E2F] text-white p-6 font-poppins">
      <h1 className="text-3xl font-bold mb-6">Instructor Panel</h1>

      <div className="flex gap-6 text-sm mb-6 border-b border-gray-700 pb-2">
        <button onClick={() => setSelectedTab("students")}>👨‍🎓 Students</button>
        <button onClick={() => setSelectedTab("assignments")}>📘 Assignments</button>
        <button onClick={() => setSelectedTab("feedback")}>📬 Feedback Sent</button>
      </div>

      {selectedTab === "students" && (
        <div className="space-y-6">
          {students.map((s) => (
            <div
              key={s.id}
              className="bg-[#2A2A40] p-6 rounded-xl border border-gray-700"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <FaUserGraduate /> {s.name}
                  </h3>
                  <p className="text-sm text-gray-400">Status: {s.status}</p>
                </div>
                <div className="text-center">
                  <div className="w-14 h-14 rounded-full border-4 border-green-500 flex items-center justify-center text-lg font-bold">
                    {s.progress}%
                  </div>
                  <p className="text-xs text-gray-300 mt-1">Progress</p>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-1">📝 Submission:</h4>
                <Editor
                  height="150px"
                  defaultLanguage="python"
                  value={s.submission}
                  onChange={(value) => {
                    setStudents((prev) =>
                      prev.map((stu) =>
                        stu.id === s.id ? { ...stu, submission: value } : stu
                      )
                    );
                  }}
                  options={{ fontSize: 13, minimap: { enabled: false } }}
                  theme="vs-dark"
                />
                <div className="mt-3 flex gap-3">
                  <button
                    onClick={() => handleDeleteSubmission(s.id)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-1">💬 Feedback:</h4>
                <textarea
                  value={s.feedback}
                  onChange={(e) => handleFeedbackChange(s.id, e.target.value)}
                  placeholder="Write your feedback..."
                  className="w-full h-24 p-3 text-sm bg-[#1E1E2F] border border-gray-600 rounded text-white"
                />
                <button
                  onClick={() => handleSendFeedback(s.id)}
                  className="mt-2 bg-blue-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 text-sm"
                >
                  <FaPaperPlane /> Send Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === "assignments" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Manage Assignments</h2>
            <button
              onClick={handleAddAssignment}
              className="bg-green-600 px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700 text-sm"
            >
              <FaPlus /> Create New
            </button>
          </div>

          {assignments.map((a) => (
            <div
              key={a.id}
              className="bg-[#2A2A40] p-5 rounded border border-gray-700"
            >
              <div className="flex justify-between items-center mb-3">
                <input
                  type="text"
                  className="text-lg font-bold bg-transparent border-b border-gray-600 outline-none"
                  value={a.title}
                  onChange={(e) => handleEditAssignment(a.id, "title", e.target.value)}
                />
                <select
                  value={a.difficulty}
                  onChange={(e) =>
                    handleEditAssignment(a.id, "difficulty", e.target.value)
                  }
                  className="text-sm bg-[#1E1E2F] border border-gray-600 rounded px-2 py-1 text-white"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <h4 className="text-sm font-semibold mb-1">Starter Code:</h4>
              <Editor
                height="100px"
                defaultLanguage="python"
                value={a.starterCode}
                onChange={(val) =>
                  handleEditAssignment(a.id, "starterCode", val)
                }
                options={{ fontSize: 13, minimap: { enabled: false } }}
                theme="vs-dark"
              />

              <h4 className="mt-2 text-sm font-semibold">Expected Output:</h4>
              <textarea
                className="w-full p-2 bg-[#1E1E2F] border border-gray-600 text-sm rounded mt-1 text-green-300"
                value={a.expectedOutput}
                onChange={(e) =>
                  handleEditAssignment(a.id, "expectedOutput", e.target.value)
                }
              />

              <div className="mt-3 flex gap-2">
                <button
                  className="bg-yellow-500 px-3 py-1 rounded hover:bg-yellow-600 text-sm"
                  onClick={() => alert("Saved Changes!")}
                >
                  <FaSave /> Save
                </button>
                <button
                  className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                  onClick={() => handleDeleteAssignment(a.id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTab === "feedback" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">📬 Sent Feedback</h2>
          <ul className="space-y-3 text-sm">
            {students
              .filter((s) => s.feedback.trim() !== "")
              .map((s) => (
                <li key={s.id} className="bg-[#2A2A40] p-3 rounded border border-gray-700">
                  <strong>{s.name}</strong>: {s.feedback}
                </li>
              ))}
            {students.every((s) => s.feedback.trim() === "") && (
              <p className="text-gray-500 italic">No feedback sent yet.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InstructorPanel;
