'use strict'
const GoogleMapsAPI = require('googlemaps');
const util = require('util');

var publicConfig = {
  key: 'AIzaSyDopFGfG7qwz24oHWfDdyU14b3aW10SHZM',
  stagger_time:       1000, // for elevationPath
  encode_polylines:   false,
  secure:             true // use https
  // proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
};
var gmAPI = new GoogleMapsAPI(publicConfig);

// geocode API
var geocodeParams = {
  "address":    "121, Curtain Road, EC2A 3AD, London UK",
  "components": "components=country:GB",
  // "bounds":     "55,-1|54,1",
  "language":   "en",
  "region":     "uk"
};

var geocodeParams2 = {
  "address":    "Samarate VA, IT",
  "components": "components=country:IT",
  // "bounds":     "55,-1|54,1",
  "language":   "it",
  "region":     "it"
};

var geocodeParams3 = {
  "address":    "Cascina Elisa, IT",
  "components": "components=country:IT",
  // "bounds":     "55,-1|54,1",
  "language":   "it",
  "region":     "it"
};

// via 11 febbraio, 2, 21052 Busto Arsizio VA, Italia
var geocodeParams4 = {
  "address":    "via 11 febbraio, 2B, 21052 Busto Arsizio VA, Italia",
  "components": "components=country:IT",
  // "bounds":     "55,-1|54,1",
  "language":   "it",
  "region":     "it"
};

var geocodeParams5 = {
  "address":    "via Ottorino Respighi, 6, 21017 Samarate VA, Italia",
  "components": "components=country:IT",
  // "bounds":     "55,-1|54,1",
  "language":   "it",
  "region":     "it"
};

//FAKE
var geocodeParams6 = {
  "address":    "via Ottorino Respighi, 6, CAGAZZA, Italia",
  "components": "components=country:IT",
  // "bounds":     "55,-1|54,1",
  "language":   "it",
  "region":     "it"
};

gmAPI.geocode(geocodeParams2, function(err, result){
  // console.log(result);
  console.log(util.inspect(result, { showHidden: true, depth: null }));

  let arrResults = result.results;

  if(  typeof arrResults === 'Array'){
    console.log('SONO QUI !!!!!');
  } else {
    console.log('' + (typeof arrResults));

    console.log("**********************************");

    console.log(util.inspect(arrResults[0].geometry.location, { showHidden: true, depth: null }));
  }
});