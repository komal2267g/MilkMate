import React, { useState, useEffect } from 'react';
import { FaCamera, FaSave } from 'react-icons/fa';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState({ _id: '', fullName: '', phone: '', bio: '', avatar: null });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    // Get current user data from Local Storage to show initially
    const stored = JSON.parse(localStorage.getItem('user'));
    if (stored) {
        setUser({ 
            _id: stored._id, // IMPORTANT: We need ID to tell DB who to update
            fullName: stored.fullName, 
            phone: stored.phone, 
            bio: stored.bio || "Dairy Farm Owner",
            avatar: null
        });
    }
  }, []);

  // Handle Image Upload (Visual Only for now)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  // --- REAL SAVE FUNCTION ---
  const handleSave = async () => {
    try {
        const response = await fetch('https://milkmate-w4lw.onrender.com/api/update-profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user) // Sending _id, name, phone, bio
        });

        const data = await response.json();

        if (response.ok) {
            alert("✅ Profile Updated in Database!");
            
            // Update Local Storage with NEW data from Database
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Reload to show new name in Header
            window.location.reload();
        } else {
            alert("❌ Update Failed: " + data.error);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Server Error");
    }
  };

  return (
    <div className="profile-page-container">
      <div className="profile-card">
        <div className="profile-header-bg"></div>
        
        <div className="profile-avatar-section">
            <div className="avatar-wrapper">
                <img src={preview || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"} alt="Profile" />
                <label htmlFor="file-upload" className="camera-icon">
                    <FaCamera />
                </label>
                <input id="file-upload" type="file" onChange={handleImageChange} hidden />
            </div>
        </div>

        <div className="profile-form">
            <div className="form-group">
                <label>Full Name</label>
                <input 
                    type="text" 
                    value={user.fullName} 
                    onChange={(e) => setUser({...user, fullName: e.target.value})} 
                />
            </div>
            
            <div className="form-group">
                <label>Phone Number</label>
                {/* Removed 'disabled' and 'disabled-input' class so you can edit it */}
                <input 
                    type="text" 
                    value={user.phone} 
                    onChange={(e) => setUser({...user, phone: e.target.value})} 
                />
            </div>

            <div className="form-group">
                <label>Bio / Dairy Name</label>
                <textarea 
                    value={user.bio} 
                    onChange={(e) => setUser({...user, bio: e.target.value})} 
                    rows="3"
                ></textarea>
            </div>

            <button className="save-profile-btn" onClick={handleSave}>
                <FaSave /> Save Changes
            </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;