const db = require('../db.js');
const mail = require ('../mail.js');

class User {

	static getUsers(cb) {
		db.query('SELECT * FROM users', function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows[0]);
			var users = JSON.parse(records);
			cb(users)
		})
	}
	
	static getUsers(email, cb) {
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
	   const user = {
	    email: user.email,
            pwd: pwd
	   }
	   db.query('UPDATE users SET ? WHERE user_email = ?', [user, user.email], function(err, rows) {
	   	if (err) throw err;
		var records = JSON.stringify(rows[0]);
	        var users = JSON.parse(records);
		cb(users)
	   })
	}
	
	static sendRequest(email, cb) {
	   var transporter = nodemailer.createTransport({
	    service: 'hotmail',
	    auth: {
	      user: 'mail.email',
	      pass: 'mail.password'
	    }
           });
	   transporter.sendMail(mail.mailOptions, (error, info) => {
	    if (error) throw error
	    cb(info)
	   });
	
	}
}

module.exports = User
