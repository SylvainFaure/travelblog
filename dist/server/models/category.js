const db = require('../db');

class Category {
  static getAll(cb) {
    db.query(`SELECT * FROM categories`, (err, rows) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        const categories = JSON.parse(JSON.stringify(rows))
        cb(categories)
      }
    })
  }

  static getCategory(id, cb) {
    db.query(`SELECT * FROM categories WHERE category_id = ?`, [id], (err, rows) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        const category = JSON.parse(JSON.stringify(rows))
        cb(category[0])
      }
    })
  }

  static saveCategory(category, cb) {
    db.query(`INSERT INTO categories SET ?`, category, (err, result) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        db.query('SELECT * FROM `categories` WHERE category_id = ?', [results.insertId], (err, rows) => {
          cb(rows)
        })	
      }
    })
  }

  static updateCategory(category, id, cb) {
    db.query(`UPDATE categories SET ? WHERE category_id = ?`, [category, id], (err, result) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        db.query('SELECT * FROM `categories` WHERE category_id = ?', [id], (err, rows) => {
          cb(rows)
        })
      }
    })
  }

  static removeCategory(id, cb) {
    db.query(`DELETE FROM categories WHERE category_id = ?`, [id], (err, result) => {
      if (err) {
        cb({type: 'DatabaseError', error: err})
      } else {
        cb(result)
      }
    })
  }
}

module.exports = Category