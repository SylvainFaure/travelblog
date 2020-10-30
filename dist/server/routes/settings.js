const express = require('express')
const settings = express.Router()
const Setting = require('../models/setting');
const handleResponse = require('../responseHandler')

settings.route('/')
  .get((req, res) => {
    Setting.getSettings(settings => {
      res.json(settings[0])
    })
  })
  .put((req, res, next) => {
    Setting.updateSettings(req.body, results =>{
      handleResponse(res, next, results)
    })
  })

module.exports = settings