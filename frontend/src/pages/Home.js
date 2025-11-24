import React from "react";
import { Link } from "react-router-dom";
import { GiCow, GiMilkCarton } from "react-icons/gi";
import "./Home.css";

const Home = () => {
  return (
    <div className="landing-container">
      <nav className="navbar">
        <div className="nav-left">
          <GiCow className="nav-cow" />
          <div className="nav-logo">DairyApp</div>
        </div>

        <ul className="nav-links">
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login" className="login-btn">Login</Link></li>
        </ul>
      </nav>

      <header className="hero">
        <div className="hero-text">
          <h1>Welcome to DairyApp</h1>
          <p>Manage daily milk collection, customer balances and payments — simple and fast.</p>
          <Link to="/login" className="get-started-main">Get Started</Link>
        </div>

        <div className="hero-icon">
          <GiCow className="cow-hero" />
        </div>
      </header>

      <footer className="footer">© 2025 DairyApp — All Rights Reserved</footer>
    </div>
  );
};

export default Home;
