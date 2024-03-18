const BaseResponse = require('../dto/base.response.js');
const User = require('../models/user.model.js');
const bcryptjs = require('bcryptjs');
const generateToken = require('../utils/generateToken.js');

const signup = async (req, res) => {
    const responseDto = new BaseResponse(res);
    try {
        
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return responseDto.sendFail('Password mismatch', 400);
        }

        const isUsernameExist = await User.exists({username: username});
        if (isUsernameExist) {
            return responseDto.sendFail('Username already exist', 400);
        }

        var user = new User({
            fullName: fullName,
            username: username,
            password: bcryptjs.hashSync(password, 8),
            gender: gender,
            profilePic: `https://avatar.iran.liara.run/username?username=${fullName}`
        });

        await user.save();

        user.password = null;

        return responseDto.sendSuccess({user, access_token: generateToken(user, res)});

    } catch (error) {
        return responseDto.sendFail(error, 500);
    }
}

const login = async (req, res) => {
    const responseDto = new BaseResponse(res);
    try {
        
        const { username, password } = req.body;

        const getUser = await User.findOne({username: username});
        if (!getUser) {
            return responseDto.sendFail('Username or Password wrong', 400);
        }

        const isPasswordIdentical = bcryptjs.compareSync(password, getUser.password);
        if (!isPasswordIdentical) {
            return responseDto.sendFail('Username or Password wrong', 400);
        }
        
        getUser.password = null;

        return responseDto.sendSuccess({user: getUser, access_token: generateToken(getUser, res) });

    } catch (error) {
        return responseDto.sendFail(error, 500);
    }
}

module.exports = {
    signup, login
}