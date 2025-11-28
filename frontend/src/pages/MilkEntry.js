import React, { useState, useEffect } from 'react';
import './MilkEntry.css';

const MilkEntry = () => {
  // Form State
  const [formData, setFormData] = useState({
    customerName: '',
    shift: 'Morning',
    liters: '',
    fat: '',
    rate: '',
  });
  const [total, setTotal] = useState(0);

  // Table Data State
  const [entries, setEntries] = useState([]);

  // 1. Load Data when page opens
  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
        const res = await fetch('https://milkmate-w4lw.onrender.com/api/entries');
        const data = await res.json();
        setEntries(data);
    } catch (error) { console.error("Error fetching entries", error); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let qty = name === 'liters' ? parseFloat(value) : parseFloat(formData.liters);
    let r = name === 'rate' ? parseFloat(value) : parseFloat(formData.rate);
    if (!isNaN(qty) && !isNaN(r)) setTotal(qty * r);
    else setTotal(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.liters || !formData.rate) return;

    const entryData = { ...formData, total, liters: parseFloat(formData.liters), rate: parseFloat(formData.rate) };

    try {
        const response = await fetch('https://milkmate-w4lw.onrender.com/api/add-entry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entryData)
        });

        if (response.ok) {
            // alert("Entry Saved!"); // Removed Alert to make it faster
            setFormData({ customerName: '', shift: 'Morning', liters: '', fat: '', rate: '' });
            setTotal(0);
            fetchEntries(); // REFRESH TABLE INSTANTLY
        }
    } catch (error) { alert("Error saving."); }
  };

  return (
    <div className="entry-container">
      <h2>Daily Milk Entry 🥛</h2>
      
      {/* --- SECTION 1: THE FORM --- */}
      <form onSubmit={handleSubmit} className="entry-form">
         {/* ... (Keep your Shift Radio Buttons Code Here) ... */}
         <div className="form-group-row">
            <label>Shift:</label>
            <div className="radio-group">
                <label className={`radio-btn ${formData.shift === 'Morning' ? 'active' : ''}`}>
                    <input type="radio" name="shift" value="Morning" checked={formData.shift === 'Morning'} onChange={handleChange}/> 
                    ☀️ Morning
                </label>
                <label className={`radio-btn ${formData.shift === 'Evening' ? 'active' : ''}`}>
                    <input type="radio" name="shift" value="Evening" checked={formData.shift === 'Evening'} onChange={handleChange}/> 
                    🌙 Evening
                </label>
            </div>
        </div>

        <div className="input-group">
            <label>Customer Name</label>
            <input type="text" name="customerName" value={formData.customerName} placeholder="Enter Name" onChange={handleChange} required />
        </div>

        <div className="row-inputs">
            <div className="input-group">
                <label>Liters</label>
                <input type="number" name="liters" value={formData.liters} step="0.1" onChange={handleChange} required />
            </div>
            <div className="input-group">
                <label>Rate</label>
                <input type="number" name="rate" value={formData.rate} onChange={handleChange} required />
            </div>
        </div>

        <div className="total-box">
            <span>Bill: ₹ {total.toFixed(2)}</span>
            <button type="submit" className="save-btn">Save ✅</button>
        </div>
      </form>

      {/* --- SECTION 2: THE TABLE (NEW) --- */}
      <div className="recent-entries">
        <h3>Recent Entries 📋</h3>
        <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Shift</th>
                        <th>Liters</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry._id}>
                            <td>{new Date(entry.date).toLocaleDateString()}</td>
                            <td>{entry.customerName}</td>
                            <td>
                                <span className={`badge ${entry.shift}`}>
                                    {entry.shift === 'Morning' ? '☀️' : '🌙'}
                                </span>
                            </td>
                            <td>{entry.liters} L</td>
                            <td className="amount">₹{entry.total}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default MilkEntry;