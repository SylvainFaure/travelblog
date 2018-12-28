const db = require('../db.js');
const multer  = require('multer');
const upload = multer({ dest: '../public/assets/img/' });
const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
sharp.cache( { files: 0 } );

class Asset {

	static getAll(cb) {
		db.query('SELECT * FROM assets', function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows);
			var allassets = JSON.parse(records);
			cb(allassets)
		})
	}

	static getAllByCountry(country, cb) {
		db.query('SELECT * FROM articles WHERE article_country = ?', [country], function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows);
			var articles = JSON.parse(records);
			cb(articles)
		})
	}
	static getAsset(id, cb) {
		db.query('SELECT * FROM assets WHERE asset_id = ?', [id], function(err, rows){
			if (err) throw err;
			var records = JSON.stringify(rows);
			var asset = JSON.parse(records);
			cb(asset)
		})
	}

	static uploadAssets(assets, data, cb) {
		var results = []
		for (var i = 0; i < assets.length; i++) {
			console.log(assets)
			console.log(data)
			var asset = {
				asset_title_fr: data[i].title_fr,
				asset_title_it: data[i].title_it,
				asset_name: assets[i].filename,
				asset_src: 'assets/assets/img/' + assets[i].filename,
				asset_cover: false,
				asset_place_it: data[i].place_it,
				asset_place_fr: data[i].place_fr,
				asset_country_it: data[i].country_it,
				asset_country_fr: data[i].country_fr,
				asset_desc_it: data[i].desc_it,
				asset_desc_fr: data[i].desc_fr,				
				asset_type: assets[i].mimetype
			}
			db.query('INSERT INTO assets SET ?', asset, function (error, result) {
				 if (error) throw error;
				console.log(results)
				results.push(result)
			});

			this.resizeAsset(asset)
		}
        cb(results)
	}

	static resizeAsset(asset, cb) {
		console.log(asset.asset_name)
		sharp('public/assets/img/' + asset.asset_name)
			.resize(500)
			.toFile('public/assets/thumb/mini_' + asset.asset_name, function(err, info){
				if (err) { throw err }
				console.log(info)
			})
			
	}

	static updateAsset(asset, id, cb) {
		db.query('UPDATE assets SET ? WHERE asset_id = ?', [asset, id], function(error, results){
			if (error) throw error
			cb(results)
		})
	}

	static deleteAssets(ids, names, cb) {
		console.info(ids, names)
		var results = []
		for (var i = 0; i < ids.length; i++) {
			var id = ids[i]
			var name = names[i]
			db.query('DELETE FROM assets WHERE asset_id = ?', id, function(error, result){
				if (error) throw error
				results.push(result)
			})
			fs.unlinkSync('public/assets/img/' + name, function(err){
				if (err) throw err
			})
			fs.unlinkSync('public/assets/thumb/mini_' + name, function(err){
				if (err) throw err
			})
		}
		cb(results)
	}
}

module.exports = Asset