'use strict'

var util = require('util');
const GoogleMapsAPI = require('googlemaps');

var model = require('./models/comuni');

// model.getRegioneByName('Lombardia');

function printProvincia(provincia){
	console.log('provincia');
	console.log(provincia);
}

function printComune(comune){
	console.log('comune');
	console.log(comune);
}
// 3 = Lombardia
// model.getProvinceByIdRegione(3, printProvincia);

// 12 = Varese, 13 = Como, 15 = Milano

function loadCoordinateComune(comune, codiceProv){

	// console.log("LOADING COORDITE COMUNE: " + comune.name + " - COD_PROV: " + codiceProv);

  	var geocodeParams2 = {
  		"address":    comune.name + " " + codiceProv + ", IT",
  		"components": "components=country:IT",
  		// "bounds":     "55,-1|54,1",
  		"language":   "it",
  		"region":     "it"
  	};

	var publicConfig = {
  		key: 'AIzaSyDopFGfG7qwz24oHWfDdyU14b3aW10SHZM',
  		stagger_time:       1000, // for elevationPath
  		encode_polylines:   false,
  		secure:             true // use https
  		// proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
	};

	var gmAPI = new GoogleMapsAPI(publicConfig);

	gmAPI.geocode(geocodeParams2, function(err, result){

			if(err){
				console.error("COMUNE -> " + comune.name + " - " + codiceProv + ", IT");
				return console.error(err);
			}

		  // console.log(result);
		  console.log("RESULT COORDINATE: ---> " +  util.inspect(result, { showHidden: true, depth: null }));

		  if(result && result.status === 'OK'){

		  	let arrResults = result.results;

		  	console.log('' + (typeof arrResults));

		  	console.log("**********************************");

		  	console.log(util.inspect(arrResults[0].geometry.location, { showHidden: true, depth: null }));

		  	var COORDINATES = [];

		  	COORDINATES[0] = arrResults[0].geometry.location.lng;
		  	COORDINATES[1] = arrResults[0].geometry.location.lat;

		  	comune.location.coordinates = COORDINATES;

		  	const addressComponents = arrResults[0].address_components;

		  	let postalCode;

		  	addressComponents.forEach( addressComp => {
		  		if (addressComp.types[0] === 'postal_code')
		  			postalCode = addressComp.short_name;
		  	});

		  	if(postalCode){
		  		 comune.postalCode = postalCode;
		  	}


		  	comune.save();

		  } else {
		  	console.log("********************* ERROR **************");
		  	console.log(geocodeParams2);
		   }
		  
  
	});
	

}

// model.getCominiByIdProvincia(15, loadCoordinateComune);

// model.getCominiByIdProvincia(12, printComune);
/*
model.getRegioni()
	.then(function(regioni){
		console.log(regioni);
    })
    .catch(function(err){
        console.log(err);
    });
*/

/*
model.getRegioneByName('Lombardia')
	.then(function(regione){
		console.log(regione);

    })
    .catch(function(err){
        console.log(err);
    });

model.getProvinceByRegioneId(3)
    .then(function(province){
    	console.log(province);
    })
    .catch(function(err){
    	console.log(err);
    });
*/

/*
model.getComuniByProvinciaId(12)
	.then(function(comuni){
    	console.log(comuni);
    })
    .catch(function(err){
    	console.log(err);
    });
*/


function getComuniByProvincia(provincia){

	let codiceProv = provincia.code;
	
	model.getComuniByProvinciaId(provincia.pk)
		.then(function(comuni){
	    	comuni.forEach( comune => loadCoordinateComune(comune, codiceProv));
	    })
	    .catch(function(err){
	    	console.log(err);
	    });
}

function getProvinceByRegione(regione) {

	model.getProvinceByRegioneId(regione.pk)
	    .then(function(province){
	    	province.forEach(provincia => getComuniByProvincia(provincia));
	    })
	    .catch(function(err){
	    	console.log(err);
	    });
}

function getTuttiComuniItalia(){
	model.getRegioni()
		.then(function(regioni){
			regioni.forEach( regione => getProvinceByRegione(regione));

	    })
	    .catch(function(err){
	        console.log(err);
	    });
}

// getTuttiComuniItalia();


function getCoordinateComuniByRegione(nomeRegione){
	model.getRegioneByName(nomeRegione)
		.then(function(regione){
			getProvinceByRegione(regione);

	    })
	    .catch(function(err){
	        console.log(err);
	    });
}

// getCoordinateComuniByRegione('Lombardia');

function loadCoordinateComuneByName(comune, codiceProv){

	// console.log("LOADING COORDITE COMUNE: " + comune.name + " - COD_PROV: " + codiceProv);

  	var geocodeParams2 = {
  		"address":    comune + " " + codiceProv + ", IT",
  		"components": "components=country:IT",
  		// "bounds":     "55,-1|54,1",
  		"language":   "it",
  		"region":     "it"
  	};

	var publicConfig = {
  		key: 'AIzaSyDopFGfG7qwz24oHWfDdyU14b3aW10SHZM',
  		stagger_time:       1000, // for elevationPath
  		encode_polylines:   false,
  		secure:             true // use https
  		// proxy:              'http://127.0.0.1:9999' // optional, set a proxy for HTTP requests
	};

	var gmAPI = new GoogleMapsAPI(publicConfig);

	gmAPI.geocode(geocodeParams2, function(err, result){

			if(err){
				console.error("COMUNE -> " + comune + " - " + codiceProv + ", IT");
				return console.error(err);
			}
		  // console.log(result);
		  
		  console.log("RESULT COORDINATE: ---> " +  util.inspect(result, { showHidden: true, depth: null }));

		  if(result && result.status === 'OK'){

		  	let arrResults = result.results;

		  	console.log("*********** " + comune + " - " + codiceProv + " **************");

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

		  	if(postalCode){
		  		console.log('FOUND POSTAL_CODE: ' + postalCode);
		  	}

		  } else {
		  	console.log("********************* ERROR **************");
		  	console.log(geocodeParams2);
		   }
		  
  
	});
	

}

// loadCoordinateComuneByName('Milano', 'MI');

// loadCoordinateComuneByName('Cascina Elisa', 'VA');

// loadCoordinateComuneByName('Busto Arsizio', 'VA');

// loadCoordinateComuneByName('Samarate', 'VA');

// loadCoordinateComuneByName('via Ottorino Respigni, 6, Samarate', 'VA');

// Cornale e Bastida PV 

// loadCoordinateComuneByName('Cornale e Bastida', 'PV');

// loadCoordinateComuneByName('Cornale', 'PV');

// loadCoordinateComuneByName('Bastida', 'PV');