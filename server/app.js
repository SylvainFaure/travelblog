const express = require('express');
const subdomain = require('express-subdomain');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const nuxt = new Nuxt(config)

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

  /**PATH */
  app.use(subdomain('/', express.static(path.join(__dirname, 'public'))));
  app.use(subdomain('/admin', express.static(path.join(__dirname, 'admin'))));
}

/* if (app.get("env") !== "development") {
  app.use(subdomain('/', express.static(path.join(__dirname, 'dist/public'))));
  app.use(subdomain('/admin', express.static(path.join(__dirname, 'dist/admin'))));
} */

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

app.use(errorMiddleware);
/*** ANGULAR ONE PAGE APP ***/
app.get('*', (req, res, next) => {
  var firstIndex = req.get('host').indexOf('.');
  var subdomain = req.get('host').substr(0, firstIndex).toLowerCase();
  if (subdomain === '' || subdomain === 'infinite-plateau-63225' && req.url.indexOf('.') === -1 && req.url.indexOf('json') == -1) {
    console.log('Public: %s', req.url)
    // res.sendFile(path.join(__dirname, '../public', 'index.html'));
    next()
  } else if (subdomain.indexOf('admin') !== -1 && req.url.indexOf('.') === -1 && req.url.indexOf('json') == -1){
    console.log('Admin: %s', req.url)
    res.sendFile(path.join(__dirname, '../admin/js', 'index.html'));
  } else {
    console.log('Not found: %s', req.url)
    res.sendFile(path.join(__dirname, '../', req.url));
  }
});

// Build only in dev mode
if (config.dev) {
 const builder = new Builder(nuxt)
 builder.build()
} 
app.use(nuxt.render);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})