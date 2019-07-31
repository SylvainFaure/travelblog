const db = require('../db.js');

class Setting {

	static getSettings(cb) {
		db.query(`SELECT * FROM settings`, (err, rows) => {
			if (err) {
				cb({type: 'DatabaseError', error: err});
			} else {
				const records = JSON.stringify(rows);
				const settings = JSON.parse(records);
				cb(settings)
			}
		})
	}

  static updateSettings(settings, cb) {
		db.query(`UPDATE settings SET ? WHERE id = 0`, settings, (err, results, fields) => { 
			if (err) {
				cb({type: 'DatabaseError', error: err});
			} else {
				cb(results)
			}
		})
	}
}

module.exports = Setting
