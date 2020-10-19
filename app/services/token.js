const jwt = require('jsonwebtoken')

const functions = {
    generateToken: (user) =>{
        let token = jwt.sign({
            id: user.id,
            username: user.username,
            type: user.type
        }, process.env.AUTH_KEY_SECRET);
        return token;
    }
}

module.exports = functions;