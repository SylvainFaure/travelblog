const db = require('../db.js');

class Article {

	static getAll(cb) {
		db.query('SELECT * FROM articles', function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows);
			var allarticles = JSON.parse(records);
			cb(allarticles)
		})
	}

	static getAllByTravel(travel, cb) {
		db.query('SELECT * FROM articles WHERE article_travel_id = ?', [travel], function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows);
			var articles = JSON.parse(records);
			cb(articles)
		})
	}
	static getArticle(id, cb) {
		db.query('SELECT * FROM articles WHERE article_id = ?', [id], function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows);
			var article = JSON.parse(records);
			cb(article)
		})
	}

	static postArticle(article, cb) {
		db.query('INSERT INTO articles SET ?', article, function (error, results) {
		 	if (error) throw error;
			cb(results)
		});
	}

	static updateArticle(article, id, cb) {
		db.query('UPDATE articles SET ? WHERE article_id = ?', [article, id], function(error, results){
			if (error) throw error
			cb(results)
		})
	}

	static deleteArticle(id, cb) {
		db.query('DELETE FROM articles WHERE article_id = ?', id, function(error, result){
			if (error) throw error
				cb(result)
		})
	}
}

module.exports = Article