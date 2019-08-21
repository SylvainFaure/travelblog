module.exports = function (err, req, res, next) {
  console.log('ERROR MIDDLEWARE', err, err.type)
  let error = process.env.NODE_ENV == 'development' ? err : {};
  const fatal = !!error.fatal
  let errorObj = {
    type: error.type || "ServerError",
    status: error.status || 500,
    message: error.message || 'Something went really wrong dude',
    error: error
  }
  switch (error.type) {
    case 'DatabaseError':
      errorObj = {
        status: error.status || 500,
        message: error.message || 'The data could not be saved / removed correctly from the database',
        error: error
      }
      break;
    case 'ValidationError': 
      errorObj = {
        status: error.status || 403,
        message: error.message || 'Ops! It seems that you don\'t pass valid data',
        error: error
      }
    case 'AuthorizationError': 
      errorObj = {
        status: error.status || 403,
        message: error.message || 'It seems that you don\'t have the permission to do what you do! Be careful man!',
        error: error
      }
  }
  res.status(errorObj.status);
  res.json(errorObj);
  if (!fatal) {
    next();
  } 
}