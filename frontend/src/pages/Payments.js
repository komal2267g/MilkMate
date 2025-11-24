import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code"; 
import './Payments.css';

const Payments = () => {
  const [payment, setPayment] = useState({
    customerName: '', amount: '', date: new Date().toISOString().split('T')[0], mode: 'Cash'
  });
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  
  // QR Code State
  const [showQr, setShowQr] = useState(false);
  const [myUpi, setMyUpi] = useState("milkman@upi"); // Default

  useEffect(() => { fetchHistory(); fetchCustomers(); }, []);

  const fetchHistory = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/payments');
        const data = await res.json();
        setTransactions(data);
    } catch (err) { console.error("Error", err); }
  };

  const fetchCustomers = async () => {
    try {
        const res = await fetch('http://localhost:5000/api/customer-list');
        const data = await res.json();
        setCustomers(data);
    } catch (err) { console.error("Error", err); }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!payment.customerName || !payment.amount) return alert("Select Customer & Amount");

    try {
        const response = await fetch('http://localhost:5000/api/add-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payment)
        });
        if (response.ok) {
            alert("✅ Payment Collected!");
            setPayment({ ...payment, amount: '' }); 
            fetchHistory(); 
        }
    } catch (error) { alert("Server Error"); }
  };

  return (
    <div className="payments-container">
      <div className="page-header">
        <h2>💰 Receive Payment</h2>
        {/* Toggle QR Button - Clean Style */}
        <button className="qr-toggle-btn" onClick={() => setShowQr(!showQr)}>
          {showQr ? "Close QR ❌" : "Show QR Code 📷"}
        </button>
      </div>

      {/* QR CODE SECTION (Only shows when clicked) */}
      {showQr && (
        <div className="qr-card-overlay">
            <div className="qr-content">
                <h3>Scan to Pay</h3>
                <div className="qr-box">
                    <QRCode value={`upi://pay?pa=${myUpi}&pn=MilkMateUser`} size={120} />
                </div>
                <input 
                    type="text" 
                    value={myUpi} 
                    onChange={(e) => setMyUpi(e.target.value)} 
                    placeholder="Enter UPI ID"
                    className="upi-edit-input"
                />
            </div>
        </div>
      )}

      {/* ORIGINAL CLEAN FORM */}
      <form className="payment-form" onSubmit={handleAdd}>
        <div className="form-group">
          <label>Select Customer</label>
          <select 
            value={payment.customerName}
            onChange={(e) => setPayment({...payment, customerName: e.target.value})}
            className="styled-input"
            required
          >
            <option value="">-- Choose Customer --</option>
            {customers.map((name, index) => (
                <option key={index} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="form-row">
            <div className="form-group">
                <label>Amount (₹)</label>
                <input 
                    type="number" 
                    placeholder="₹ 0" 
                    value={payment.amount}
                    onChange={(e) => setPayment({...payment, amount: e.target.value})}
                    className="styled-input"
                    required
                />
            </div>
            <div className="form-group">
                <label>Date</label>
                <input 
                    type="date" 
                    value={payment.date}
                    onChange={(e) => setPayment({...payment, date: e.target.value})}
                    className="styled-input"
                />
            </div>
        </div>

        {/* Payment Mode */}
        <div className="payment-modes">
            <label className={`mode-btn ${payment.mode === 'Cash' ? 'active' : ''}`}>
                <input type="radio" name="mode" value="Cash" checked={payment.mode === 'Cash'} onChange={() => setPayment({...payment, mode: 'Cash'})} />
                💵 Cash
            </label>
            <label className={`mode-btn ${payment.mode === 'UPI' ? 'active' : ''}`}>
                <input type="radio" name="mode" value="UPI" checked={payment.mode === 'UPI'} onChange={() => setPayment({...payment, mode: 'UPI'})} />
                📱 UPI
            </label>
        </div>

        <button type="submit" className="add-btn">Collect Money</button>
      </form>

      {/* Transaction History - List Style */}
      <div className="txn-history">
        <h3>Recent Transactions</h3>
        <div className="txn-list">
            {transactions.map((t) => (
                <div key={t._id} className="txn-card">
                    <div>
                        <strong>{t.customerName}</strong>
                        <div className="txn-date">
                            {new Date(t.date).toLocaleDateString()} • {t.mode}
                        </div>
                    </div>
                    <div className="txn-amount">+ ₹{t.amount}</div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;