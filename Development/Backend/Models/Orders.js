const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true 
    },
    orderData: {
        type: Array, 
        required: true
    },
});

module.exports = mongoose.model("Order", OrderSchema);
