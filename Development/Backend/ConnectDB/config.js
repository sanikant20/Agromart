const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/agromart"


mongoose.connect(uri);
const db = mongoose.connection;

db.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
});

db.once('open', async()=>{
    try {
        console.log("Connected to MongoDB")
    } catch (error) {
        console.error("Error in conntecting to database.")
    }
});