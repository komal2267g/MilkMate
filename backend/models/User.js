const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, unique: true, sparse: true },
    email: { type: String, unique: true, sparse: true },
    password: { type: String },
    googleId: { type: String },
    bio: { type: String, default: "Dairy Farm Owner" } // <--- ADDED THIS
});

module.exports = mongoose.model('User', UserSchema);