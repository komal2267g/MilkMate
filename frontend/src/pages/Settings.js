import React, { useState, useEffect } from 'react';
import { FaStore, FaMoneyBillWave, FaMoon, FaFileExport, FaSave, FaTrash } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  // --- STATE VARIABLES ---
  const [dairyName, setDairyName] = useState("MilkMate Dairy Farm");
  const [defaultRate, setDefaultRate] = useState(60);
  const [address, setAddress] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [currency, setCurrency] = useState("INR");

  // --- LOAD SETTINGS ON STARTUP ---
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('appSettings'));
    if (savedSettings) {
        setDairyName(savedSettings.dairyName);
        setDefaultRate(savedSettings.defaultRate);
        setAddress(savedSettings.address || "");
        setDarkMode(savedSettings.darkMode);
        setCurrency(savedSettings.currency || "INR");
        
        // Apply Dark Mode immediately if saved
        if (savedSettings.darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }
  }, []);

  // --- TOGGLE DARK MODE ---
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
  };

  // --- SAVE SETTINGS ---
  const handleSave = () => {
    const settings = { dairyName, defaultRate, address, darkMode, currency };
    localStorage.setItem('appSettings', JSON.stringify(settings));
    alert("✅ Settings Saved Successfully!");
  };

  // --- EXPORT DATA TO CSV ---
  const handleExport = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/entries'); 
        const data = await res.json();

        if (!data || data.length === 0) {
            return alert("⚠️ No data found to export!");
        }

        // CSV Header
        const headers = ["Date,Customer Name,Shift,Liters,Fat,Rate,Total Amount\n"];
        
        // CSV Rows
        const rows = data.map(row => 
            `${new Date(row.date).toLocaleDateString()},${row.customerName},${row.shift},${row.liters},${row.fat || 0},${row.rate},${row.total}`
        );

        // Combine
        const csvContent = "data:text/csv;charset=utf-8," + headers + rows.join("\n");
        
        // Trigger Download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "MilkMate_Data.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } catch (error) {
        console.error("Export Error:", error);
        alert("❌ Failed to export data. Check if backend is running.");
    }
  };

  // --- RESET ALL DATA ---
  const handleReset = async () => {
    if (window.confirm("⚠️ ARE YOU SURE? This will permanently delete ALL Customer Entries and Payments! This cannot be undone.")) {
        try {
            const res = await fetch('http://localhost:5000/api/reset-all', { method: 'DELETE' });
            
            if (res.ok) {
                alert("♻️ System Reset Successful. All data cleared.");
                window.location.reload(); // Refresh to clear frontend state
            } else {
                alert("❌ Failed to reset data.");
            }
        } catch (error) {
            console.error("Reset Error:", error);
            alert("❌ Server Error. Ensure backend is running.");
        }
    }
  };

  return (
    <div className="settings-container">
      <div className="page-header">
        <h2>⚙️ App Settings</h2>
      </div>

      <div className="settings-grid">
        
        {/* 1. BUSINESS PROFILE CARD */}
        <div className="settings-card">
            <div className="card-header">
                <FaStore className="card-icon"/>
                <h3>Business Profile</h3>
            </div>
            <p className="helper-text">This information will appear on PDF Reports & Bills.</p>
            
            <div className="form-group">
                <label>Dairy / Farm Name</label>
                <input 
                    type="text" 
                    value={dairyName} 
                    onChange={(e) => setDairyName(e.target.value)} 
                    placeholder="Ex: Sharma Dairy Farm"
                />
            </div>
            <div className="form-group">
                <label>Business Address</label>
                <textarea 
                    rows="2"
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    placeholder="Enter Shop Address..."
                />
            </div>
        </div>

        {/* 2. DEFAULTS CARD */}
        <div className="settings-card">
            <div className="card-header">
                <FaMoneyBillWave className="card-icon"/>
                <h3>Pricing Defaults</h3>
            </div>
            <p className="helper-text">Set default values to speed up daily entries.</p>

            <div className="form-row">
                <div className="form-group">
                    <label>Default Milk Rate (₹/L)</label>
                    <input 
                        type="number" 
                        value={defaultRate} 
                        onChange={(e) => setDefaultRate(e.target.value)} 
                    />
                </div>
                <div className="form-group">
                    <label>Currency</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                        <option value="INR">🇮🇳 INR (₹)</option>
                        <option value="USD">🇺🇸 USD ($)</option>
                    </select>
                </div>
            </div>
        </div>

        {/* 3. APPEARANCE CARD */}
        <div className="settings-card">
            <div className="card-header">
                <FaMoon className="card-icon"/>
                <h3>App Appearance</h3>
            </div>
            
            <div className="setting-item">
                <div className="setting-info">
                    <h4>Dark Mode</h4>
                    <p>Switch between light and dark themes.</p>
                </div>
                <label className="switch">
                    <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
                    <span className="slider round"></span>
                </label>
            </div>
        </div>

        {/* 4. DATA MANAGEMENT CARD (DANGER ZONE) */}
        <div className="settings-card danger-zone">
            <div className="card-header">
                <FaFileExport className="card-icon"/>
                <h3>Data Management</h3>
            </div>
            <p className="helper-text">Manage your data backups and resets.</p>
            
            <div className="setting-buttons">
                <button className="btn-outline" onClick={handleExport}>
                    📥 Export All Data (CSV)
                </button>
                <button className="btn-danger" onClick={handleReset}>
                    <FaTrash /> Reset All Data
                </button>
            </div>
        </div>

      </div>

      {/* SAVE BUTTON */}
      <div className="save-bar">
        <button className="save-btn-main" onClick={handleSave}>
            <FaSave /> Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;