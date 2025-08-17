import React, { useState, useEffect } from "react";
import { FaFolder, FaFileCode, FaTrash, FaDownload, FaUpload, FaPlus, FaHistory, FaChevronDown, FaChevronRight, FaShareAlt } from "react-icons/fa";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Editor from "@monaco-editor/react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001");
const FileNode = ({ item, onSelect, selectedId, moveItem }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FILE",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  const [, drop] = useDrop(() => ({
    accept: "FILE",
    drop: (dragged) => {
      if (dragged.id !== item.id) {
        moveItem(dragged.id, item.id);
      }
    }
  }));

  return (
    <li ref={(node) => drag(drop(node))} className={`ml-2 ${isDragging ? "opacity-50" : ""}`}>
      <div className={`flex items-center gap-2 text-sm cursor-pointer py-1 px-1 rounded hover:bg-green-700/10 ${selectedId === item.id ? "bg-green-800/20" : ""}`} onClick={() => item.type === "file" ? onSelect(item) : setCollapsed(!collapsed)}>
        {item.type === "folder" ? (collapsed ? <FaChevronRight /> : <FaChevronDown />) : <FaFileCode />}
        {item.type === "folder" ? <FaFolder /> : <FaFileCode />}
        <span>{item.name}</span>
      </div>
      {!collapsed && item.children && (
        <ul className="ml-4">
          {item.children.map((child) => (
            <FileNode key={child.id} item={child} onSelect={onSelect} selectedId={selectedId} moveItem={moveItem} />
          ))}
        </ul>
      )}
    </li>
  );
};

const ProjectFileManager = () => {
  const [files, setFiles] = useState([
    { id: "1", name: "main.py", type: "file", content: "# Initial Python file" },
    {
      id: "2",
      name: "components",
      type: "folder",
      children: [
        { id: "3", name: "Header.js", type: "file", content: "// Header code" }
      ]
    }
  ]);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    socket.on("file-update", (data) => {
      setSelectedFile((prev) =>
        prev && prev.id === data.id ? { ...prev, content: data.content } : prev
      );
    });

    return () => socket.off("file-update");
  }, []);

  const handleEditorChange = (value) => {
    const updated = { ...selectedFile, content: value };
    setSelectedFile(updated);
    socket.emit("file-update", updated);
  };

  const moveItem = (dragId, dropId) => {
    console.log("Move", dragId, "to", dropId);
  };

  const renderFileTree = () =>
    files.map((file) => (
      <FileNode key={file.id} item={file} onSelect={setSelectedFile} selectedId={selectedFile?.id} moveItem={moveItem} />
    ));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-screen h-screen flex font-poppins bg-[#1E1E2F] text-white">
        <aside className="w-72 bg-[#2A2A40] border-r border-gray-700 p-4 overflow-auto">
          <h2 className="text-xl font-bold mb-4">📁 Project Files</h2>
          <div className="flex gap-2 mb-4 text-sm">
            <button className="flex items-center gap-1 bg-green-600 px-3 py-1 rounded hover:bg-green-700 text-white">
              <FaPlus /> File
            </button>
            <button className="flex items-center gap-1 bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 text-white">
              <FaPlus /> Folder
            </button>
          </div>
          <ul>{renderFileTree()}</ul>

          <div className="mt-6 flex flex-col gap-2 text-sm">
            <button className="flex items-center gap-2 hover:text-green-400">
              <FaUpload /> Upload
            </button>
            <button className="flex items-center gap-2 hover:text-green-400">
              <FaDownload /> Download
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold"> Project Manager</h1>
            {selectedFile && (
              <div className="flex gap-4 text-sm">
                <button className="flex items-center gap-2 text-red-400 hover:underline">
                  <FaTrash /> Delete
                </button>
                <button className="flex items-center gap-2 text-blue-400 hover:underline">
                  <FaDownload /> Download
                </button>
                <button className="flex items-center gap-2 text-green-400 hover:underline">
                  <FaShareAlt /> Share
                </button>
              </div>
            )}
          </div>

          <div className="h-[60vh] border border-gray-600 rounded overflow-hidden shadow-inner">
            {selectedFile ? (
              <Editor
                height="100%"
                defaultLanguage={selectedFile.name.endsWith(".js") ? "javascript" : "python"}
                theme="vs-dark"
                value={selectedFile.content}
                onChange={handleEditorChange}
                options={{ fontSize: 14, minimap: { enabled: false }, fontFamily: "Fira Code", fontLigatures: true }}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400"> Select a file to view/edit</div>
            )}
          </div>

          <div className="bg-[#2A2A40] rounded shadow p-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold mb-2 text-white"><FaHistory /> Version History</h2>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>main.py updated - 2h ago</li>
              <li>Header.js added - 1d ago</li>
              <li>components folder created</li>
            </ul>
          </div>
        </main>
      </div>
    </DndProvider>
  );
};

export default ProjectFileManager;