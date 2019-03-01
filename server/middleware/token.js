module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'];
  
  let shouldVerifyToken = true;
  if (
      (req.method == 'GET' && req.url.indexOf('users') == -1) || // all GET excepts for users
      (req.method == 'POST' && req.url.indexOf('users/request') !== -1 && req.body.type == 'request') || // first user request
      (req.method == 'POST' && req.url.indexOf('signin') !== -1) || // user not yet authenticated
      (req.method == 'POST' && req.url.indexOf('signup') !== -1) // user is not fully registered
     ) {
    shouldVerifyToken = false;
  }
  
  if (shouldVerifyToken && token) {
    User.verifyToken(token, response => {
      if (response.name == "JsonWebTokenError") {
        res.status(401).json({
          error: response.message,
          message: "You don't provide right user infos"
        })
      } else if (response.name == "TokenExpiredError") {
        res.status(401).json({
          error: response.message,
          message: "You have to login again"
        })
      } else {
        next();
      }
    })
  } else {
    next();
  }
}
