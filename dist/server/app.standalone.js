
const app = require('express')()
const port = process.env.PORT || 3001;
const path = require('path');
const { Nuxt, Builder } = require('nuxt')
const config = require('../nuxt.config.js')
const nuxt = new Nuxt(config)

// if (app.get("env") === 'development') {
//   /**WEBPACK */
//   const webpack = require('webpack');
//   const webpackDevMiddleware = require('webpack-dev-middleware');
//   const webpackConfig = require('../webpack.config.js');
//   const webpackHotMiddleware = require('webpack-hot-middleware');

//   const compiler = webpack(webpackConfig);
//   app.use(webpackDevMiddleware(compiler, {
//     publicPath: webpackConfig.output.publicPath
//   }));
//   app.use(webpackHotMiddleware(compiler));

//   /**PATH */
//   app.use(subdomain('/', express.static(path.join(__dirname, 'public'))));
//   app.use(subdomain('/admin', express.static(path.join(__dirname, 'admin'))));
// }

// Build only in dev mode
if (config.dev) {
 const builder = new Builder(nuxt)
 builder.build()
} 
app.use(nuxt.render);

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})