const db = require('../db.js');

class User {

	static getUsers(cb) {
		db.query('SELECT * FROM users', function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows[0]);
			var users = JSON.parse(records);
			cb(users)
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
}

module.exports = User
