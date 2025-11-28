import React, { useState, useEffect } from 'react';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchLedger();
  }, []);

  const fetchLedger = async () => {
    try {
      const res = await fetch('https://milkmate-w4lw.onrender.com/api/customer-ledger');
      const data = await res.json();
      setCustomers(data);
    } catch (error) { console.error("Error", error); }
  };

// ... existing imports

  const sendWhatsApp = (name, amount) => {
    // Polite Message
    const message = `Namaste ${name} ji, \n\nThis is a gentle reminder regarding your milk bill due of ₹${amount}. \n\nKindly pay at your earliest convenience. \n\nThank you! \n- MilkMate Dairy`;
    
    // Open WhatsApp
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

// ... rest of the code

  return (
    <div className="customers-container">
      <h2>My Customers (Hisab Kitab) 👥</h2>

      <div className="table-wrapper">
        <table className="cust-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Bill (Milk)</th>
              <th>Total Paid</th>
              <th>Current Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, index) => (
              <tr key={index}>
                <td className="fw-bold">{c.name}</td>
                <td>₹ {c.totalBill}</td>
                <td className="text-green">₹ {c.totalPaid}</td>
                <td className={c.due > 0 ? "text-red" : "text-green"}>
                  {c.due > 0 ? `Due: ₹${c.due}` : "All Clear ✅"}
                </td>
                <td>
                  {c.due > 0 && (
                    <button 
                      className="whatsapp-btn"
                      onClick={() => sendWhatsApp(c.name, c.due)}
                    >
                      📲 Remind
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {customers.length === 0 && <tr><td colSpan="5">No data found yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;