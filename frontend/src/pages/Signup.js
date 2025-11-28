import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Icons
import PublicNavbar from '../components/PublicNavbar';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  
  // State for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    // Only allow numbers for phone field
    if (e.target.name === 'phone') {
      const onlyNums = e.target.value.replace(/[^0-9]/g, '');
      setFormData({ ...formData, [e.target.name]: onlyNums });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      alert("⚠️ Phone number must be exactly 10 digits.");
      return;
    }

    try {
      const response = await fetch('https://milkmate-w4lw.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      if (response.ok) {
        alert("✅ Account Created Successfully!");
        navigate('/login'); 
      } else {
        alert("❌ Error: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Make sure 'node server.js' is running.");
    }
  };

  return (
    <>
      <PublicNavbar />
      <div className="signup-page">
        <div className="signup-card">
          <h2>Create Account</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Full Name</label>
              <input 
                type="text" 
                name="fullName" 
                placeholder="Example: Ramesh Kumar" 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="field">
              <label>Mobile Number</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                placeholder="9876543210 (10 Digits)" 
                maxLength="10"
                pattern="[0-9]{10}"
                onChange={handleChange} 
                autoComplete="username" // Helps browser associate phone with password
                required 
              />
            </div>

            <div className="field password-wrapper">
              <label>Password</label>
              <div className="password-input-container">
                <input 
                  type={showPassword ? "text" : "password"} // Toggle logic
                  name="password" 
                  placeholder="Create a strong password" 
                  onChange={handleChange} 
                  autoComplete="new-password" // Tells browser this is a new signup
                  required 
                />
                {/* Eye Icon */}
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="signup-submit-btn">Sign Up</button>
          </form>

          <div className="signup-footer">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;