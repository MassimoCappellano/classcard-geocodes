'use strict'

var jsonfile = require('jsonfile');
var util = require('util');

var model = require('./models/comuni');
 
var file = './data/comuni_italiani.json';

jsonfile.readFile(file, function(err, obj) {
  // console.dir(obj)
  for (let value of obj){
  	console.dir(value);
  	if(value.model === 'comuni_italiani.regione'){
  		let regione = new model.Regione({ pk: value.pk, name: value.fields.name });
  		regione.save(function (err, regione) {
		  if (err) return console.error(regione);
		});
  		
  	} else if (value.model === 'comuni_italiani.provincia') {
  		let provincia = new model.Provincia({ pk: value.pk, name: value.fields.name, 
  			code: value.fields.codice_targa, regione_id: value.fields.regione });
  		
  		provincia.save(function (err, provincia) {
		  if (err) return console.error(provincia);
		});
  		
  	} else if (value.model === 'comuni_italiani.comune') {
  		let comune = new model.Comune({ pk: value.pk, name: value.fields.name, provincia_id: value.fields.provincia, 
  			altitudine: value.fields.altitudine, superficie: value.fields.superficie, popolazione: value.fields.popolazione });
  		
  		comune.save(function (err, comune) {
		  if (err) return console.error(comune);
		});
  		
  	}
  }
})
