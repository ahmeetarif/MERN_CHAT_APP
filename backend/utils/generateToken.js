const jwt = require("jsonwebtoken");

const generateToken = (user) => {

    return jwt.sign({user}, process.env.APP_JWT_SECRET, {
        expiresIn: "15d"
    });
}

module.exports = generateToken;