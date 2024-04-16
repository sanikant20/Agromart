const mongoose = require('mongoose');

const ShippingSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postalCode: {
            type: String,
        },
        address: {
            type: String,
            required: true
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Shipping", ShippingSchema);
