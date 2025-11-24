const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Milk = require('../models/Milk'); 

// 1. ADD PAYMENT API
router.post('/add-payment', async (req, res) => {
    try {
        const newPayment = new Payment(req.body);
        await newPayment.save();
        res.json({ message: "Payment Recorded Successfully! 💰" });
    } catch (error) {
        res.status(500).json({ error: "Failed to record payment" });
    }
});

// 2. GET RECENT TRANSACTIONS API
router.get('/payments', async (req, res) => {
    try {
        const payments = await Payment.find().sort({ date: -1 }); 
        res.json(payments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch payments" });
    }
});

// 3. GET CUSTOMER NAMES (Helper for Dropdown)
router.get('/customer-list', async (req, res) => {
    try {
        const customers = await Milk.distinct("customerName");
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch customers" });
    }
});

module.exports = router;