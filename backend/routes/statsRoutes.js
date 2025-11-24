const express = require('express');
const router = express.Router();
const Milk = require('../models/Milk');
const Payment = require('../models/Payment');

// 1. GET CUSTOMER LEDGER (For Summary Cards)
router.get('/customer-ledger', async (req, res) => {
    try {
        const milkEntries = await Milk.find();
        const payments = await Payment.find();

        const ledger = {};

        milkEntries.forEach(entry => {
            if (!ledger[entry.customerName]) {
                ledger[entry.customerName] = { totalBill: 0, totalPaid: 0, due: 0 };
            }
            ledger[entry.customerName].totalBill += entry.total;
        });

        payments.forEach(pay => {
            if (!ledger[pay.customerName]) {
                ledger[pay.customerName] = { totalBill: 0, totalPaid: 0, due: 0 };
            }
            ledger[pay.customerName].totalPaid += pay.amount;
        });

        const customerList = Object.keys(ledger).map(name => ({
            name,
            totalBill: ledger[name].totalBill,
            totalPaid: ledger[name].totalPaid,
            due: ledger[name].totalBill - ledger[name].totalPaid
        }));

        res.json(customerList);
    } catch (error) {
        res.status(500).json({ error: "Error calculating ledger" });
    }
});

// 2. GET STATEMENT BY DATE RANGE (For PDF Report)
router.get('/statement', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        // Find Milk Entries
        const milkEntries = await Milk.find({
            date: { 
                $gte: new Date(startDate), 
                $lte: new Date(endDate + "T23:59:59") 
            }
        });

        // Find Payments
        const payments = await Payment.find({
            date: { 
                $gte: new Date(startDate), 
                $lte: new Date(endDate + "T23:59:59") 
            }
        });

        const statement = [];

        // Format Milk Entries (Send Liters & Rate Separately)
        milkEntries.forEach(entry => {
            statement.push({
                date: entry.date,
                customer: entry.customerName,
                type: 'Milk',
                liters: entry.liters, // <--- YE ADD KIYA HAI
                rate: entry.rate,     // <--- YE ADD KIYA HAI
                amount: entry.total,
                isCredit: false
            });
        });

        // Format Payments
        payments.forEach(pay => {
            statement.push({
                date: pay.date,
                customer: pay.customerName,
                type: 'Payment',
                liters: null,
                rate: null,
                amount: pay.amount,
                isCredit: true
            });
        });

        // Sort Oldest to Newest
        statement.sort((a, b) => new Date(a.date) - new Date(b.date));

        res.json(statement);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error generating statement" });
    }
});

module.exports = router;