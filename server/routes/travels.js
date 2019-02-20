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
    Travel.addTravel(req.body, results =>{
      res.json(results)
    })
  })
  // TODO - Add a delete route

travels.route('/:id)
  .get((req, res) => {
    Travel.getTravel(false, req.params.travel, travel => {
      res.json(travel)
    })
  })
  .put((req, res) => {
    Travel.updateTravel(req.body, req.params.id, travel => {
      res.json(travel);
    })
  })
  .delete((req, res) => {
    Travel.deleteTravel(req.params.id, result => {
      res.send(result);
    })
  })

module.exports = travels
