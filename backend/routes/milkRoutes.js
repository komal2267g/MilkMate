const express = require('express');
const router = express.Router();
const Milk = require('../models/Milk');

// ADD MILK ENTRY
router.post('/add-entry', async (req, res) => {
    try {
        const newEntry = new Milk(req.body);
        await newEntry.save();
        res.json({ message: "Milk Entry Saved! 🥛" });
    } catch (error) {
        res.status(500).json({ error: "Failed to save entry" });
    }
});

// GET ALL ENTRIES (For Dashboard)
router.get('/entries', async (req, res) => {
    try {
        const entries = await Milk.find().sort({ date: -1 });
        res.json(entries);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch entries" });
    }
});

module.exports = router;