const db = require('../db.js');

class Travel {

	static getAll(published, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`SELECT * FROM ${table}`, function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows);
			var travels = JSON.parse(records);
			cb(travels)
		})
	}

	static getTravel(travel, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`SELECT * FROM ${table} WHERE travel_id = ?`, [travel], function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows);
			var travel = JSON.parse(records);
			cb(travel)
		})
	}

	static addTravel(travel, cb) {
		db.query('INSERT INTO travels SET ?', travel, function(err, results, fields){
			if (err) throw err;
			cb(results)			
		})
	}

	static updateTravel(travel, id, cb) {
		console.log(travel)
		db.query('UPDATE travels SET ? WHERE travel_id = ?', [travel, id], function(error, results){
			if (error) throw error
			cb(results)
		})
	}

	static deleteTravel(id, cb) {
		db.query('DELETE FROM travels WHERE travel_id = ?', id, function(error, result){
			if (error) throw error
				cb(result)
		})
	}
}

module.exports = Travel