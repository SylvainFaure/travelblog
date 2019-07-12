const express = require('express')
const articles = express.Router()
const Article = require('../models/article');
const validate = require('../validators/validator');
const validateRole = require('../validators/role.validator');
const handleResponse = require('../responseHandler')

articles.route('/')
  .get((req, res, next) => {
    Article.getAll(false, allarticles => {
      handleResponse(res, next, allarticles)
    })
  })
  .post((req, res, next) => {
    validate(req.body, 'article', 'create')
      .then((value) => {
        Article.postArticle(req.body, results =>{
          handleResponse(res, next, results)
        })
      })
      .catch(err => {
        res.json(err)
      })
  })
  .delete((req, res, next) => {
    validateRole(req.headers['x-access-token'], 'superadmin')
      .then((value) => {
        Article.deleteAll(result => {
          handleResponse(res, next, result)
        })
      })
      .catch(err => {
        res.json(err)
      })
  })

articles.route('/:id([0-9]+)')
  .get((req, res, next) => {
    Article.getArticle(false, req.params.id, article => {
      handleResponse(res, next, article)
    })
  })
  .put((req, res, next) => {
     Article.updateArticle(false, req.body, req.params.id, article => {
      handleResponse(res, next, article)
    })
  })
  .delete((req, res, next) => {
    Article.deleteArticle(req.params.id, result => {
      handleResponse(res, next, result)
    })
  })

articles.route('/published')
  .get((req, res, next) => {
    Article.getAll(true, allarticles => {
      handleResponse(res, next, allarticles)
    })
  })
  

articles.route('/published/:id([0-9]+)')
  .get((req, res) => {
    Article.getArticle(true, req.params.article, article => {
      res.json(article)
    })
  })
  .post((req, res, next) => {
    validate(req.body.article, 'article', 'publish')
    .then((value) => {
      Article.publishArticle(req.body.article, req.params.id, results => {
        res.json(results)
      })
    })
    .catch(err => {
      handleResponse(res, next, {type: 'ValidationError', error: err})
    })
  })
  .put((req, res) => {
    Article.updateArticle(true, req.body.article, req.params.id, results => {
      res.json(results)  
    })
  })
  .delete((req, res) => {
    Article.unpublishArticle(req.params.id, result => {
      res.send(result)
    })
  })

module.exports = articles
