<link rel="stylesheet" href="style.css" />
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import RoleRedirectDashboard from "./Components/RoleRedirectDashboard";

import StudentDashboard from "./Components/StudentDashboard";
import InstructorDashboard from './Components/IntructorDashboard';
import DataScientistDashboard from './Components/DataScientistDashboard';
import GuestDashboard from './Components/GuestDashboard';

import SmartCodeEdit from "./Components/SmartCodeEdit";
import CollaborationPanel from "./Components/CollaborationPanel";
import ProjectFileManager from "./Components/ProjectFileManager";
import MLTrainingScreen from "./Components/MLTrainingScreen";
import DataVisualizationScreen from "./Components/DataVisualizationScreen";
import InstructorPanel from "./Components/InstructorPanel";
import ErrorRecoveryScreen from "./Components/ErrorRecoveryScreen";
import SettingsScreen from "./Components/SettingsScreen";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/RoleRedirectDashboard" element={<RoleRedirectDashboard/>}/>
        <Route path="/StudentDashboard" element={<StudentDashboard />} />
        <Route path="/InstructorDashboard" element={<InstructorDashboard />} />
        <Route path="/DataScientistDashboard" element={<DataScientistDashboard />} />
        <Route path="/GuestDashboard" element={<GuestDashboard />} />
        <Route path="/SmartCodeEdit" element={<SmartCodeEdit />} />
        <Route path="/CollaborationPanel" element={<CollaborationPanel />} />
        <Route path="/ProjectFileManager" element={<ProjectFileManager />} />
        <Route path="/MLTrainingScreen" element={<MLTrainingScreen />} />
        <Route path="/DataVisualizationScreen" element={<DataVisualizationScreen />} />
        <Route path="/InstructorPanel" element={<InstructorPanel />} />
        <Route path="/ErrorRecoveryScreen" element={<ErrorRecoveryScreen />} />
        <Route path="/SettingsScreen" element={<SettingsScreen />} />
        </Routes>
    </Router>
  );
}

export default App;
