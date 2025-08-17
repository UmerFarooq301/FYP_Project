import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RoleRedirectDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (!role) {
      navigate("/");
    } else {
      switch (role) {
        case "Student":
          navigate("/StudentDashboard");
          break;
        case "Instructor":
          navigate("/InstructorDashboard");
          break;
        case "Data Scientist":
          navigate("/DataScientistDashboard");
          break;
        case "Guest":
        default:
          navigate("/GuestDashboard");
      }
    }
  }, [navigate]);

  return <div className="text-white text-center p-10">Redirecting to your dashboard...</div>;
};

export default RoleRedirectDashboard;
