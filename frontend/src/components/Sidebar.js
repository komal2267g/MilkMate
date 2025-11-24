import React from "react";
import { Link } from "react-router-dom";
import { GiCow } from "react-icons/gi";
import { FaUsers, FaMoneyBillWave, FaChartPie } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <aside className={isOpen ? "sidebar open" : "sidebar"}>
      {/* Logo Section */}
      <div className="sidebar-logo-section">
        <div className="logo-circle">🐄</div>
        {isOpen && <span className="brand-name">DairyApp</span>}
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="menu-list">
          <li>
            <Link to="/dashboard/milk-entry" className="menu-item">
              <GiCow className="menu-icon" />
              {isOpen && <span>Milk Entry</span>}
            </Link>
          </li>

          <li>
            <Link to="/dashboard/customers" className="menu-item">
              <FaUsers className="menu-icon" />
              {isOpen && <span>Customers</span>}
            </Link>
          </li>

          <li>
            <Link to="/dashboard/payments" className="menu-item">
              <FaMoneyBillWave className="menu-icon" />
              {isOpen && <span>Payments</span>}
            </Link>
          </li>

          <li>
            <Link to="/dashboard/summary" className="menu-item">
              <FaChartPie className="menu-icon" />
              {isOpen && <span>Summary</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;