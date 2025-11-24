const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Import DB connection

const app = express();

// 1. Connect to Database
connectDB();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Define Routes
app.use('/api', require('./routes/userRoutes')); // Login/Signup
app.use('/api', require('./routes/milkRoutes')); // Milk Entries
app.use('/api', require('./routes/statsRoutes')); // <--- ADD THIS

// ... existing routes

// DANGER: RESET ALL DATA API
app.delete('/api/reset-all', async (req, res) => {
    const Milk = require('./models/Milk');
    const Payment = require('./models/Payment');
    // const User = require('./models/User'); // Optional: Don't delete user login

    try {
        await Milk.deleteMany({});    // Delete all milk entries
        await Payment.deleteMany({}); // Delete all payments
        res.json({ message: "All Data Deleted" });
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});

// ... app.listen(...)

// 4. Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});