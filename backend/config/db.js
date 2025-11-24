const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // REMOVED THE DEPRECATED OPTIONS
        await mongoose.connect('mongodb://127.0.0.1:27017/milkmate_db');
        console.log('✅ MongoDB Connected Successfully');
    } catch (err) {
        console.error('❌ MongoDB Connection Failed:', err.message);
        process.exit(1);
    }
};

module.exports = connectDB;