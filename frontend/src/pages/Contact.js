import React from 'react';
import PublicNavbar from '../components/PublicNavbar'; // Import the new navbar
import './Contact.css';

const Contact = () => {
  return (
    <div className="page-wrapper">
      <PublicNavbar />
      
      <div className="contact-container">
        <div className="contact-header">
          <h1>Get in Touch</h1>
          <p>Have questions about DairyApp? We're here to help.</p>
        </div>

        <div className="contact-grid">
          {/* Left Side: Contact Info */}
          <div className="contact-info-card">
            <div className="info-item">
              <div className="icon-circle">📧</div>
              <div>
                <h3>Email Us</h3>
                <p>support@dairyapp.com</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-circle">📞</div>
              <div>
                <h3>Call Us</h3>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="info-item">
              <div className="icon-circle">🏢</div>
              <div>
                <h3>Office</h3>
                <p>Tech Park, Bangalore, India</p>
              </div>
            </div>
          </div>

          {/* Right Side: Simple Form */}
          <div className="contact-form-card">
            <form>
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="4" placeholder="How can we help?"></textarea>
              </div>
              <button type="button" className="submit-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;