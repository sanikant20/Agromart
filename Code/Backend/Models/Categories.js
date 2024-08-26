const mongoose = require("mongoose");

const CategoriesSchema = new mongoose.Schema(
    {
        categoryName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Categories", CategoriesSchema);
