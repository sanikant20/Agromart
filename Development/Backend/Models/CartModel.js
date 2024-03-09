const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
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
        type: String,
    },
    image: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("Cart", CartSchema);