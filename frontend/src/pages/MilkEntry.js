import React, { useState, useEffect } from 'react';
import './MilkEntry.css';

const MilkEntry = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    shift: 'Morning',
    liters: '',
    fat: '',
    snf: '', // New Field
    milkType: 'Cow', // New Field
    rate: '',
  });
  const [total, setTotal] = useState(0);
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  // AUTO-CALCULATE RATE & TOTAL
  useEffect(() => {
    const f = parseFloat(formData.fat) || 0;
    const s = parseFloat(formData.snf) || 0;
    const l = parseFloat(formData.liters) || 0;

    // Standard Industry Formula: (Fat * 6.5) + (SNF * 3.5)
    // You can adjust these multipliers based on your local rates
    const calculatedRate = (f * 6.5) + (s * 3.5);
    
    if (calculatedRate > 0) {
      const finalTotal = calculatedRate * l;
      setFormData(prev => ({ ...prev, rate: calculatedRate.toFixed(2) }));
      setTotal(finalTotal);
    }
  }, [formData.fat, formData.snf, formData.liters]);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.liters) return;

    const entryData = { 
        ...formData, 
        total: total.toFixed(2), 
        liters: parseFloat(formData.liters), 
        rate: parseFloat(formData.rate),
        fat: parseFloat(formData.fat),
        snf: parseFloat(formData.snf)
    };

    try {
        const response = await fetch('https://milkmate-w4lw.onrender.com/api/add-entry', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entryData)
        });

        if (response.ok) {
            setFormData({ customerName: '', shift: 'Morning', liters: '', fat: '', snf: '', milkType: 'Cow', rate: '' });
            setTotal(0);
            fetchEntries(); 
        }
    } catch (error) { alert("Error saving."); }
  };

  return (
    <div className="entry-container">
      <h2>Daily Milk Entry 🥛</h2>
      
      <form onSubmit={handleSubmit} className="entry-form">
         <div className="form-group-row">
            <label>Shift & Type:</label>
            <div className="radio-group">
                <select name="shift" value={formData.shift} onChange={handleChange} className="dropdown-small">
                    <option value="Morning">☀️ Morning</option>
                    <option value="Evening">🌙 Evening</option>
                </select>
                <select name="milkType" value={formData.milkType} onChange={handleChange} className="dropdown-small">
                    <option value="Cow">🐄 Cow</option>
                    <option value="Buffalo">🐃 Buffalo</option>
                </select>
            </div>
        </div>

        <div className="input-group">
            <label>Customer Name</label>
            <input type="text" name="customerName" value={formData.customerName} placeholder="Enter Name" onChange={handleChange} required />
        </div>

        <div className="row-inputs">
            <div className="input-group">
                <label>Liters</label>
                <input type="number" name="liters" value={formData.liters} step="0.1" placeholder="0.0" onChange={handleChange} required />
            </div>
            <div className="input-group">
                <label>Fat %</label>
                <input type="number" name="fat" value={formData.fat} step="0.1" placeholder="4.5" onChange={handleChange} />
            </div>
            <div className="input-group">
                <label>SNF %</label>
                <input type="number" name="snf" value={formData.snf} step="0.1" placeholder="8.5" onChange={handleChange} />
            </div>
        </div>

        <div className="total-box">
            <div className="rate-display">Rate: ₹{formData.rate || '0.00'}</div>
            <span>Bill: ₹ {total.toFixed(2)}</span>
            <button type="submit" className="save-btn">Save ✅</button>
        </div>
      </form>

      <div className="recent-entries">
        <h3>Recent Entries 📋</h3>
        <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Fat/SNF</th>
                        <th>Liters</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <tr key={entry._id}>
                            <td>{new Date(entry.date).toLocaleDateString()}</td>
                            <td>{entry.customerName}</td>
                            <td>{entry.milkType || 'Cow'}</td>
                            <td>{entry.fat || 0} / {entry.snf || 0}</td>
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