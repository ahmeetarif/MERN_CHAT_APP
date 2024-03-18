const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    gender: {
        type: String,
        required: false,
        enum: ['male', 'female']
    },
    profilePic: {
        type: String,
        default: ''
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;