const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        userName:
        {
            type: String,
            required: true
        },
        productID: {
            type: String,
            required: true
        },
        productName: {
            type: String,
        },
        rate: {
            type: Number,
        },
        review: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
