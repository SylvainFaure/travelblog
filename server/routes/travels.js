const express = require('express')
const travels = express.Router()
const Travel = require('../models/travel');
const handleResponse = require('../responseHandler')

travels.route('/')
  .get((req, res) => {
    Travel.getAll(false, travels => {
      res.json(travels)
    })
  })
  .post((req, res, next) => {
    Travel.addTravel(false, req.body, results =>{
      handleResponse(res, next, results)
    })
  })
  // TODO - Add a delete route

travels.route('/:id([0-9]+)')
  .get((req, res, next) => {
    Travel.getTravel(false, req.params.id, travel => {
      res.json(travel)
    })
  })
  .put((req, res, next) => {
    Travel.updateTravel(false, req.body, req.params.id, travel => {
      handleResponse(res, next, travel)
    })
  })
  .delete((req, res, next) => {
    Travel.deleteTravel(req.params.id, result => {
      handleResponse(res, next, result)
    })
  })
travels.route('/:id([0-9]+)/articles')
  .get((req, res) => {
    Travel.getAllArticlesByTravel(req.params.id, articles => {
      res.json(articles)
    })
  })
travels.route('/published')
  .get((req, res) => {
    Travel.getAll(true, travels => {
      res.json(travels)
    })
  })
  // TODO Add delete all

travels.route('/published/:id([0-9]+)')
  .get((req, res) => {
    Travel.getTravel(true, req.params.travel, travel => {
      res.json(travel)
    })
  })
  .post((req, res, next) => {
    Travel.addTravel(true, req.body, results =>{
      handleResponse(res, next, results)
    })
  })
  .put((req, res, next) => {
    Travel.updateTravel(true, req.body, req.params.id, travel => {
      handleResponse(res, next, travel);
    })
  })
  .delete((req, res, next) => {
    Travel.unpublishTravel(req.params.id, result => {
      handleResponse(res, next, result);
    })
  })

module.exports = travels
