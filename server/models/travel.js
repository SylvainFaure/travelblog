const db = require('../db.js');

class Travel {

	static getAll(published, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`SELECT * FROM ${table}`, (err, rows) => {
			if (err) throw err;
			var records = JSON.stringify(rows);
			var travels = JSON.parse(records);
			cb(travels)
		})
	}

	static getTravel(published, travel, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`SELECT * FROM ${table} WHERE travel_id = ?`, [travel], (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows);
				var travel = JSON.parse(records);
				cb(travel)
			}
		})
	}

	static addTravel(published, travel, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`INSERT INTO ${table} SET ?`, travel, (err, results, fields) => { 
			if (err) {
				cb({type: 'DatabaseError', error: err});
			} else {
				cb(results)			
			}
		})
	}

	static updateTravel(published, travel, id, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`UPDATE ${table} SET ? WHERE travel_id = ?`, [travel, id], (error, results) => {
			if (error) {
				cb({type: 'DatabaseError', error: error});
			} else {
				cb(results)			
			}
		})
	}

	static deleteTravel(published, id, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`DELETE FROM ${table} WHERE travel_id = ?`, id, (error, result) => {
			if (error) {
				cb({type: 'DatabaseError', error: error});
			} else {
				cb(result)			
			}
		})
	}
	
	static getAllArticlesByTravel(travel, cb) {
		db.query('SELECT * FROM articles WHERE article_travel_id = ?', [travel], (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows);
				var articles = JSON.parse(records);
				cb(articles)
			}
		})
	}
}

module.exports = Travel
