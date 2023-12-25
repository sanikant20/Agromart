const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
        type: String,
    },
    image: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model("Product", productSchema);
