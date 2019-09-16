const db = require('../db.js');
const sharp = require('sharp');
const aws = require('../config/aws');
sharp.cache( { files: 0 } );

class Asset {

	static getAll(cb) {
		db.query('SELECT * FROM assets', (err, rows) => {
			if (err) { 
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows);
				var allassets = JSON.parse(records);
				cb(allassets)
			}
		})
	}

	static getAllByCountry(country, cb) {
		db.query('SELECT * FROM articles WHERE article_country = ?', [country], (err, rows) => {
			if (err) { 
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows);
				var articles = JSON.parse(records);
				cb(articles)
			}
		})
	}
	static getAsset(id, cb) {
		db.query('SELECT * FROM assets WHERE asset_id = ?', [id], (err, rows) => {
			if (err) { 
				cb({type: 'DatabaseError', error: err})
			} else {
				var records = JSON.stringify(rows);
				var asset = JSON.parse(records);
				cb(asset)
			}
		})
	}

	static uploadAssets(assets, data, cb) {
		var results = []
		try {
			for (var i = 0; i < assets.length; i++) {
				console.log(assets)
				console.log(data)
				/* Multer doesn't return the same object if used with AWS S3 */
				const name = assets[i].key ? assets[i].key.split('/')[1].toLowerCase() : assets[i].filename.toLowerCase(); 
				const src = assets[i].location ? assets[i].location : assets[i].filename;
				var asset = {
					asset_title_fr: data[i].title_fr,
					asset_title_it: data[i].title_it,
					asset_travel_id: data[i].travel_id,
					asset_name: name,
					asset_src: src,
					asset_cover: 0,
					asset_place_it: data[i].place_it,
					asset_place_fr: data[i].place_fr,
					asset_country_it: data[i].country_it,
					asset_country_fr: data[i].country_fr,
					asset_desc_it: data[i].desc_it,
					asset_desc_fr: data[i].desc_fr,				
					asset_type: assets[i].mimetype
				}
				db.query('INSERT INTO assets SET ?', asset, (error, result) => {
					if (error) {
						cb({type: 'DatabaseError', error: error, message: "The asset is available in full size on AWS but not registered in database"})
					} else {
						console.log(results)
						results.push(result)
					}
				});
				this.resizeAsset(asset)
			}
			cb(results)
		} catch (error) {
			cb({type: 'DatabaseError', error: error})
		}
	}

	static resizeAsset(asset) {		
		const s3 = new aws.S3();
		s3.getObject({
			Bucket: process.env.S3_BUCKET_NAME,
			Key: 'img/' + asset.asset_name 
		}, (err, data) => {
			if (err) {
				console.log(err)
			} else {
				sharp(data.Body).resize(500).toBuffer((err, resizedImage) => {
					const params = {
						Bucket: process.env.S3_BUCKET_NAME,
						Key: `thumb/mini_${asset.asset_name}`,
						Body: resizedImage
					}
					s3.putObject(params, (err, data) => {
						if (err) console.log(err)
						console.log(data)
					});
				})	
			}
		})
	}

	static updateAsset(asset, id, cb) {
		db.query('UPDATE assets SET ? WHERE asset_id = ?', [asset, id], function(error, results){
			if (error) {
				cb({type: 'DatabaseError', error: error})
			} else {
				cb(results)
			}
		})
	}

	static deleteAssets(ids, names, cb) {
		console.info(ids, names)
		try {
			var results = []
			for (var i = 0; i < ids.length; i++) {
				var id = ids[i]
				var name = names[i]
				db.query('DELETE FROM assets WHERE asset_id = ?', id, (error, result) => {
					if (error) {
						cb({type: 'DatabaseError', error: error})
					} else {
						results.push(result)
					}
				})
				/**TODO Delete for AWS */
				/* fs.unlinkSync('admin/assets/img/' + name, (err) => {
					if (err) throw err
				})
				fs.unlinkSync('admin/assets/thumb/mini_' + name, (err) => {
					if (err) throw err
				}) */
			}
			cb(results)
		} catch (error) {
			cb({type: 'DatabaseError', error: error})
		}
	}
}

module.exports = Asset
