let express = require('express')
let router = express.Router();
let userController = require('../controllers/user');
let { loginValidator, registerValidator } = require('../middlewares/validations');

// Login user 
router.post('/login',[loginValidator],userController.login);

// Register new user (Employee||Manager)
router.post('/register',[registerValidator],userController.register);

module.exports = router