const express = require('express')
const anecdotes = express.Router()
const Anecdote = require('../models/anecdote');
const handleResponse = require('../responseHandler')

anecdotes.route('/')
  .get((req, res, next) => {
    Anecdote.getAll((results) => {
      handleResponse(res, next, results)
    })
  })
  .post((req, res, next) => {
    Anecdote.saveAnecdote(req.body, results =>{
      handleResponse(res, next, results)
    })
  })
anecdotes.route('/:id([0-9]+)')
  .get((req, res, next) => {
    Anecdote.getAnecdote(req.params.id, results => {
      handleResponse(res, next, results)
    })
  })
  .put((req, res, next) => {
    Anecdote.updateAnecdote(req.body, req.params.id,  results =>{
      handleResponse(res, next, results)
    })
  })
  .delete((req, res, next) => {
    Anecdote.removeAnecdote(req.params.id, results => {
      handleResponse(res, next, results)
    })
  })

module.exports = anecdotes