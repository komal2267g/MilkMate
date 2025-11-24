const express = require('express');
const router = express.Router();
const User = require('../models/User');

// SIGNUP ROUTE
router.post('/signup', async (req, res) => {
    try {
        const { fullName, phone, password } = req.body;
        // Check if user exists
        const userExists = await User.findOne({ phone });
        if (userExists) return res.status(400).json({ error: "User already exists" });

        // Create new user
        const newUser = new User({ fullName, phone, password });
        await newUser.save();
        res.json({ message: "Account Created Successfully! ✅" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// LOGIN ROUTE
router.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone, password });

        if (user) {
            res.json({ message: "Login Successful", user });
        } else {
            res.status(400).json({ error: "Invalid Phone or Password" });
        }
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// UPDATE PROFILE API
router.put('/update-profile', async (req, res) => {
    try {
        const { _id, fullName, phone, bio } = req.body;

        // Find User by ID and Update
        const updatedUser = await User.findByIdAndUpdate(
            _id, 
            { fullName, phone, bio }, 
            { new: true } // Return the updated document
        );

        if (updatedUser) {
            res.json({ message: "Profile Updated! ✅", user: updatedUser });
        } else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).json({ error: "Failed to update profile" });
    }
});

module.exports = router;