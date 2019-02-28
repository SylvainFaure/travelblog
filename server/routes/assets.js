const express = require('express')
const assets = express.Router()
const Asset = require('../models/asset');
const upload = require('../config/storage');

assets.route('/')
  .get((req, res) => {
    Asset.getAll(allassets => {
      res.json(allassets)
    })
  })
  .post(upload.any('file'), (req, res) => {
    Asset.uploadAssets(req.files, req.body.infos, result => {
      res.json(result);
    })
  })
  // TODO - Add a delete route

assets.route('/:id([0-9]+)')
  .get((req, res) => {
    // ROUTE TO WRITE (if needed)
  })
  .put((req, res) => {
    Asset.updateAsset(req.body, req.params.id, asset => {
      res.json(asset)
    })
  })
  /*.delete((req, res) => {
    Travel.deleteTravel(false, req.params.id, result => {
      res.send(result);
    })
  })*/

assets.route('/delete')
  .post((req, res) => {
    Asset.deleteAssets(req.body.ids, req.body.names, results => {
      res.json(results)
    })
  })


module.exports = assets;
