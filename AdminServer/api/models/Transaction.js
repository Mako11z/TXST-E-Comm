const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    items: [{
        id: String,
        name: String,
        price: Number,
        quantity: Number,
        total: Number
    }],
    userName: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Transaction', transactionSchema);