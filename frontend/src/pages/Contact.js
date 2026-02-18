import React, { useState, useEffect } from 'react';
import './Customers.css';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search state
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => { fetchLedger(); }, []);

  const fetchLedger = async () => {
    try {
      const res = await fetch('https://milkmate-w4lw.onrender.com/api/customer-ledger');
      const data = await res.json();
      setCustomers(data);
    } catch (error) { console.error("Error", error); }
  };

  // HISTORY FETCH LOGIC
  const fetchDetailedHistory = async (name) => {
    const res = await fetch(`https://milkmate-w4lw.onrender.com/api/ledger/${name}`);
    const data = await res.json();
    setSelectedLedger({ name, data });
    setIsModalOpen(true);
  };

  // --- SEARCH FILTER LOGIC ---
  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="customers-container">
      <div className="customers-header">
         <h2>My Customers (Search Hub) 👥</h2>
         
         {/* EK LAUTA SEARCH BAR YAHAN HOGA */}
         <div className="search-wrapper">
            <input 
              type="text" 
              className="main-search-input"
              placeholder="🔍 Search customer name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
         </div>
      </div>

      <div className="table-wrapper">
        <table className="cust-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Total Bill</th>
              <th>Total Paid</th>
              <th>Balance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((c, index) => (
              <tr key={index}>
                <td className="fw-bold">{c.name}</td>
                <td>₹ {c.totalBill}</td>
                <td className="text-green">₹ {c.totalPaid}</td>
                <td className={c.due > 0 ? "text-red" : "text-green"}>
                   {c.due > 0 ? `Due: ₹${c.due}` : "Clear ✅"}
                </td>
                <td>
                  <button className="history-btn" onClick={() => fetchDetailedHistory(c.name)}>
                    📑 View Ledger (History)
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL WAHI RAHEGA (Pop-up History) */}
      {isModalOpen && selectedLedger && (
         <div className="modal-overlay">
            <div className="ledger-modal">
                <div className="modal-header">
                    <h3>History: {selectedLedger.name}</h3>
                    <button onClick={() => setIsModalOpen(false)}>✖</button>
                </div>
                {/* ... (Modal table code jaisa pehle tha) ... */}
            </div>
         </div>
      )}
    </div>
  );
};

export default Customers;