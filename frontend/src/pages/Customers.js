import React, { useState, useEffect } from 'react';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchLedger(); }, []);

  const fetchLedger = async () => {
    try {
      const res = await fetch('https://milkmate-w4lw.onrender.com/api/customer-ledger');
      const data = await res.json();
      setCustomers(data);
    } catch (error) { console.error("Error", error); }
  };

  // Naya Function: Detailed History fetch karne ke liye
  const fetchDetailedHistory = async (name) => {
    setLoading(true);
    try {
      const res = await fetch(`https://milkmate-w4lw.onrender.com/api/ledger/${name}`);
      const data = await res.json();
      setSelectedLedger({ name, data });
      setIsModalOpen(true);
    } catch (error) { console.error(error); }
    setLoading(false);
  };

  const sendWhatsApp = (name, amount) => {
    const message = `Namaste ${name} ji, \n\nAapka Milk bill udhaar ₹${amount} pending hai. \n\nKripya jald bhugtan karein. \n\nThank you! \n- MilkMate Dairy`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="customers-container">
      <h2>My Customers (Hisab Kitab) 👥</h2>

      <div className="table-wrapper">
        <table className="cust-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Total Bill</th>
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
                <td className="action-btns">
                  <button className="history-btn" onClick={() => fetchDetailedHistory(c.name)}>📑 History</button>
                  {c.due > 0 && (
                    <button className="whatsapp-btn" onClick={() => sendWhatsApp(c.name, c.due)}>📲 Remind</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* LEDGER MODAL (Pop-up History) */}
      {isModalOpen && selectedLedger && (
        <div className="modal-overlay">
          <div className="ledger-modal">
            <div className="modal-header">
              <h3>📜 History: {selectedLedger.name}</h3>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>✖</button>
            </div>
            <div className="modal-body">
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Detail</th>
                    <th>Bill (+)</th>
                    <th>Paid (-)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedLedger.data.map((item, i) => (
                    <tr key={i} className={item.type === 'MILK' ? 'row-milk' : 'row-pay'}>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td>{item.type === 'MILK' ? `${item.liters}L (${item.shift})` : '💰 Payment'}</td>
                      <td className="text-red">{item.type === 'MILK' ? `₹${item.total}` : '-'}</td>
                      <td className="text-green">{item.type === 'PAYMENT' ? `₹${item.amount}` : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;