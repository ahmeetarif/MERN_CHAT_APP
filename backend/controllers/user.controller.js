const BaseResponse = require('../dto/base.response.js');
const User = require('../models/user.model.js');

const getUsers = async (req, res) => {
    var responseDto = new BaseResponse(res);
    try {
        
        let users = await User.find({_id : {$ne: req.user._id}}).select('-password');

        return responseDto.sendSuccess(users);

    } catch (error) {
        return responseDto.sendFail(error, 500);
    }
}

module.exports = {
    getUsers
}