module.exports = function (req, res, next) {
  const token = req.headers['x-access-token'];
  
  let shouldVerifyToken = true;
  if (
      (req.method == 'GET' && req.url.indexOf('users') == -1) || // all GET excepts for users
      (req.method == 'POST' && req.originalUrl.indexOf('users/request') !== -1 && req.body.type == 'request') || // first user request
      (req.method == 'POST' && req.originalUrl.indexOf('users/signin') !== -1) || // user not yet authenticated
      (req.method == 'POST' && req.originalUrl.indexOf('users/signup') !== -1) // user is not fully registered
     ) {
    shouldVerifyToken = false;
  }
  
  if (shouldVerifyToken) {
    if (!token) {
      res.status(403).json({
        error: 'Not authorized',
        message: 'You should be logged and a superadmin to make this request'
      })
    }
    // TODO: restrict confirm and refuse request to superadmin
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
