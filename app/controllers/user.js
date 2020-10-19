const userService = require('../services/user');
const tokenService = require('../services/token');
const user = require('../models/user');
const { logger } = require('../middlewares/logging');
const functions = {
    login : async (req,res) =>{
            let userInDB = await userService.findUser(req.body.username, req.body.password);
            if(!userInDB)
                res.status(404).send('No such user found ');
            else{
                let token = tokenService.generateToken(userInDB);
                userInDB.jwt = token;
                await userInDB.save();
                res.status(200).send({
                    user : {
                        username : userInDB.username, 
                        name : userInDB.name, 
                        type: userInDB.type
                    },
                    token : token
                });
            }    
    },
    register : async(req,res) =>{
        let savedUser = await userService.saveUser(req.body);
        if(!savedUser)
            res.status(500).send('Error registering user');
        res.status(200).send({user : { id : savedUser._id, username : savedUser.username, name: savedUser.name }});    
    }
}

module.exports = functions;