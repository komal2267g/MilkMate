import React from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-wrapper">
      <PublicNavbar />

      {/* Hero Section - Centered */}
      <header className="hero-centered">
        <h1>
          The Smartest Way to Manage <br />
          <span className="highlight">Milk Collection & Billing</span>
        </h1>
        <p>
          Say goodbye to paper registers. Track daily milk entries, 
          manage customers, and send WhatsApp bills in seconds.
        </p>
        <div className="hero-actions">
          <Link to="/login" className="big-cta-btn">Start Using for Free</Link>
        </div>
      </header>

      {/* How It Works Section (Fills the empty space) */}
      <section className="steps-section">
        <h2>How MilkMate Works 🚀</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Add Customers</h3>
            <p>Enter details of your customers once.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Daily Entry</h3>
            <p>Select Morning/Evening and enter Liters.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Send Bill</h3>
            <p>Click one button to send bill on WhatsApp.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="simple-footer">
        <p>Made for Indian Dairy Farmers 🇮🇳 | &copy; 2025 MilkMate</p>
      </footer>
    </div>
  );
};

export default LandingPage;