const mongoose = require('mongoose');
require('dotenv').config(); // Load env variables

const connectDB = async () => {
    try {
        // Use the Environment Variable from Render/Docker.
        // Fallback to localhost ONLY if the variable is missing.
        const db = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/milkmate_db';
        
        await mongoose.connect(db);
        
        console.log(`✅ MongoDB Connected Successfully to: ${db.includes('mongodb+srv') ? 'Cloud Atlas' : 'Localhost'}`);
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;