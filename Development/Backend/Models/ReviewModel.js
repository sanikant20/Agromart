const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            require: true
        },
        userName:
        {
            type: String,
            require: true
        },
        productID: {
            type: String,
            required: true
        },
        rate: {
            type: Number,
        },
        review: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
