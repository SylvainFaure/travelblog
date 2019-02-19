'use strict'
const env = process.env.NODE_ENV;

function error (err, req, res, next) {
  let error = env == 'development' ? error : {};
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: error
  });
  next();
}

module.exports = { error }
