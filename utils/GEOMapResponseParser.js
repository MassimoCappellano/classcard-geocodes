'use strict'

// VIEW: https://developers.google.com/maps/documentation/geocoding/intro#GeocodingResponses

// var address = 
var util = require('util');

function ParsingResult(status, coordinates, postalCode){
	this.status = status;
	this.coordinates = coordinates;
	this.postalCode = postalCode;
}

function doParsingGEOMapResponse(geoCodeInfo){

	let parsingResult;

	if(geoCodeInfo.status === 'OK'){

	  	let arrResults = geoCodeInfo.results;

	  	// console.log(util.inspect(arrResults[0].geometry.location, { showHidden: true, depth: null }));

	  	var COORDINATES = [];

	  	COORDINATES[0] = arrResults[0].geometry.location.lng;
	  	COORDINATES[1] = arrResults[0].geometry.location.lat;

	  	console.log(COORDINATES);

	  	const addressComponents = arrResults[0].address_components;

	  	let postalCode;

	  	addressComponents.forEach( addressComp => {
	  		if (addressComp.types[0] === 'postal_code')
	  			postalCode = addressComp.short_name;
	  	});

	  	parsingResult = new ParsingResult('OK', COORDINATES, postalCode);
	} else {
	  	parsingResult = new ParsingResult(geoCodeInfo.status);
	}

	return parsingResult;
}

module.exports = {
	doParsingGEOMapResponse: doParsingGEOMapResponse
}
