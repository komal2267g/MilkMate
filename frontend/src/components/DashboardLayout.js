import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import "./Dashboard.css";

const DashboardLayout = ({ onLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="dash-wrapper">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className={`dash-main ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <Header isOpen={sidebarOpen} setIsOpen={setSidebarOpen} onLogout={handleLogout} />

        <div className="dash-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;