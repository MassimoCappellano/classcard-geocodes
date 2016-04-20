'use strict'

var util = require('util');

var model = require('./models/comuni');

var query = {};

query.location = {
  $near : {
    $geometry : {
      type : "Point",
      coordinates : [8.7870324, 45.6260364]
    },
    $maxDistance : 10 * 1000
  }
};

// { lat: 45.6260364, lng: 8.7870324 }

model.Comune.find(query, function(err, comuni){
	comuni.forEach(comune => {
		console.log(comune);
	});
});