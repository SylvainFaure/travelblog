const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

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
app.use('/', express.static('admin'));

if (app.get("env") === 'development') {
  /**WEBPACK */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackConfig = require('../webpack.config.js');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

/** MIDDLEWARES **/
if (app.get("env") === 'development') {
  app.use(corsMiddleware);
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(tokenMiddleware);

/*** ROUTES ****/
app.use('/api/articles', articlesRouter);
app.use('/api/travels', travelsRouter);
app.use('/api/users', usersRouter);
app.use('/api/assets', assetsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/anecdotes', anecdotesRouter);
app.use('/api/categories', categoriesRouter);


app.use(errorMiddleware);

/*** ANGULAR ONE PAGE APP ***/
app.get('*', (req, res, next) => {
  if (req.url.indexOf('.') === -1 && req.url.indexOf('json') == -1) {
    console.log('SPA: %s', req.url)
    const indexPath = app.get("env") === 'development' ? '../admin/js' : '../admin/dist';
    res.sendFile(path.join(__dirname, indexPath, 'index.html'));
  } else {
    console.log('Static: %s', req.url)
    res.sendFile(path.join(__dirname, '../', req.url));
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})