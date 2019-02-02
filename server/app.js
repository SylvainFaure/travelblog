const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const upload = require('./config/storage');

var viewPath;

if (app.get("env") === 'development') {
	/**WEBPACK */
	const webpack = require('webpack');
	const webpackMiddleware = require('webpack-dev-middleware');
	const webpackConfig = require('../webpack.config.js');
	const webpackHotMiddleware = require('webpack-hot-middleware');

	const compiler = webpack(webpackConfig);
	app.use(webpackMiddleware(compiler, {}));
	app.use(webpackHotMiddleware(compiler));

	/**PATH */
	viewPath = '../#!/public/js';
	app.use('/assets', express.static('public'))
}

if (app.get("env") !== "development") {
	viewPath = "../dist";
	app.use('/assets', express.static('dist'))
}


const bodyParser = require('body-parser');
const path = require('path');

/***** MODELS ******/
const User = require('./models/user');
const Travel = require('./models/travel');
const Article = require('./models/article');
const Asset = require('./models/asset');

/** MIDDLEWARE **/

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => { //check x-access-token header
	const token = req.headers['x-access-token'];
	if (req.url.indexOf('user') == -1 && token) {
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
})

if (app.get("env") === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });
  app.use((req, res, next) => { //allow cross origin requests
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	next();
  })
}
if (app.get("env") === "production") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
  });
}

/*** GET ****/

app.get('/api/users', (req, res) => {
	User.getUsers(users => {
		res.json(users)
	})
})

app.get('/api/user/:user', (req, res) => {
       User.getUser(req.params.email, user => {
		res.json(user)
	})
})

app.get('/api/travels', (req, res) => {
	Travel.getAll(travels => {
		res.json(travels)
	})
})

app.get('/api/articles', (req, res) => {
	Article.getAll(allarticles => {
		res.json(allarticles)
	})
})

app.get('/api/assets', (req, res) => {
	Asset.getAll(allassets => {
		res.json(allassets)
	})
})

app.get('/api/travel/:travel', (req, res) => {
	Travel.getTravel(req.params.travel, travel => {
		res.json(travel)
	})
})

app.get('/api/travel/:id/articles', (req, res) => {
	Article.getAllByTravel(req.params.id, articles => {
		res.json(articles)
	})
})

app.get('/api/article/:article', (req, res) => {
	Article.getArticle(req.params.article, article => {
		res.json(article) 
	})
})



/*** POST ***/

/* USER AND AUTHENTICATION */
app.post('/api/user/sendrequest', (req, res) => {
	User.sendRequest(req.body.email, req.body.role, result => {
		res.json(result)
	})
})

app.post('/api/user/confirmrequest', (req, res) => {
	User.confirmRequest(req.body.mail, req.body.role, result => {
		res.json(result)
	})
})

app.post('/api/user/refuserequest', (req, res) => {
	User.refuseRequest(req.body.mail, req.body.role, result => {
		res.json(result)
	})
})

app.post('/api/user/newuser', (req, res) => {
	User.createNewUser(req.body.user, (result) => {
		res.json(result)
	})
})

app.post('/api/user/signup', (req, res) => {
   User.signup(req.body.email, req.body.password, (result) => {
   	res.json(result)
   })
   
});

app.post('/api/user/signin', (req, res) => {
   User.signin(req.body.email, req.body.password, (result) => {
   	res.json(result)
   }) 
  
   
});

app.post('/api/user/verifytoken', (req, res) => {
	User.verifyToken(req.body.token, result => {
		res.json(result)
	})
})

app.post('/api/newtravel', (req, res) => {
	Travel.addTravel(req.body, results =>{
		res.json(results)
	})
})

app.post('/api/newarticle', (req, res) => {
	Article.postArticle(req.body, results => {
		res.json(results)
	})
})

app.post('/api/article/publish/:id', (req, res) => {
	Article.publishArticle(req.body.article, req.params.id, results => {
		res.json(results)
	})
})


app.post('/api/newasset', upload.any('file'), (req, res, next) => {
	Asset.uploadAssets(req.files, req.body.infos, result => {
		res.status(200).json(result);
	})
})

app.post('/api/delete-assets', (req, res) => {
	Asset.deleteAssets(req.body.ids, req.body.names, results => {
		res.status(200).json(results)
	})
})
/*** UPDATE ***/
app.put('/api/update-travel/:id', (req, res) => {
	Travel.updateTravel(req.body, req.params.id, travel => {
		res.json(travel)
	})
})

app.put('/api/update-article/:id', (req, res) => {
	Article.updateArticle(req.body, req.params.id, article => {
		res.json(article)
	})
})

app.put('/api/update-asset/:id', (req, res) => {
	Asset.updateAsset(req.body, req.params.id, asset => {
		res.json(asset)
	})
})

/*** DELETE ***/
app.delete('/api/delete-travel/:id', (req, res) => {
	Travel.deleteTravel(req.params.id, result => {
		res.send(result)
	})
})

app.delete('/api/delete-article/:id', (req, res) => {
	Article.deleteArticle(req.params.id, result => {
		res.send(result)
	})
	
})

app.delete('/api/article/unpublish/:id', (req, res) => {
	Article.unpublishArticle(req.params.id, result => {
		res.send(result)
	})
	
})


/*** ANGULAR ONE PAGE APP ***/
if (app.get("env") == "development") {
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, viewPath, 'index.html'))
	})
}
if (app.get("env") != "development") {
	app.get('*', function(req, res) {
    res.sendfile('index.html', {root: "../dist" })
});
}

app.listen(port, () => {
  console.log(`Listening on port ${port}!`)
})
