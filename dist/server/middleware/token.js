const User = require('../models/user');

module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'];
  
  let shouldVerifyToken = true;
  if (
      (req.method == 'OPTIONS') ||
      (req.method == 'GET' && !req.url.includes('users')) || // all GET excepts for users
      (req.method == 'GET' && req.originalUrl.includes('users/email')) || // GET users by email for first pwd change
      (req.method == 'POST' && req.originalUrl.includes('users/request') && req.body.type == 'request') || // first user request
      (req.method == 'POST' || req.method == 'OPTIONS' && req.originalUrl.includes('users/signin')) || // user not yet authenticated
      (req.method == 'POST' && req.originalUrl.includes('users/signup')) // user is not fully registered
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
