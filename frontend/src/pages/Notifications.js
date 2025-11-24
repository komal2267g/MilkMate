import React from 'react';
import './Summary.css'; // Reuse CSS

const Notifications = () => {
  const activities = [
    { id: 1, text: "Bill sent to Ramesh Gupta via WhatsApp", time: "2 hours ago", type: "success" },
    { id: 2, text: "Payment received from Sita Devi (₹500)", time: "5 hours ago", type: "info" },
    { id: 3, text: "Generated Monthly Report PDF", time: "Yesterday", type: "neutral" },
  ];

  return (
    <div className="summary-container">
      <h2>🔔 Activity Log & Notifications</h2>
      <div className="defaulter-section" style={{marginTop: '20px'}}>
        <table className="summary-table">
            <tbody>
                {activities.map(act => (
                    <tr key={act.id}>
                        <td style={{width: '70%'}}>{act.text}</td>
                        <td style={{color: '#888', fontSize: '0.9rem'}}>{act.time}</td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};
export default Notifications;