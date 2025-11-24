import React, { useState } from 'react';
import './UserProfile.css'; // Reusing CSS

const Security = () => {
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

  const handleUpdate = (e) => {
    e.preventDefault();
    if(passwords.new !== passwords.confirm) {
        alert("❌ New passwords do not match!");
        return;
    }
    alert("✅ Password updated successfully!");
    // In real app, send API call here
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-form" style={{textAlign: 'center'}}>
            <h2>Security & Privacy 🔒</h2>
            <p style={{marginBottom: '20px', color: '#666'}}>Update your password to keep account safe.</p>
            
            <form onSubmit={handleUpdate} style={{textAlign: 'left'}}>
                <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" value={passwords.current} onChange={e=>setPasswords({...passwords, current: e.target.value})} required/>
                </div>
                <div className="form-group">
                    <label>New Password</label>
                    <input type="password" value={passwords.new} onChange={e=>setPasswords({...passwords, new: e.target.value})} required/>
                </div>
                <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" value={passwords.confirm} onChange={e=>setPasswords({...passwords, confirm: e.target.value})} required/>
                </div>
                <button className="save-profile-btn" style={{backgroundColor: '#d32f2f'}}>Update Password</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default Security;