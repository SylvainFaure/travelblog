const express = require('express')
const users = express.Router()
const User = require('../models/user');
const validate = require('../validators/user.validator');

users.route('/')
  .get((req, res) => {
    User.getUsers(users => {
      res.json(users);
    })
  })
  .post((req, res) => {
    validate(req.body.user, 'create')
      .then((value) => {
        User.createNewUser(req.body.user, (result) => {
          res.json(result);
        })
      })
      .catch(err => {
        res.json(err)
      })
  })
  // TODO - Add a delete route

users.route('/:id([0-9]+)')
  .get((req, res) => {
    User.getUserById(req.params.id, user => {
      res.json(user);
    })
  })
  .put((req, res) => {
    // see utility before validating
    /*User.updateUser(req.params.id, user => {
      res.json(user);
    })*/
  })
  .delete((req, res) => {
   User.deleteUser(req.params.id, user => {
      res.json(user);
    })
  })

users.route('/request')
  .post((req, res) => {
    // 'request' | 'confirm' | 'refuse'
    validate(req.body, 'request')
      .then((value) => {
        User.userRequest(req.body.type, req.body.email, req.body.role, result => {
          res.json(result);
        })
      })
      .catch(err => {
        res.json(err)
      })
  })

users.route('/verifytoken')
  .post((req, res) => {
    validate(req.body, 'token')
      .then((value) => {
        User.verifyToken(req.body.token, result => {
          res.json(result)
        })
      })
      .catch((err) => {
        res.json(err)
      })
  })

users.route('/signin')
  .post((req, res) => {
    validate(req.body, 'signin')
      .then((value) => {
        User.signin(req.body.email, req.body.password, (result) => {
          res.json(result);
        })
      })
      .catch((err) => {
        res.json(err);
      })
  })
  
users.route('/signup')
  .post((req, res) => {
    validate(req.body, 'signup')
      .then((value) => {
        User.signup(req.body.email, req.body.password, (result) => {
          res.json(result);
        })
      })
      .catch((err) => {
        res.json(err);
      })
  })

  /**TODO: differenciate the signup and the change password route, its not secure */

module.exports = users
