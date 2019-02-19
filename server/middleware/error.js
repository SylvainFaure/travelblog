module.exports = function (err, req, res, next) {
  let error = process.env.NODE_ENV == 'development' ? err : {};
  //res.status(err.status || 500);
  /*res.render('error', {
    message: err.message,
    error: error
  });*/
  next();
}