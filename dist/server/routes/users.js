const express = require('express')
const users = express.Router()
const User = require('../models/user');
const validate = require('../validators/validator');
const validateRole = require('../validators/role.validator');
const handleResponse = require('../responseHandler')

users.route('/')
  .get((req, res, next) => {
    User.getUsers(users => {
      handleResponse(res, next, users);
    })
  })
  .post((req, res, next) => {
    validate(req.body.user, 'user', 'create')
      .then((value) => {
        User.createNewUser(req.body.user, (result) => {
          handleResponse(res, next, result);
        })
      })
      .catch(err => {
        res.json(err)
      })
  })
  // TODO - Add a delete route ?

users.route('/:id([0-9]+)')
  .get((req, res, next) => {
    User.getUserById(req.params.id, user => {
      handleResponse(res, next, user);
    })
  })
  .put((req, res) => {
    // see utility before validating
    /*User.updateUser(req.params.id, user => {
      res.json(user);
    })*/
  })
  .delete((req, res, next) => {
    validateRole(req.headers['x-access-token'], ['admin', 'superadmin'])
      .then(() => {
        User.deleteUser(req.params.id, user => {
          handleResponse(res, next, user);
        })
      })
      .catch(err => {
        res.json(err)
      })
  })
users.route('/email/:email')
  .get((req, res, next) => {
    User.getUserByEmail(req.params.email, user => {
      handleResponse(res, next, user);
    })
  })
users.route('/request')
  .post((req, res, next) => {
    // 'request' | 'confirm' | 'refuse'
    validate(req.body, 'user', 'request')
      .then((value) => {
        if (req.body.type !== 'request') {
          validateRole(req.headers['x-access-token'], 'superadmin')
            .then(() => {
              User.userRequest(req.body.type, req.body.email, req.body.role, req.body.pwd_token, result => {
                handleResponse(res, next, result);
              })
            })
            .catch(err => {
              res.json(err) 
            })
        } else {
          User.userRequest(req.body.type, req.body.email, req.body.role, req.body.pwd_token, result => {
            handleResponse(res, next, result);
          })
        }
      })
      .catch(err => {
        res.json(err)
      })
  })

users.route('/verifytoken')
  .post((req, res, next) => {
    validate(req.body, 'user', 'token')
      .then((value) => {
        User.verifyToken(req.body.token, result => {
          handleResponse(res, next, result)
        })
      })
      .catch((err) => {
        res.json(err)
      })
  })

users.route('/signin')
  .post((req, res, next) => {
    validate(req.body, 'user', 'signin')
      .then((value) => {
        User.signin(req.body.email, req.body.password, (result) => {
          handleResponse(res, next, result);
        })
      })
      .catch((err) => {
        res.json(err);
      })
  })
  
users.route('/signup')
  .post((req, res, next) => {
    validate(req.body, 'user', 'signup')
      .then((value) => {
        User.signup(req.body.email, req.body.password, (result) => {
          handleResponse(res, next, result);
        })
      })
      .catch((err) => {
        res.json(err);
      })
  })

users.route('/reset-password')
  .post((req, res, next) => {
    validate(req.body, 'user', 'reset')
      .then((value) => {
        User.resetPasswordRequest(req.body.email, req.body.token, (result) => {
          handleResponse(res, next, result);
        })
      })
      .catch((err) => {
        res.json(err);
      })
  })

  users.route('/confirm-reset-password')
  .post((req, res, next) => {
    validate(req.body, 'user', 'signup')
      .then((value) => {
        User.signup(req.body.email, req.body.password, (result) => {
          handleResponse(res, next, result);
        })
      })
      .catch((err) => {
        res.json(err);
      })
  })

  /**TODO: differenciate the signup and the change password route, its not secure */

module.exports = users
