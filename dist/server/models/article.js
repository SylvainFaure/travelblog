const db = require('../db.js');

class Article {

	static getAll(published, cb) {
		let table = published ? 'published_articles' : 'articles';
		db.query(`SELECT article_id, article_title_fr, article_title_it, article_slug_fr, article_slug_it, article_published_fr, article_published_it, article_published_date_fr, article_published_date_it, article_place_fr, article_place_it, article_travel_id, article_country_fr, article_country_it FROM ${table}`, (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows);
				var allarticles = JSON.parse(records);
				cb(allarticles)
			}
		})
	}

	static getArticle(published, id, cb) {
		let table = published ? 'published_articles' : 'articles';
		db.query(`SELECT * FROM ${table} WHERE article_id = ?`, [id], (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})				
			} else {
				var records = JSON.stringify(rows);
				var article = JSON.parse(records);
				cb(article)
			}
		})
	}

	static postArticle(article, cb) {
		db.query('INSERT INTO `articles` SET ?', article, (error, results) => {
		 	if (error) { 
				cb({type: 'DatabaseError', error: error})
			} else {
				db.query('SELECT * FROM `articles` WHERE article_id = ?', [results.insertId], (err, rows) => {
					cb(rows)
				})
			}
		});
	}

	static updateArticle(published, article, id, cb) {
		if (article.article_id) {
			delete article.article_id
		}
    if (published) {
			db.query(`UPDATE articles SET ? WHERE article_id = ?`, [article, id], (error, result) => {
				if (error) {
					cb({type: "DatabaseError", error: error, message: "Could not update the travel"})
				} else {
					db.query(`SELECT * FROM published_articles WHERE article_id = ?`, id, (error, rows) => {
						if (error) {
							cb({type: "DatabaseError", error: error})
						} else {
							if (rows.length) {
								db.query(`UPDATE published_articles SET ? WHERE article_id = ?`, [article, id], (error, result) => {
									if (error) {
										cb({type: "DatabaseError", error: error, message: "Could not update in published_article"})
									} else {
										cb(result)
									}
								})
							} else {
								db.query(`INSERT INTO published_articles SET ?`, article, (error, result) => {
									if (error) {
										cb({type: "DatabaseError", error: error})
									} else {
										cb(result)
									}
								})
							}
						}
					})
				}
			})
		} else {
			db.query(`UPDATE articles SET ? WHERE article_id = ?`, [article, id], (error, results) => {
				if (error) { 
					cb({type: 'DatabaseError', error: error})
				} else {
					cb(results)
				}
			})
		}
	}
	
	static publishArticle(article, id, cb) {
		db.query('SELECT * FROM `published_articles` WHERE `article_id` = ?', id, (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				if (rows.length) {
					db.query('UPDATE `published_articles` SET ? WHERE `article_id` = ?', [article, id], (error, results) => {
						if (error) { 
							cb({type: 'DatabaseError', error: error})
						} else {
							cb(results)
						}
					})
				} else {
					db.query('INSERT INTO `published_articles` SET ?', article, (error, results) => {
						if (error) { 
							cb({type: 'DatabaseError', error: error})
						} else {
							cb(results)
						}
					})
				}
			}
		})
	}
	
	static unpublishArticle(id, cb) {
		db.query('DELETE FROM `published_articles` WHERE `article_id` = ?', id, (error, result) => {
			if (error) { 
				cb({type: 'DatabaseError', error: error})
			} else {
				if (result.affectedRows !== 1) {
					cb({type: "ServerError", message: "There is no article with such id in DB"})
				} else {
					cb(result)
				}
			}
		})
	}

	static deleteArticle(id, cb) {
		var resultOne = {};
		var resultTwo = {};
		db.query('DELETE FROM `articles` WHERE `article_id` = ?', id, (error, result) => {
			if (error) { 
				cb({type: 'DatabaseError', error: error})
			}
			resultOne = result;
		})
		db.query('SELECT * FROM `published_articles` WHERE `article_id` = ?', id, (error, rows) => {
			if (error) { 
				cb({type: 'DatabaseError', error: error})
			} else {
				if (rows.length) {
					this.unpublishArticle(id, (result) => {
						resultTwo = result;
					})
				}
			}
		})
		const result = Object.assign({}, resultOne, resultTwo)
		cb(result)
	}
  
  static deleteAll(cb) {
    // ADD A SECOND VALIDATION HERE ?
    let resultOne = {};
    let resultTwo = {};
    db.query('DELETE * FROM `articles`', (err, result) => {
      if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				resultOne = result;
			}
    })
    db.query('DELETE * FROM `published_articles`', (err, result) => {
      if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				resultTwo = result;
			}
    })
    const result = Object.assign({}, resultOne, resultTwo);
    cb(result)
  }
}

module.exports = Article
