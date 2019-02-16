const db = require('../db.js');
const mail = require ('../mail.js');
const nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User {
	static getUsers(cb) {
		db.query('SELECT * FROM users', function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows);
			var users = JSON.parse(records);
			cb(users)
		})
	}
	
	static getUser(email, cb) {
		db.query('SELECT * FROM users where user_email = ?', [email], function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows[0]);
			var user = JSON.parse(records);
			cb(user)
		})
	}
	
	static createNewUser(user, cb) {
	  
	  this.getUsers(users => {
		const userAlreadyRegistered = users.filter(u => {
			return u.email == user.email
		}) 
		if (userAlreadyRegistered.length) {
			res.json({
				error: 'Already registered'
			})
		} else {
			User.postUser(user, result => {
				res.status(200).json(result);
			})
		}
	})
	}
	
	static signup(email, password, cb) {
		this.getUsers(users => {
		 	let user = users.filter(u => {
				return u.user_email == email
			})
			if (user) {
				user = user[0];
				bcrypt.hash(password, 12, (err, hash) => {
				 if (err) {
					 return JSON.stringify({
							status: 500,
					 		error: 'There was an error during the creation of the password'
					 });
				 } else {
					 /* Save the encrypted pwd in db */
					 User.saveUserPwd(user, hash, result => {
						 cb(result);
					 })
				 }
				})
			/* If not redirect to send request to admin */
			} else {
				 return JSON.stringify({
					 status: 500,
					 error: 'No such user in database'
				 });
			}
	 })
	}
	
	static signin(email, password, cb) {
		this.getUsers(users => {
		 	let user = users.filter((user) => {
				return user.user_email == email
			})
			if (user) {
				user = user[0];
				var response;
				bcrypt.compare(password, user.user_password, (err, result) => {
					if (err) {
						response = {
							status: 401,
							failed: 'Unauthorized Access'
					 	};
					}
				 	if (result) {
					 	const JWTToken = jwt.sign({
						 	email: user.user_email,
						 	role: user.user_role
					},
					process.env.JWT_SECRET,
					{
						expiresIn: '2d'
					});
						response = {
							status: 200,
							success: 'Success',
							token: JWTToken
						};
					}
					cb(response);
			 	});
			} else {
				response = {
					status: 500,
					error: 'No such user in database'
				};
				cb(response);
			}
	 })
	}
	
	static postUser(_user, cb) {
      const user = {
				user_email: _user.email,
				user_role: _user.role,
				user_password: '',
				user_username: _user.email
	   }
	   db.query('INSERT INTO users SET ?', user, function(err, results){
			if (err) throw err;
			cb(results)			
	   })	
	}
	
	static saveUserPwd(user, pwd, cb) {
	   let userToSave = {
			user_email: user.user_email,
			user_role: user.user_role,
      user_password: pwd
	   }
	   db.query('UPDATE users SET ? WHERE user_email = ?', [userToSave, user.user_email], function(err, results) {
	  	if (err) throw err;
			cb(results)
	   })
	}

	static getSuperAdmin(cb) {
		db.query('SELECT * from users WHERE user_role = "superadmin"', function(err, rows) {
			if (err) throw err;
		  var records = JSON.stringify(rows[0]);
			var users = JSON.parse(records);
	    cb(users)
		})
 }
	
	static sendRequest(email, role, cb) {
		this.getSuperAdmin(admin => {
			const oauth2Client = new OAuth2(
				process.env.G_CLIENT_ID,
				process.env.G_CLIENT_SECRET, 
				process.env.G_REDIRECT_URL
			);
			
			oauth2Client.setCredentials({
				refresh_token: process.env.G_REFRESH_TOKEN
			});
			oauth2Client.getAccessToken((err, accessToken) => {
				if (err) throw err;
				const smtpTransport = nodemailer.createTransport({
					service: "gmail",
					auth: {
							 type: "OAuth2",
							 user: admin.user_email, 
							 clientId: process.env.G_CLIENT_ID,
							 clientSecret: process.env.G_CLIENT_SECRET,
							 refreshToken: process.env.G_REFRESH_TOKEN,
							 accessToken: accessToken
					}
				 });
				const mailOptions = mail.mailOptions(email, role, admin.user_email);
				smtpTransport.sendMail(mailOptions, (error, info) => {
					if (error) throw error
					smtpTransport.close();
					cb(info)
				});
			})
		})	
	}

	static confirmRequest(email, role, cb) {
		// appeler une méthode sendMail où juste les options changent
	}
	
	static refuseRequest(email, role, cb) {
		// appeler une méthode sendMail où juste les options changent
	}

	static verifyToken(token, cb) {
		jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
			var response = decoded;
			if (err) {
				response = err
			} 
			cb(response)
		});
	}
}
module.exports = User
