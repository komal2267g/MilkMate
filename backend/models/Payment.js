const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    mode: { type: String, default: 'Cash' } // Cash or UPI
});

module.exports = mongoose.model('Payment', PaymentSchema);