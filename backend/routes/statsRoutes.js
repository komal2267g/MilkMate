const express = require('express');
const router = express.Router();
const Milk = require('../models/Milk');
const Payment = require('../models/Payment');

// 1. GET ALL CUSTOMERS SUMMARY (Purana Code + Sorted)
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
        })).sort((a, b) => b.due - a.due); // Sabse zyada udhaar waale upar

        res.json(customerList);
    } catch (error) {
        res.status(500).json({ error: "Error calculating ledger" });
    }
});

// 2. NEW: GET DETAILED HISTORY FOR ONE CUSTOMER (Khata Book)
router.get('/ledger/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const milk = await Milk.find({ customerName: name });
        const pays = await Payment.find({ customerName: name });

        const history = [
            ...milk.map(m => ({ ...m._doc, type: 'MILK' })),
            ...pays.map(p => ({ ...p._doc, type: 'PAYMENT' }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Newest first

        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Error fetching history" });
    }
});

// 3. STATEMENT BY DATE RANGE (Purana Code)
router.get('/statement', async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const milkEntries = await Milk.find({ date: { $gte: new Date(startDate), $lte: new Date(endDate + "T23:59:59") } });
        const payments = await Payment.find({ date: { $gte: new Date(startDate), $lte: new Date(endDate + "T23:59:59") } });

        const statement = [];
        milkEntries.forEach(entry => statement.push({ date: entry.date, customer: entry.customerName, type: 'Milk', liters: entry.liters, rate: entry.rate, amount: entry.total, isCredit: false }));
        payments.forEach(pay => statement.push({ date: pay.date, customer: pay.customerName, type: 'Payment', liters: null, rate: null, amount: pay.amount, isCredit: true }));
        
        statement.sort((a, b) => new Date(a.date) - new Date(b.date));
        res.json(statement);
    } catch (error) {
        res.status(500).json({ error: "Error" });
    }
});

module.exports = router;