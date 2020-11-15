const db = require('../db.js');
const Mail = require ('./mail.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class User {
	static getUsers(cb) {
		db.query('SELECT * FROM users', (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err, message: 'Cannot get data from database'})
			} else {
				var records = JSON.stringify(rows);
				var users = JSON.parse(records);
				cb(users)
			}			
		})
	}
	
	static getUserById(id, cb) {
		db.query('SELECT * FROM `users` WHERE `user_id` = ?', [id], (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows[0]);
				var user = records == undefined ? {type: 'DatabaseError', error: err, message: 'This user is not registered in database'} : JSON.parse(records);
				cb(user)
			}
		})
	}

	static getUserByEmail(email, cb) {
		db.query('SELECT * FROM `users` WHERE `user_email` = ?', [email], (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows[0]);
				var user = records == undefined ? {type: 'DatabaseError', error: err, message: 'This user is not registered in database'} : JSON.parse(records);
				cb(user)
			}
		})
	}
	
	static updateUser(user, id, cb) { // saveUserPwd??
		db.query('UPDATE `users` SET ? WHERE `user_id` = ?', [user, id], (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows[0]);
				var user = JSON.parse(records);
				cb(user)
			}
		})
	}
	
	static deleteUser(id, cb) {
		db.query('DELETE FROM `users` WHERE `user_id` = ?', [id], (err, rows) => {
			// ADD VERIFICATION
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows);
				var user = JSON.parse(records);
				cb(user)
			}
		})
	}
	
	
	static createNewUser(user, cb) {
	  this.getUsers(users => {
			const userAlreadyRegistered = users.filter(u => {
				return u.user_email == user.email
			}) 
			if (userAlreadyRegistered.length) {
				cb({type: "DatabaseError", error: 'This user is already registered'})
			} else {
				User.postUser(user, result => {
					cb(result);
				})
			}
		})
	}
	
	static signup(email, password, cb) {
		this.getUsers(users => {
		 	let user = users.filter(u => {
				return u.user_email == email
			})
			if (user && user.length) {
				user = user[0];
				bcrypt.hash(password, 12, (err, hash) => {
				 if (err) {
					 cb({
						 	type: 'DatabaseError',
							status: 500,
							error: 'pwd_hash_pbm',
					 		message: 'There was an error during the creation of the password'
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
				 cb({
					type: "AuthorizationError",
					status: 403,
					error: 'no_such_user',
					message: 'No such user in database, you should make a request to the admin first'
				})
			}
	 })
	}
	
	static signin(email, password, cb) {
		this.getUsers(users => {
		 	let user = users.filter((user) => {
				return user.user_email == email
			})
			if (user.length && user != undefined) {
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
					if (!result) {
						response = {
							status: 401,
							error: 'Your password is wrong, try again'
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

	static resetPasswordRequest(email, password, token, cb) {
		this.signin(email, password, response => {
			if (response.status === 200) {
				this.getUserByEmail(email, (user) => {
					this.updateUser({...user, user_pwd_token: token }, user.user_id, (response) => {
						const params = {
							type: 'resetPasswordRequest',
							email,
							pwd_token: token
						}
						this.getSuperAdmin((admin) => {
							Mail.sendMail(admin.user_email, params, (res) => {
								cb(res)
							})
						})
					})
				})
				// update de l'user pour mettre le token
				// envoi du mail avec le lien et le token
			}
		})
	}
	
	static postUser(_user, cb) {
      const user = {
				user_email: _user.email,
				user_role: _user.role,
				user_password: '',
				user_username: _user.email,
				user_pwd_token: _user.pwd_token
		 }
		 console.log(_user)
	   db.query('INSERT INTO `users` SET ?', user, (err, results) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				cb(results)			
			}
	   })	
	}
	
	static saveUserPwd(user, pwd, cb) {
	   let userToSave = {
			user_email: user.user_email,
			user_role: user.user_role,
      user_password: pwd
	   }
	   db.query('UPDATE `users` SET ? WHERE `user_email` = ?', [userToSave, user.user_email], (err, results) => {
	  	if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				cb(results)
			}
	   })
	}

	static getSuperAdmin(cb) {
		db.query('SELECT * from `users` WHERE `user_role` = "superadmin"', (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows[0]);
				var users = JSON.parse(records);
				cb(users)
			}
		})
 }
	static userRequest(type, email, role, token, cb) {
		// TO TEST
		const params = {
		  type,
	  	requestedRole: role,
			email,
			pwd_token: token
		}
		// Handle confirm (and refuse) for db
		if (type == "confirm") {
			this.createNewUser({email, role, pwd_token: token}, result => {
				cb(result)
			})
		}
		console.log(params)
		// verify if this user is superadmin
		this.getSuperAdmin((admin) => {
			Mail.sendMail(admin.user_email, params, (res) => {
				cb(res)
			})
		})
	}

	static verifyToken(token, cb) {
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			var response = decoded;
			if (err) {
				response = err
			} 
			cb(response)
		});
	}
}
module.exports = User
