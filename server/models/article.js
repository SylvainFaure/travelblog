const db = require('../db.js');

class Article {

	static getAll(published, cb) {
		let table = published ? 'published_articles' : 'articles';
		db.query(`SELECT * FROM ${table}`, (err, rows) => {
			if (err) throw err;
			var records = JSON.stringify(rows);
			var allarticles = JSON.parse(records);
			cb(allarticles)
		})
	}

	static getArticle(published, id, cb) {
		let table = published ? 'published_articles' : 'articles';
		db.query(`SELECT * FROM ${table} WHERE article_id = ?`, [id], (err, rows) => {
			if (err) throw err;
			var records = JSON.stringify(rows);
			var article = JSON.parse(records);
			cb(article)
		})
	}

	static postArticle(article, cb) {
		db.query('INSERT INTO `articles` SET ?', article, (error, results) => {
		 	if (error) throw error;
			cb(results)
		});
	}

	static updateArticle(article, id, cb) {
		db.query('UPDATE `articles` SET ? WHERE `article_id` = ?', [article, id], (error, results) => {
			if (error) throw error
			cb(results)
		})
	}
	
	static publishArticle(article, id, cb) {
		db.query('SELECT * FROM `published_articles` WHERE `article_id` = ?', id, (err, rows) => {
			if (err) throw err
			if (rows.length) {
				db.query('UPDATE `published_articles` SET ? WHERE `article_id` = ?', [article, id], (error, results) => {
					if (error) throw error
					cb(results)
				})
			} else {
				db.query('INSERT INTO `published_articles` SET ?', article, (error, results) => {
					if (error) throw error
					cb(results)
				})
			}
		})
	}
	
	static unpublishArticle(id, cb) {
		db.query('DELETE FROM `published_articles` WHERE `article_id` = ?', id, (error, result) => {
			if (error) throw error
			cb(result)
		})
	}

	static deleteArticle(id, cb) {
		var resultOne = {};
		var resultTwo = {};
		db.query('DELETE FROM `articles` WHERE `article_id` = ?', id, (error, result) => {
			if (error) throw error
			resultOne = result;
		})
		db.query('SELECT * FROM `published_articles` WHERE `article_id` = ?', id, (err, rows) => {
			if (err) throw err
			if (rows) {
				this.unpublishArticle(id, (result) => {
					resultTwo = result;
				})
			}
		})
		const result = Object.assign({}, resultOne, resultTwo)
		cb(result)
	}
}

module.exports = Article
