const mongoose = require('mongoose');

const MilkSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    shift: { type: String, required: true }, // Morning/Evening
    liters: { type: Number, required: true },
    fat: { type: Number },
    rate: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Milk', MilkSchema);