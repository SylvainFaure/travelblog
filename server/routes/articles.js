const express = require('express')
const articles = express.Router()
const Article = require('../models/article');

articles.route('/')
  .get((req, res) => {
    Article.getAll(false, allarticles => {
      res.json(allarticles)
    })
  })
  .post((req, res) => {
    Article.postArticle(false, req.body, results =>{
      res.json(results)
    })
  })
  // TODO - Add a delete route

articles.route('/:id')
  .get((req, res) => {
    Article.getArticle(false, req.params.article, article => {
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
  // TODO Add delete all

articles.route('/published/:id')
  .get((req, res) => {
    Article.getArticle(true, req.params.article, article => {
      res.json(article)
    })
  })
  .post((req, res) => {
    Article.publishArticle(req.body.article, req.params.id, results => {
      res.json(results)
    })
  })
  .put((req, res) => {
   // TO WRITE
  })
  .delete((req, res) => {
    Article.unpublishArticle(req.params.id, result => {
      res.send(result)
    })
  })

module.exports = articles
