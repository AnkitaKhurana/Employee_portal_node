let passportJWT = require("passport-jwt");
let { logger } = require('./logging');
let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let User = require('../models/user');
let jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.AUTH_KEY_SECRET;

let strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  let user = null;
  try {
    user = await User.findOne({ username: jwt_payload.username, jwt: { $ne: null } });
    next(null, user);
  }
  catch {
    next(null, false);
  }
});

module.exports = strategy;