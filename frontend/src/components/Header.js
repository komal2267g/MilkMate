import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import { FaUserCircle, FaBars, FaCog, FaSignOutAlt, FaUser, FaBell, FaShieldAlt } from 'react-icons/fa';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Guest");
  const [showDropdown, setShowDropdown] = useState(false); // Toggle for menu

  useEffect(() => {
    // Get User Data
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        const userObj = JSON.parse(storedUser);
        setUserName(userObj.fullName || "Milkman");
    }
  }, []);

  const handleLogout = () => {
    // 1. Clear Data
    localStorage.removeItem('user');
    // 2. Redirect to Login
    navigate('/login');
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-btn" onClick={toggleSidebar}>
           <FaBars />
        </button>
        <h3>Dashboard</h3>
      </div>

      <div className="header-right">
        {/* Profile Section */}
        <div className="profile-container" onClick={() => setShowDropdown(!showDropdown)}>
            <div className="user-info">
                <span className="user-name">{userName}</span>
                <span className="user-role">Admin</span>
            </div>
            <FaUserCircle className="profile-icon" size={35} />
        </div>

        {/* --- PROFESSIONAL DROPDOWN MENU --- */}
        {showDropdown && (
            <div className="profile-dropdown">
                {/* User Header in Menu */}
                <div className="dropdown-header">
                    <FaUserCircle size={40} className="dropdown-avatar"/>
                    <div>
                        <h4>{userName}</h4>
                        <p className="dropdown-email">admin@milkmate.com</p>
                    </div>
                </div>
                <hr />

                {/* Menu Items - CLICKABLE */}
                <div className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/dashboard/profile'); }}>
                    <FaUser className="icon"/> My Profile
                </div>
                <div className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/dashboard/settings'); }}>
                    <FaCog className="icon"/> Account Settings
                </div>
                <div className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/dashboard/notifications'); }}>
                    <FaBell className="icon"/> Notifications
                </div>
                <div className="dropdown-item" onClick={() => { setShowDropdown(false); navigate('/dashboard/security'); }}>
                    <FaShieldAlt className="icon"/> Security & Privacy
                </div>

                <hr />
                
                {/* Logout Button */}
                <div className="dropdown-item logout" onClick={handleLogout}>
                    <FaSignOutAlt className="icon"/> Logout
                </div>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;