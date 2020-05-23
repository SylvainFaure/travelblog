const db = require('../db.js');

class Travel {

	static getAll(published, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`SELECT * FROM ${table}`, (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err});
			} else {
				var records = JSON.stringify(rows);
				var travels = JSON.parse(records);
				cb(travels)
			}
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
		if (published) {
			db.query('SELECT * FROM published_travels WHERE travel_id = ?', travel.travel_id, (err, rows) => {
				if (err) {
					cb({type: 'DatabaseError', error: err})
				} else {
					console.log(rows)
					if (rows.length) {
						// update
						db.query('UPDATE published_travels SET ? WHERE travel_id = ?', [travel, travel.travel_id], (error, results) => {
							if (error) {
								cb({type: 'DatabaseError', error: error})
							} else {
								cb(results)
							}
						})
					} else {
						db.query(`INSERT INTO published_travels SET ?`, travel, (err, results, fields) => { 
							if (err) {
								cb({type: 'DatabaseError', error: err});
							} else {
								cb(results)			
							}
						})
					}
				} 
			});
		} else {
			db.query(`INSERT INTO travels SET ?`, travel, (err, results, fields) => { 
				if (err) {
					cb({type: 'DatabaseError', error: err});
				} else {
					cb(results)			
				}
			})
		}
	}

	static updateTravel(published, travel, id, cb) {
		if (published) {
			db.query('UPDATE travels SET ? WHERE travel_id = ?', [travel, id], (error, results) => {
				if (error) {
					cb({type: 'DatabaseError', error: error});
				} else {
					db.query('SELECT * FROM published_travels WHERE travel_id = ?', id, (err, rows) => {
						if (err) {
							cb({type: 'DatabaseError', error: err})
						} else {
							if (rows.length) {
								// update
								db.query('UPDATE published_travels SET ? WHERE travel_id = ?', [travel, id], (error, results) => {
									if (error) {
										cb({type: 'DatabaseError', error: error})
									} else {
										cb(results)
									}
								})
							} else {
								// save
								db.query('INSERT INTO published_travels SET ?', travel, (err, results, fields) => { 
									if (err) {
										cb({type: 'DatabaseError', error: err});
									} else {
										cb(results)			
									}
								})
							}
						}
					})
				}
			})
		} else {
			db.query('UPDATE travels SET ? WHERE travel_id = ?', [travel, id], (error, results) => {
				if (error) {
					cb({type: 'DatabaseError', error});
				} else {
					cb(results)
				}
			})
		}
	}

	static unpublishTravel(id, cb) {
		db.query(`DELETE FROM published_travels WHERE travel_id = ?`, id, (error, result) => {
			if (error) {
				cb({type: 'DatabaseError', error});
			} else {
				if (result.affectedRows !== 1) {
					cb({type: "ServerError", message: "There is no travel with such id in DB"})
				} else {
					cb(result)			
				}
			}
		})
	}

	static deleteTravel(id, cb) {
		var resultOne = {};
		var resultTwo = {};
		db.query('DELETE FROM `travels` WHERE `travel_id` = ?', id, (error, result) => {
			if (error) { 
				cb({type: 'DatabaseError', error})
			}
			resultOne = result;
		})
		db.query('SELECT * FROM `published_travels` WHERE `travel_id` = ?', id, (error, rows) => {
			if (error) { 
				cb({type: 'DatabaseError', error})
			} else {
				if (rows.length) {
					this.unpublishTravel(id, (result) => {
						resultTwo = result;
					})
				}
			}
		})
		const result = Object.assign({}, resultOne, resultTwo)
		cb(result)
	}
	
	static getAllArticlesByTravel(travel, cb) {
		db.query('SELECT * FROM articles WHERE article_travel_id = ?', [travel], (error, rows) => {
			if (error) {
				cb({type: 'DatabaseError', error})
			} else {
				var records = JSON.stringify(rows);
				var articles = JSON.parse(records);
				cb(articles)
			}
		})
	}
}

module.exports = Travel
