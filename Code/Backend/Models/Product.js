const mongoose = require("mongoose");

const productImageSchema = new mongoose.Schema(
    {
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
        },
        season: {
            type: String,
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productImageSchema);
