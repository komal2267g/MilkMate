import React from 'react';
import { Link } from 'react-router-dom';
import { GiCow } from "react-icons/gi"; // <--- Imported Cow Icon
import './PublicNavbar.css';

const PublicNavbar = () => {
  return (
    <nav className="public-nav">
      <div className="nav-container">
        {/* LEFT: Cow Icon + Brand Name */}
        <Link to="/" className="nav-brand">
          <div className="logo-circle">
            <GiCow className="cow-icon" /> {/* <--- Using React Icon */}
          </div>
          <span className="brand-text">MilkMate</span>
        </Link>

        {/* RIGHT: Buttons */}
        <div className="nav-menu">
          <Link to="/login" className="nav-btn btn-login">Log In</Link>
          <Link to="/signup" className="nav-btn btn-signup">Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;