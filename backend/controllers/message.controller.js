const BaseResponse = require('../dto/base.response.js');
const Conversations = require('../models/conversation.model.js');
const Messages = require('../models/message.model.js');

const sendMessage = async (req, res) => {
    const responseDto = new BaseResponse(res);
    try {

        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        
        let conversation = await Conversations.findOne({
            participants: {$all : [senderId, receiverId]}
        });

        if (!conversation) {
            conversation = await Conversations.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = new Messages({
            senderId, receiverId, message
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }

        await Promise.all([message.save(), conversation.save()]);

        return responseDto.sendSuccess(newMessage);

    } catch (error) {
        return responseDto.sendFail(error, 500);
    }
}

const getMessages = async (req, res) => {
    const responseDto = new BaseResponse(res);
    try {
        
        const {id: userId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversations.findOne({
            participants: { $all: [senderId, userId] }
        }).populate('messages');

        return responseDto.sendSuccess(conversation.messages);
    } catch (error) {
        return responseDto.sendFail(error, 500);
    }
}

module.exports = {
    sendMessage, getMessages
}