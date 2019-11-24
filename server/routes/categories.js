const express = require('express')
const categories = express.Router()
const Category = require('../models/category');
const handleResponse = require('../responseHandler')

categories.route('/')
  .get((req, res, next) => {
    Category.getAll((results) => {
      handleResponse(res, next, results)
    })
  })
  .post((req, res, next) => {
    Category.saveCategory(req.body.category, results =>{
      handleResponse(res, next, results)
    })
  })
categories.route('/:id([0-9]+)')
  .get((req, res, next) => {
    Category.getCategory(req.params.id, results => {
      handleResponse(res, next, results)
    })
  })
  .put((req, res, next) => {
    Category.updateCategory(req.body, req.params.id,  results =>{
      handleResponse(res, next, results)
    })
  })
  .delete((req, res, next) => {
    Category.removeCategory(req.params.id, results => {
      handleResponse(res, next, results)
    })
  })

module.exports = categories