const express = require('express');
const app = express();

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
const upload = multer({ storage: storage })
const db = require('./db.js');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const path = require('path');
//const passport = require('passport-local');
//const flash = require('./middlewares/flash.js');
const sha = require('js-sha256').sha256;

/***** MODELS ******/
const User = require('./models/user');
const Travel = require('./models/travel');
const Article = require('./models/article');
const Asset = require('./models/asset');


//app.set('view engine', 'ejs');

/** MIDDLEWARE **/
app.use(webpackMiddleware(webpack(webpackConfig)));
app.use('/assets', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
  secret: 'npk',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use((req, res, next) => { //allow cross origin requests
	res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
	res.header("Access-Control-Allow-Origin", "http://localhost:8080");
	next();
})
//app.use(flash)

/** ROUTES **/


/*** GET ****/

app.get('/api/users', (req, res) => {
	User.getUsers(users => {
		/*if (err) 
			res.send(err)*/
		res.json(users)
	})
})

app.get('/api/travels', (req, res) => {
	Travel.getAll(travels => {
		/*if (err) 
			res.send(err)*/
		res.json(travels)
	})
})

app.get('/api/articles', (req, res) => {
	Article.getAll(allarticles => {
		/*if (err)
		res.send(err)*/
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
app.post('/api/users', (req, res) => {
	var user_username = req.body.user_username
	var user_password = sha.sha256(req.body.user_password)
	var user_email = req.body.user_email
	var user_id = req.body.user_id
	res.send('POST REQUEST')
})

app.post('/api/newtravel', (req, res) => {
	Travel.addTravel(req.body, results =>{
		res.json(results)
	})
})

app.post('/api/newarticle', (req, res) => {
	console.log(req.body)
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
		/*if (err) 
			res.send(err)*/
		res.json(travel)
	})
})

app.put('/api/update-article/:id', (req, res) => {
	Article.updateArticle(req.body, req.params.id, article => {
		/*if (err) 
			res.send(err)*/
		res.json(article)
	})
})

app.put('/api/update-asset/:id', (req, res) => {
	Asset.updateAsset(req.body, req.params.id, asset => {
		/*if (err) 
			res.send(err)*/
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
	res.sendFile(path.join(__dirname, '../public/js/views', 'index.html'))

})

app.listen(3000, () => {
  console.log('Listening on port 3000!')
})

/*app.post('/', (req, res) => {
	if (req.body.username === undefined || req.body.username === '' || req.body.password === undefined || req.body.password === '') {
		req.flash('error', "Tous les champs sont obligatoires")
		res.redirect('/')
	} else {
		let User = require('./models/user')
		let hashPass = sha.sha256(req.body.password)
		User.getUsers(function (data) {
			if (data.user_username === req.body.username && data.user_password === sha.sha256(req.body.password)) {
				res.render('../admin/views/index', {title: 'Carte de voyages'})
				req.session.auth = {user: req.body.username, pass: hashPass};
			} else if (data.user_username === req.body.username && data.user_password != sha.sha256(req.body.username)) {
				req.flash('error', "Le mot de passe est incorrect")
				res.redirect('/')extract-text-webpack-plugin
			} else {
				req.flash('error', "Cet utilisateur n'existe pas")
				res.redirect('/')
			}
		})
		
	}
})
*/


/*app.get('/', function (req, res) {
	db.connect();
	db.query('SELECT * FROM countries, articles, assets', function(err, rows, field){
		if (err) throw err;
		console.log(rows)
		res.end(JSON.stringify(rows))
	})
})*/

