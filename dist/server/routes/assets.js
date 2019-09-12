const express = require('express')
const assets = express.Router()
const Asset = require('../models/asset');
const upload = require('../config/storage');
const handleResponse = require('../responseHandler')

assets.route('/')
  .get((req, res, next) => {
    Asset.getAll(allassets => {
      handleResponse(res, next, allassets)
    })
  })
  .post(upload.any('file'), (req, res, next) => {
    Asset.uploadAssets(req.files, req.body.infos, result => {
      handleResponse(res, next, result);
    })
  })
  // TODO - Add a delete route

assets.route('/:id([0-9]+)')
  .get((req, res, next) => {
    Asset.getAsset(req.params.id, asset => {
      handleResponse(res, next, asset)
    })
  })
  .put((req, res, next) => {
    Asset.updateAsset(req.body, req.params.id, asset => {
      handleResponse(res, next, asset)
    })
  })

assets.route('/delete')
  .post((req, res, next) => {
    Asset.deleteAssets(req.body.ids, req.body.names, results => {
      handleResponse(res, next, results)
    })
  })


module.exports = assets;
