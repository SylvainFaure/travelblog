const db = require('../db/index.js');

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
				db.query('SELECT * FROM `settings`', (err, rows) => {
					cb(rows[0])
				})	
			}
		})
	}

	static postUnpublishEntity(entityType, id, cb) {
		Setting.getSettings(settings => {
			const { highlighted_travels_fr, highlighted_travels_it, highlighted_articles_fr, highlighted_articles_it, slider_fr, slider_it, ...props } = settings[0]

			let payload = {}
			if (entityType === 'travel') {
				Object.keys(settings[0]).forEach(key => {
					if (key.startsWith('highlighted_travels_') || key.startsWith('slider_')) {
						if (settings[0][key] && settings[0][key].includes(Number(id))) {
							payload[key] = settings[0][key].filter(i => i !== Number(id))
						}
					}
				})
			}
			if (entityType === 'article') {
				Object.keys(settings[0]).forEach(key => {
					if (key.startsWith('highlighted_articles_')) {
						if (settings[0][key] && settings[0][key].includes(Number(id))) {
							payload[key] = settings[0][key].filter(i => i !== Number(id))
						}
					}
				})
			}

			const completePayload = {
			 ...settings[0],
			 ...payload
			}

			Object.keys(completePayload).forEach(key => {
				if (typeof completePayload[key] === 'object') {
					completePayload[key] = JSON.stringify(completePayload[key])
				}
			})
			console.log(completePayload)
			Setting.updateSettings(completePayload, (results) => {
			 cb(results)
			})
		})
	}
}

module.exports = Setting
