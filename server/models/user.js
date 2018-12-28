const db = require('../db.js');
//const bcrypt = require('bcrypt-nodejs');
const sha = require('js-sha256').sha256;

class User {

	static getUsers(cb) {
		db.query('SELECT * FROM users', function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows[0]);
			var users = JSON.parse(records);
			cb(users)
		})
	}
}

module.exports = User