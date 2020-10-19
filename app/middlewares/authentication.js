const passport = require("passport");
const { SESSION_EXPIRED, UNAUTHORISED } = require('../config/constants')
const { TYPES } = require('../config/constants');
const { logger } = require("./logging");

const authMiddleware = (req, res, next) => {
        passport.authenticate("jwt", { session: false }, (err, user, info) => {
            if (err || !user) {
                res.status(401).send({
                    message: info ? info.message : SESSION_EXPIRED
                });
                logger.error(SESSION_EXPIRED)
            }
            else {
                req.user = user;
                next();
            }
        })(req, res);
}

const isManager = (req, res, next) => {
    if (req.user.type == TYPES.PROJECT_MANAGER || req.user.type == 'manager') {
        next();
    }
    else {
        res.status(401).send(UNAUTHORISED);
    }
}


module.exports = { authMiddleware, isManager }