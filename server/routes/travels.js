const express = require('express')
const travels = express.Router()
const Travel = require('../models/travel');

travels.route('/')
  .get((req, res) => {
    Travel.getAll(false, travels => {
      res.json(travels)
    })
  })
  .post((req, res) => {
    Travel.addTravel(false, req.body, results =>{
      res.json(results)
    })
  })
  // TODO - Add a delete route

travels.route('/:id')
  .get((req, res) => {
    Travel.getTravel(false, req.params.travel, travel => {
      res.json(travel)
    })
  })
  .put((req, res) => {
    Travel.updateTravel(false, req.body, req.params.id, travel => {
      res.json(travel);
    })
  })
  .delete((req, res) => {
    Travel.deleteTravel(false, req.params.id, result => {
      res.send(result);
    })
  })

travels.route('/published')
  .get((req, res) => {
    Travel.getAll(true, travels => {
      res.json(travels)
    })
  })
  // TODO Add delete all

travels.route('/published/:id')
  .get((req, res) => {
    Travel.getTravel(true, req.params.travel, travel => {
      res.json(travel)
    })
  })
  .post((req, res) => {
    Travel.addTravel(true, req.body, results =>{
      res.json(results)
    })
  })
  .put((req, res) => {
    Travel.updateTravel(true, req.body, req.params.id, travel => {
      res.json(travel);
    })
  })
  .delete((req, res) => {
    Travel.deleteTravel(true, req.params.id, result => {
      res.send(result);
    })
  })

module.exports = travels
