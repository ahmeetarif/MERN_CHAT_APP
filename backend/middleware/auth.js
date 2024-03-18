const jwt = require('jsonwebtoken');
const BaseResponse = require('../dto/base.response');

const config = process.env;

module.exports = (req, res, next) => {
    let token = req.headers["authorization"];

    const responseDto = new BaseResponse(res);

    if (!token) {
        return responseDto.sendFail('A token is required for authentication!', 401);
    }

    try {
        token = token.replace('Bearer ', '');
        const decoded = jwt.verify(token, config.APP_JWT_SECRET);
        req.user = decoded;
    } catch (err) {
        return responseDto.sendFail('Invalid Token!', 403);
    }
    return next();
};