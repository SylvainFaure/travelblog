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

	static getTravel(travel, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`SELECT * FROM ${table} WHERE travel_id = ?`, [travel], (err, rows) => {
			if (err) throw err;
			var records = JSON.stringify(rows);
			var travel = JSON.parse(records);
			cb(travel)
		})
	}

	static addTravel(travel, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`INSERT INTO ${table} SET ?`, travel, (err, results, fields) => { 
			if (err) throw err;
			cb(results)			
		})
	}

	static updateTravel(published, travel, id, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`UPDATE ${table} SET ? WHERE travel_id = ?`, [travel, id], (error, results) => {
			if (error) throw error
			cb(results)
		})
	}

	static deleteTravel(published, id, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`DELETE FROM ${table} WHERE travel_id = ?`, id, (error, result) => {
			if (error) throw error
				cb(result)
		})
	}
}

module.exports = Travel
