import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import Eye Icons
import PublicNavbar from '../components/PublicNavbar';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Toggle State
  const [formData, setFormData] = useState({ phone: '', password: '' });

  const handleChange = (e) => {
    if (e.target.name === 'phone') {
        setFormData({ ...formData, [e.target.name]: e.target.value.replace(/[^0-9]/g, '') });
    } else {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data.user)); 
        navigate('/dashboard'); 
      } else {
        alert("❌ Login Failed: " + data.error);
      }
    } catch (error) { alert("Server error."); }
  };

  return (
    <>
      <PublicNavbar />
      <div className="login-page">
        <div className="login-card">
          <h2>Login to MilkMate</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Phone Number</label>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                placeholder="Enter 10-digit number" 
                maxLength="10"
                onChange={handleChange}
                autoComplete="username" // Helps Password Manager
                required
              />
            </div>

            <div className="field password-wrapper">
              <label>Password</label>
              <div className="password-input-container">
                <input 
                    type={showPassword ? "text" : "password"} // Toggle Type
                    name="password"
                    placeholder="Enter password" 
                    onChange={handleChange}
                    autoComplete="current-password" // Helps Password Manager
                    required
                />
                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
            </div>

            <button type="submit" className="submit-btn">Login</button>
          </form>
          {/* ... Footer ... */}
           <div className="login-footer">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;