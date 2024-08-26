const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    products: [{
        product_id: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        weight: {
            type: String,
            required: true
        },
        description: {
            type: String
        }
    }],
    orderStatus: {
        type: String,
        enum: ['process', 'waiting payment', 'confirm', 'shipped', 'delivered'],
        default: 'process'
    },
    payment: {
        status: {
            type: String,
            enum: ['notPaid', 'Paid'],
            default: "notPaid"
        },
        paymentDate: {
            type: Date,
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
