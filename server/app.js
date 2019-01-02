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
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

/*** GET ****/

app.get('/api/users', (req, res) => {
	User.getUsers(users => {
		/*if (err) 
			res.send(err)*/
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

/* USER AND AUTHENTICATION */
app.post('api/senduserrequest', (req, res) {
    User.sendRequest(req.body.email, result => {
      res.json(result)
    })
})

app.post('/api/newuser', (req, res){
    const newUser = req.body.email
    /* Check if already in db */
    const userAlreadyRegistered = User.getUsers().filter(u => {
	 return u.email == newUser
   }) 
   if (userAlreadyRegistered) {
      res.json({
      	error: 'Already registered'
      })
   } else {
     User.postUser(newUser, result => {
     	res.status(200).json(result);
     })
   }
})

app.post('/api/signup', (req, res) => {
   /* Check if user is registered in db */
   const user = User.getUsers().filter(u => {
	 return u.email == req.body.email
   })
   if (user) {
     bcrypt.hash(req.body.password, 12, (err, hash) => {
      if(err) {
         return res.status(500).json({
            error: 'There was an error during the creation of the password'
         });
      } else {
      	/* Save the encrypted pwd in db */
	User.saveUserPwd(user, hash, result => {
	    res.status(200).json(result);
	})
      }
     }
   /* If not redirect to send request to admin */
   } else {
      res.status(500).json({
         error: 'No such user in database'
      });
   }
});

app.post('/api/signin', (req, res) => {
   const user = User.getUsers().filter(user => {
	 return user.email == req.body.email
   })
   if (user) {
     bcrypt.compare(req.body.password, user.password, (err, result) => {
         if(err) {
	    return res.status(401).json({
	       failed: 'Unauthorized Access'
	    });
         }
         if(result) {
	    const JWTToken = jwt.sign({
		email: user.email,
		_id: user._id
	      },
	      'nolandskid',
	       {
		 expiresIn: '2h'
	    });
            return res.status(200).json({
               success: 'Success',
	       token: JWTToken
            });
         }
         return res.status(401).json({
            failed: 'Unauthorized Access'
         });
      });
   } else {
      res.status(500).json({
         error: 'No such user in database'
      });
   }
});

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
