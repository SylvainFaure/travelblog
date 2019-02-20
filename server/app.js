const express = require('express');
const subdomain = require('express-subdomain');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');

const upload = require('./config/storage');

const tokenMiddleware = require('./middleware/token');
const corsMiddleware = require('./middleware/cors');
const errorMiddleware = require('./middleware/error');

const articlesRouter = require('./routes/articles');
const travelsRouter = require('./routes/travels');
const usersRouter = require('./routes/users');

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

if (app.get("env") !== "development") {
  app.use(subdomain('/', express.static(path.join(__dirname, 'dist/public'))));
  app.use(subdomain('/admin', express.static(path.join(__dirname, 'dist/admin'))));
}


/***** MODELS ******/
const User = require('./models/user');
const Article = require('./models/article');
const Asset = require('./models/asset');

/** MIDDLEWARE **/
app.use(tokenMiddleware);
app.use(errorMiddleware);

if (app.get("env") === 'development') {
  app.use(corsMiddleware);
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

/*** GET ****/
app.use('/api/articles', articlesRouter);
app.use('/api/travels', travelsRouter);
app.use('/api/users', usersRouter);

app.get('/api/articles/published', (req, res) => {
  Article.getAll(true, allarticles => {
    res.json(allarticles)
  })
})

app.get('/api/assets', (req, res) => {
  Asset.getAll(allassets => {
    res.json(allassets)
  })
})

app.get('/api/travels/:id/articles', (req, res) => {
  Article.getAllByTravel(req.params.id, articles => {
    res.json(articles)
  })
})

app.get('/api/articles/:article', (req, res) => {
  Article.getArticle(false, req.params.article, article => {
    res.json(article)
  })
})
app.get('/api/articles/published/:article', (req, res) => {
  Article.getArticle(true, req.params.article, article => {
    res.json(article)
  })
})

/*** POST ***/
app.post('/api/articles/publish/:id', (req, res) => {
  Article.publishArticle(req.body.article, req.params.id, results => {
    res.json(results)
  })
})

app.post('/api/assets', upload.any('file'), (req, res, next) => {
  Asset.uploadAssets(req.files, req.body.infos, result => {
    res.status(200).json(result);
  })
})

// TODO : change post in delete (was there any problem??)
app.post('/api/assets/delete', (req, res) => {
  Asset.deleteAssets(req.body.ids, req.body.names, results => {
    res.status(200).json(results)
  })
})
/*** UPDATE ***/
app.put('/api/articles/:id', (req, res) => {
  Article.updateArticle(req.body, req.params.id, article => {
    res.json(article)
  })
})

app.put('/api/assets/:id', (req, res) => {
  Asset.updateAsset(req.body, req.params.id, asset => {
    res.json(asset)
  })
})

/*** DELETE ***/
app.delete('/api/articles/:id', (req, res) => {
  Article.deleteArticle(req.params.id, result => {
    res.send(result)
  })

})

app.delete('/api/articles/unpublish/:id', (req, res) => {
  Article.unpublishArticle(req.params.id, result => {
    res.send(result)
  })

})


/*** ANGULAR ONE PAGE APP ***/
app.get('*', (req, res) => {
  var firstIndex = req.get('host').indexOf('.');
  var subdomain = req.get('host').substr(0, firstIndex).toLowerCase();
  if (subdomain === '' && req.url.indexOf('.') === -1 && req.url.indexOf('json') == -1) {
    console.log('Public: %s', req.url)
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  } else if (subdomain === 'admin' && req.url.indexOf('.') === -1 && req.url.indexOf('json') == -1){
    console.log('Admin: %s', req.url)
    res.sendFile(path.join(__dirname, '../admin/js', 'index.html'));
  } else {
    console.log('Not found: %s', req.url)
    res.sendFile(path.join(__dirname, '../', req.url));
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
