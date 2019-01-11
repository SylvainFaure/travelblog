const app = require('express')();

const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config.js');

const multer  = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, 'public/assets/img')
	},
	filename: (req, file, cb) => {
	  var timestamp = new Date().getTime()
	  cb(null, timestamp + '_' + file.originalname)
	}
})

const errorHandler = require("./error-handler.js")

const upload = multer({ storage: storage })
const bodyParser = require('body-parser');
const path = require('path');

/***** MODELS ******/
const User = require('./models/user');
const Travel = require('./models/travel');
const Article = require('./models/article');
const Asset = require('./models/asset');

/** MIDDLEWARE **/
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use('/assets', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => { //allow cross origin requests
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	next();
})

app.user(errorHandler());

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
    User.sendRequest(req.body.email, result => {
      res.json(result)
    })
})

app.post('/api/newuser', (req, res) => {
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


/*** ANGULAR ONE PAGE APP ***/
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../#!/public/js/views', 'index.html'))

})

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})
