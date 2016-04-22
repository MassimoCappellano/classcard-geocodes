'use strict'

// VIEW: https://developers.google.com/maps/documentation/geocoding/intro#GeocodingResponses

// var address = 
const util = require('util');

const GEOMapResponseParser = require('./utils/GEOMapResponseParser');


function doParse(fileName){

	const fs = require('fs')
	fs.readFile(fileName, 'utf8', function (err,data) {
	if (err) {
	    return console.error(err);
	}
	  // console.log(data);

	  const geoCodeInfo = JSON.parse(data);

	  // console.log("RESULT COORDINATE: ---> " +  util.inspect(geoCodeInfo, { showHidden: true, depth: null }));;

	  const parsingResult = GEOMapResponseParser.doParsingGEOMapResponse(geoCodeInfo);

	  console.log(parsingResult.status);

	  console.log(parsingResult);

});


}


// JSON.parse(address);

doParse('./example-feeds/SAMARATE.js');

doParse('./example-feeds/MILANO.js');

doParse('./example-feeds/FAKE_ADDRESS.js');

doParse('./example-feeds/MIO_ADDRESS.js');