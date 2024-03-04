const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for the new user registration
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'admin', 'user', 'User'] // Allow only two role option
    },
    location: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    userImage:{
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model('user', UserSchema);
