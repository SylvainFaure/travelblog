const db = require('../db.js');
const mail = require ('../mail.js');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const jwt = require('jsonwebtoken');

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
	
	
	static postUser(email, cb) {
      const user = {
	    	email: email,
        pwd: ''
	   }
	   db.query('INSERT INTO users SET ?', user, function(err, results, fields){
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
	
	static sendRequest(email, cb) {
		this.getSuperAdmin(admin => {
			const transporter = nodemailer.createTransport(smtpTransport({
				service: 'gmail',
				host: "smtp.gmail.com",
				auth: {
					user: admin.user_email,
					pass: admin.user_password
				}
			}));
			const mailOptions = mail.mailOptions(email);
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) throw error
				cb(info)
			});
		})	
	}

	static verifyToken(token, cb) {
		jwt.verify(token, 'nolandskid', function(err, decoded) {
			let response;
			if (err) {
				response = {
					status: 500,
					error: "Invalid or inexistent token"
				}
			} else {
				response = decoded
			}
			console.log(response)
			cb(response)
		});
	}
}
module.exports = User
