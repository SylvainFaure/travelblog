'use strict';

const
  articlesRoute = require('./articles'),
  travelsRoute = require('./travels'),
  usersRoute = require('./users'),
  assetsRoute = require('./assets');


function init(server) {
  server.get('*', function (req, res, next) {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  });

  server.get('/', function (req, res) {
    res.redirect('/home');
  });
  
  server.use('/api/travels', travelsRoute);
  server.use('/api/articles', articlesRoute);
  server.use('/api/assets', assetsRoute);
  server.use('/api/users', usersRoute);
}

module.exports = {
  init
};
