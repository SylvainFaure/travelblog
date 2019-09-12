const db = require('../db');

class Anecdote {
  static getAll(cb) {
    db.query(`SELECT * FROM anecdotes`, (err, rows) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        const anecdotes = JSON.parse(JSON.stringify(rows))
        cb(anecdotes)
      }
    })
  }

  static getAnecdote(id, cb) {
    db.query(`SELECT * FROM anecdotes WHERE anecdote_id = ?`, [id], (err, rows) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        const anecdote = JSON.parse(JSON.stringify(rows))
        cb(anecdote[0])
      }
    })
  }

  static saveAnecdote(anecdote, cb) {
    db.query(`INSERT INTO anecdotes SET ?`, anecdote, (err, result) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        cb(result)
      }
    })
  }

  static updateAnecdote(anecdote, id, cb) {
    db.query(`UPDATE anecdotes SET ? WHERE anecdote_id = ?`, [anecdote, id], (err, result) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        cb(result)
      }
    })
  }

  static removeAnecdote(id, cb) {
    db.query(`DELETE FROM anecdotes WHERE anecdote_id = ?`, [id], (err, result) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        cb(result)
      }
    })
  }
}

module.exports = Anecdote