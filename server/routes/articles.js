const express = require('express')
const articles = express.Router()
const Article = require('../models/article');
const validate = require('../validators/validator');

articles.route('/')
  .get((req, res) => {
    Article.getAll(false, allarticles => {
      res.json(allarticles)
    })
  })
  .post((req, res) => {
    validate(req.body, 'article', 'create')
      .then((value) => {
        Article.postArticle(req.body, results =>{
          res.json(results)
        })
      })
      .catch(err => {
        res.json(err)
      })
  })
  .delete((req, res) => {
    validate(req.body, 'article', 'deleteAll')
      .then((value) => {
        Article.deleteAll(result => {
          res.json(result)
        })
      })
      .catch(err => {
        res.json(err)
      })
  })

articles.route('/:id([0-9]+)')
  .get((req, res) => {
    Article.getArticle(false, req.params.id, article => {
      res.json(article)
    })
  })
  .put((req, res) => {
     Article.updateArticle(req.body, req.params.id, article => {
      res.json(article)
    })
  })
  .delete((req, res) => {
    Article.deleteArticle(req.params.id, result => {
      res.send(result)
    })
  })

articles.route('/published')
  .get((req, res) => {
    Article.getAll(true, allarticles => {
      res.json(allarticles)
    })
  })
  

articles.route('/published/:id([0-9]+)')
  .get((req, res) => {
    Article.getArticle(true, req.params.article, article => {
      res.json(article)
    })
  })
  .post((req, res) => {
    validate(req.body, 'article', 'publish')
    .then((value) => {
      Article.publishArticle(req.body.article, req.params.id, results => {
        res.json(results)
      })
    })
    .catch(err => {
      res.json(err)
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
