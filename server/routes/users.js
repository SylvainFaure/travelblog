const express = require('express')
const users = express.Router()
const User = require('../models/user');

users.route('/')
  .get((req, res) => {
    User.getUsers(users => {
      res.json(users);
    })
  })
  .post((req, res) => {
    User.createNewUser(req.body.user, (result) => {
      res.json(result);
    })
  })
  // TODO - Add a delete route

users.route('/:id')
  .get((req, res) => {
    User.getUser(req.params.id, user => {
      res.json(user);
    })
  })
  .put((req, res) => {
    User.updateUser(req.params.id, user => {
      res.json(user);
    })
  })
  .delete((req, res) => {
   User.deleteUser(req.params.id, user => {
      res.json(user);
    })
  })

users.route('/request')
  .post((req, res) => {
    // 'request' | 'confirm' | 'refuse'
    User.userRequest(req.body.type, req.body.mail, req.body.role, result => {
      res.json(result);
    })
  })

users.route('/verifytoken')
  .post((req, res) => {
    User.verifyToken(req.body.token, result => {
      res.json(result)
    })
  })

users.route('/signin')
  .post((req, res) => {
    User.signin(req.body.email, req.body.password, (result) => {
      res.json(result)
    })
  })
  
users.route('/signup')
  .post((req, res) => {
    User.signup(req.body.email, req.body.password, (result) => {
      res.json(result)
    })
  })

module.exports = users
