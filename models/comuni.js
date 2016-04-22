'use strict'

/*

{
	model: "comuni_italiani.regione",
	pk: 1,
	fields: {
		name: "Piemonte"
	}
}

{
	model: "comuni_italiani.cittametropolitana",
	pk: 201,
	fields: {
		name: "Torino"
	}
}

{
	model: "comuni_italiani.provincia",
	pk: 1,
	fields: {
		name: "Torino",
		codice_targa: "TO",
		regione: 1
	}
}

{
	model: "comuni_italiani.comune",
	pk: 13,
	fields: {
		codice_istat: 1013,
		codice_catastale: "A518",
		name: "Avigliana",
		provincia: 1,
		citta_metropolitana: 201,
		is_capoluogo: false,
		altitudine: 383,
		superficie: 23.22,
		popolazione: 12129
	}
}

{
	model: "comuni_italiani.comune",
	pk: 1472,
	fields: {
		codice_istat: 12118,
		codice_catastale: "H736",
		name: "Samarate",
		provincia: 12,
		citta_metropolitana: null,
		is_capoluogo: false,
		altitudine: 221,
		superficie: 16.01,
		popolazione: 16168
	}
}

*/

const mongoose = require('mongoose');

const Promise = require('bluebird');

mongoose.connect('mongodb://localhost/test');

const RegioneSchema = mongoose.Schema({
	pk: { type: Number, unique: true},
	name: String
});

const ProvinciaSchema = mongoose.Schema({
	pk: { type: Number, unique: true},
	name: String,
	code: String,
	regione_id: Number
});

const ComuneSchema = mongoose.Schema({
	pk: { type: Number, unique: true},
	name: String,
	postalCode: Number,
	provincia_id: Number,
	altitudine: Number,
	superficie: Number,
	popolazione: Number,
	location : {
    	type: { 
      		type: String,
      		default: 'Point'
    	}, 
    	coordinates: [Number]
  	}
});

ComuneSchema.index({ location : '2dsphere' });

var Regione = mongoose.model('Regione', RegioneSchema);

var Provincia = mongoose.model('Provincia', ProvinciaSchema);

var Comune = mongoose.model('Comune', ComuneSchema);

/*
* return Promise
*
*/

function getRegioni(){
	return new Promise(function(fulfill, reject){

		Regione.find(function(err, regioni){
			if(err)
				reject(err);

			fulfill(regioni);
		});

	});
}

function getRegioneByName(regioneName){

	return new Promise(function(fullfill, reject){
		Regione.findOne({ name: regioneName }, function(err, regione){
			if(err)
				return reject(err);

			if(!regione){
				return reject(regioneName + ' not found');
			}

			fullfill(regione);
		});

	});
}

function getProvinceByRegioneId(idRegione){
	return new Promise(function(fullfill, reject){
		Provincia.find({ regione_id: idRegione }, function(err, province){
			if(err)
				return reject(err);

			if(!province){
				return reject('Province not found with regione_id: ' + idRegione);
			}

			fullfill(province);
			});
		});

}

/*
function getRegioneByName(nomeRegione ){
	
	Regione.findOne({name: nomeRegione}, function(err, regione){
		if(err)
			return console.error(err);

		console.log(regione);
	});
}
*/

function getProvinceByIdRegione(idRegione, callback){

	Provincia.find({ regione_id: idRegione }, function(err, province){
		if(err)
			return console.error(err);

		province.forEach(function(provincia){
			callback(provincia);
		});

	});

}

function getComuniByProvinciaId(idProvincia){
	return new Promise(function(fullfill, reject){
		Comune.find({provincia_id: idProvincia}, function(err, comuni){
			if(err)
				return reject(err);

			if(!comuni){
				return reject('Comuni not found with provincia_id: ' + idProvincia);
			}

			fullfill(comuni);
		});
	});
}

function getCominiByIdProvincia(idProvincia, callback){
	let numComuniProvicia = 0;
	Comune.find({ provincia_id: idProvincia }, function(err, comuni) {
		if(err)
			return console.error(err);

		comuni.forEach(function(comune){
			numComuniProvicia++;
			callback(comune);
		});

		console.log('COMUNI PROVINCIA NUM: ' + numComuniProvicia);
	});
}

module.exports = {
	Regione,
	Provincia,
	Comune,
	getRegioni,
	getRegioneByName,
	getProvinceByRegioneId, 
	getProvinceByIdRegione,
	getComuniByProvinciaId,
	getCominiByIdProvincia
}

