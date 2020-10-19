const { logger } = require('../middlewares/logging');
const User = require('../models/user');

const functions = {
    findUserById: async(id)=>{
        try{
            let user =  await User.findOne({ _id: id});
            return user;
        }
        catch{
            return null;
        }
    },
    findUser: async (username, password) =>{
        try{
            let user =  await User.findOne({ username: username, password: password });
            logger.info('User Found',user.toObject());
            return user;
        }
        catch{
            return null;
        }
    },
    saveUser: async(userDetails) =>{
        try{
            let newUser = await User.create(userDetails);
            logger.info('Saved user ', newUser.toObject());
            return newUser.toObject();
        }
        catch (err){
            logger.error('Error saving user : ', err)
            return null;
        }
        
    }
}

module.exports = functions;