'use strict'

function token (req, res, next) {
  const token = req.headers['x-access-token'];
  if (req.url.indexOf('users') == -1 && token) {
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

module.exports = { token }
