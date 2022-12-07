'use strict'
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const serverless = require('serverless-http');

/** MIDDLEWARES **/
const corsMiddleware = require('./middleware/cors');
const bodyParser = require('body-parser');
const tokenMiddleware = require('./middleware/token');
const errorMiddleware = require('./middleware/error');

/** ROUTES **/
const articlesRouter = require('./routes/articles');
const travelsRouter = require('./routes/travels');
const usersRouter = require('./routes/users');
const assetsRouter = require('./routes/assets');
const anecdotesRouter = require('./routes/anecdotes');
const categoriesRouter = require('./routes/categories');
const settingsRouter = require('./routes/settings');

/** STATIC FILES **/
// app.use('/', express.static('admin'));

if (app.get("env") === 'development') {
  /**WEBPACK */
  /* const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack.config.js');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler)); */
}

/** MIDDLEWARES **/
if (app.get("env") === 'development') {
  app.use(corsMiddleware);
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(tokenMiddleware);

/*** ROUTES ****/
const routerBasePath = `/.netlify/functions/app`


app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  })
})

app.use(`${routerBasePath}/api/articles`, articlesRouter);
app.use(`${routerBasePath}/api/travels`, travelsRouter);
app.use(`${routerBasePath}/api/users`, usersRouter);
app.use(`${routerBasePath}/api/assets`, assetsRouter);
app.use(`${routerBasePath}/api/settings`, settingsRouter);
app.use(`${routerBasePath}/api/anecdotes`, anecdotesRouter);
app.use(`${routerBasePath}/api/categories`, categoriesRouter);

app.use(errorMiddleware);

/*** NUXT ONE PAGE APP ***/
app.get('*', (req, res, next) => {
  const queryStringRegex = /\?([^&=]+)=([^&=]+)(?:&([^&=]+)=([^&=]+))*$/gm
  if ((req.url.indexOf('.') === -1 && req.url.indexOf('json') == -1) || req.url.match(queryStringRegex)) {
    console.log('SPA: %s', req.url)
    const indexPath = '../admin/';
    res.sendFile(path.join(__dirname, indexPath, 'index.html'));
  } else {
    console.log('Static: %s', req.url)
    res.sendFile(path.join(__dirname, '../', req.url));
  }
});

// app.listen(port, () => {
//   console.log(`Listening on port ${port}!`)
// })

module.exports = app
module.exports.handler = serverless(app)