const mongoose = require('mongoose');

const conversationSchema = mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages',
            default: []
        }
    ]
}, { timestamps: true });

const Conversations = mongoose.model("Conversations", conversationSchema);

module.exports = Conversations;