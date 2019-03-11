const User = require('../models/user');

module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'];
  
  let shouldVerifyToken = true;
  if (
      (req.method == 'OPTIONS') ||
      (req.method == 'GET' && req.url.indexOf('users') == -1) || // all GET excepts for users
      (req.method == 'POST' && req.originalUrl.indexOf('users/request') !== -1 && req.body.type == 'request') || // first user request
      (req.method == 'POST' || req.method == 'OPTIONS' && req.originalUrl.indexOf('users/signin') !== -1) || // user not yet authenticated
      (req.method == 'POST' && req.originalUrl.indexOf('users/signup') !== -1) // user is not fully registered
     ) {
    shouldVerifyToken = false;
  }
  
  if (shouldVerifyToken && !token) {
    return res.status(403).json({
      error: 'Not authorized',
      message: 'You should be logged to make this request'
    })
  } 
  if (shouldVerifyToken && token) {
    User.verifyToken(token, response => {
      if (response.name == "JsonWebTokenError") {
        return res.status(403).json({
          error: response.message,
          message: "You don't provide right user infos"
        })
      } else if (response.name == "TokenExpiredError") {
        return res.status(403).json({
          error: response.message,
          message: "You have to login again"
        })
      } else {
        next()
      }
    })
  } else {
    next()
  }
}
