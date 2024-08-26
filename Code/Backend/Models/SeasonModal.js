const mongoose = require("mongoose");

const SeasonSchema = new mongoose.Schema(
    {
        seasonName: {
            type: String,
            required: true
        },
        startMonth: {
            type: Number,
            required: true
        },
        endMonth: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Season", SeasonSchema);
