import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './Summary.css';

const Summary = () => {
  const [stats, setStats] = useState({ totalMilk: 0, totalMoney: 0, totalDue: 0 });
  const [defaulters, setDefaulters] = useState([]);
  const [dates, setDates] = useState({
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  useEffect(() => { fetchStats(); }, []);

  const fetchStats = async () => {
    try {
        const res = await fetch('https://milkmate-w4lw.onrender.com/api/customer-ledger');
        const data = await res.json();
        let milk = 0, paid = 0, due = 0;
        const pendingList = [];

        data.forEach(c => {
            milk += c.totalBill;
            paid += c.totalPaid;
            due += c.due;
            if(c.due > 0) pendingList.push(c);
        });

        setStats({ totalMilk: milk, totalMoney: paid, totalDue: due });
        setDefaulters(pendingList);
    } catch (error) { console.error("Error", error); }
  };

  const generatePDF = async () => {
    try {
        const response = await fetch(`https://milkmate-w4lw.onrender.com/api/statement?startDate=${dates.startDate}&endDate=${dates.endDate}`);
        const transactions = await response.json();
        if (transactions.length === 0) { alert("No transactions found."); return; }

        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("MilkMate Statement", 14, 20);
        doc.setFontSize(10);
        doc.text(`From: ${dates.startDate}   To: ${dates.endDate}`, 14, 28);

        const tableColumn = ["Date", "Customer", "Liters", "Rate", "Bill (+)", "Paid (-)"];
        const tableRows = [];
        let totalBill = 0, totalPaid = 0;

        transactions.forEach(t => {
            const dateStr = new Date(t.date).toLocaleDateString();
            let liters = "-", rate = "-", billAmount = "-", paidAmount = "-";

            if (!t.isCredit) {
                liters = t.liters + " L";
                rate = "Rs. " + t.rate;
                billAmount = `Rs. ${t.amount}`;
                totalBill += t.amount;
            } else {
                liters = "Payment";
                paidAmount = `Rs. ${t.amount}`;
                totalPaid += t.amount;
            }
            tableRows.push([ dateStr, t.customer, liters, rate, billAmount, paidAmount ]);
        });

        tableRows.push(["", "", "", "TOTAL:", `Rs. ${totalBill}`, `Rs. ${totalPaid}`]);
        const balance = totalBill - totalPaid;
        tableRows.push(["", "", "", "BALANCE DUE:", "", `Rs. ${balance}`]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 35,
            theme: 'grid',
            headStyles: { fillColor: [44, 62, 80] },
            columnStyles: { 4: { textColor: [200, 0, 0] }, 5: { textColor: [0, 150, 0] } }
        });

        doc.save(`Milk_Statement.pdf`);
    } catch (error) { alert("Failed to generate PDF"); }
  };

  // IMPROVED WHATSAPP REMINDER
  const sendReminder = (name, amount) => {
      const phone = prompt(`Enter WhatsApp number for ${name} (with 91):`, "91");
      if (!phone || phone.length < 10) return;

      const msg = `*MilkMate Business Summary*%0A%0A` +
                  `Namaste *${name}* ji,%0A` +
                  `Aapka abhi tak ka milk bill *₹${amount}* pending hai.%0A` +
                  `Kripya jald bhugtan karein.%0A%0A` +
                  `_Sent via MilkMate App_`;

      window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div className="summary-container">
      <h2>📊 Business Report</h2>
      
      <div className="filter-bar">
        <div className="date-group">
            <label>From:</label>
            <input type="date" className="date-input" value={dates.startDate} onChange={(e) => setDates({...dates, startDate: e.target.value})}/>
        </div>
        <div className="date-group">
            <label>To:</label>
            <input type="date" className="date-input" value={dates.endDate} onChange={(e) => setDates({...dates, endDate: e.target.value})}/>
        </div>
        <button className="download-btn" onClick={generatePDF}>📄 Download PDF</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card blue"><h3>Total Business</h3><div className="big-number">₹ {stats.totalMilk}</div></div>
        <div className="stat-card green"><h3>Collected</h3><div className="big-number">₹ {stats.totalMoney}</div></div>
        <div className="stat-card red"><h3>Pending Udhaar</h3><div className="big-number">₹ {stats.totalDue}</div></div>
      </div>

      <div className="defaulter-section">
        <h3>⚠️ Payment Pending List</h3>
        <table className="summary-table">
            <thead>
                <tr><th>Customer</th><th>Pending Amount</th><th>Action</th></tr>
            </thead>
            <tbody>
                {defaulters.map((d, index) => (
                    <tr key={index}>
                        <td>{d.name}</td>
                        <td className="amount-due">₹ {d.due}</td>
                        <td>
                            <button className="remind-btn" onClick={() => sendReminder(d.name, d.due)}>🟢 WhatsApp Remind</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default Summary;