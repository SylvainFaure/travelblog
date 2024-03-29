const db = require('../db.js');
const Setting = require('./setting.js');

class Travel {

	static getAll(published, cb) {
		let table = published ? 'published_travels' : 'travels';
		db.query(`SELECT travel_id, travel_title_fr, travel_title_it, travel_published_fr, travel_published_it, travel_published_date_fr, travel_published_date_it, travel_desc_fr, travel_desc_it, travel_countries_fr, travel_countries_it, travel_start_date, travel_end_date, travel_slug_fr, travel_slug_it, travel_category, travel_same_start_end FROM ${table}`, (err, rows) => {
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
						db.query('UPDATE `published_travels` SET ? WHERE travel_id = ?', [travel, travel.travel_id], (error, results) => {
							if (error) {
								cb({type: 'DatabaseError', error: error})
							} else {
								cb(results)
							}
						})
					} else {
						db.query('INSERT INTO `published_travels` SET ?', travel, (err, results, fields) => { 
							if (err) {
								cb({type: 'DatabaseError', error: err});
							} else {
								db.query('SELECT * FROM `published_travels` WHERE travel_published_id = ?', [results.insertId], (err, rows) => {
									cb(rows)
								})		
							}
						})
					}
				} 
			});
		} else {
			db.query('INSERT INTO travels SET ?', travel, (err, results, fields) => { 
				if (err) {
					cb({type: 'DatabaseError', error: err});
				} else {
					db.query('SELECT * FROM `travels` WHERE travel_id = ?', [results.insertId], (err, rows) => {
						cb(rows)
					})	
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
					Setting.postUnpublishEntity('travel', id, (results) => {
						console.log('Settings updated', results)
					})		
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
		db.query('DELETE FROM `articles` WHERE `article_travel_id` = ?', id, (error, rows) => {
			if (error) {
				cb({ type: "DatabaseError", error})
			}
		})
		db.query('DELETE FROM `published_articles` WHERE `article_travel_id` = ?', id, (error, rows) => {
			if (error) {
				cb({ type: "DatabaseError", error})
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
