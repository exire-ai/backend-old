/*#################################################
Developed by: Exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

// Food, Visual, Active, Alcohol, Sports, Musical, Treats

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

var categoryDict =       {
  "poke" : "food",
  "barbeque" : "food",
  "pizza" : "food",
  "burgers" : "food",
  "cafe" : "food",
  "chinese" : "food",
  "italian" : "food",
  "japanese" : "food",
  "markets" : "food",
  "mexican" : "food",
  "oriental" : "food",
  "sandwiches" : "food",
  "sushi" : "food",
  "newamerican" : "food",
  "artmuseums" : "visual",
  "museums" : "visual",
  "parks" : "active",
  "artgalleries" : "visual",
  "arcades" : "active",
  "rockclimbing" : "active",
  "spa" : "active",
  "yoga" : "active",
  "extreme" : "active",
  "dancing" : "active",
  "acaibowl" : "treat",
  "icecream" : "treat",
  "bakeries" : "food",
  "tea" : "food",
  "bars" : "alcohol",
  "pubs" : "alcohol",
  "cocktailbars" : "alcohol",
  "speakeasies" : "alcohol",
  "danceclubs" : "musical",
  "karaoke" : "musical",
  "wine_bars" : "alcohol",
  "gelato" : "treat"
}

var latLonDict = {
  "Upper West Side" : [40.7870, -73.9754],
  "Upper East Side" : [40.7736, -73.9566],
  "Midtown West" : [40.7638, -73.9918],
  "Midtown East" : [40.7571, -73.9719],
  "Chelsea" : [40.7465, -74.0014],
  "Flatiron" : [40.7401, -73.9903],
  "Greenwich Village" : [40.7336, -74.0027],
  "East Village" : [40.7265, -73.9815],
  "SoHo" : [40.7233, -74.0030],
  "Lower East Side" : [40.7150, -73.9843],
  "Lower Manhattan" : [40.7209, -74.0007],
  "Hoboken" : [40.7440, -74.0324]
}

function distance(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		return dist;
	}
}

var getRegions = async function (lat, lon, radius, callback) {
  var tempList = [];
  for (key in latLonDict) {
    if (radius > distance(lat, lon, latLonDict[key][0], latLonDict[key][1])) {
      tempList.push(key);
    }
  }
  callback(tempList);
}

var getByRegions = async function (regions, callback) {
  modelDict.venue.find({
    region: { $in: regions }
  }, {
    _id: 0
  }).then(result => {
    callback(result)
  }).catch(err => {
    callback([]);
  })
}

var ensureNoOverlap = async function (lat, lon, venues, ogRadius, callback) {
  venues = shuffle(venues);
  radius = .003;
  tempList = []
  rangeList = [{
    "latitudeNorth" : parseFloat(lat) + radius,
    "latitudeSouth" : lat - radius,
    "longitudeWest" : lon - radius,
    "longitudeEast" : parseFloat(lon) + radius
  }];
  console.log(rangeList)
  for ( elem in  venues) {
    if (ogRadius <= distance(lat, lon, venues[elem].latitude, venues[elem].longitude)) {
      continue;
    }
    var bool = true
    for ( dict in rangeList ) {
      if (venues[elem].latitude >= rangeList[dict].latitudeSouth && venues[elem].latitude <= rangeList[dict].latitudeNorth) {
        if (venues[elem].longitude <= rangeList[dict].longitudeEast && venues[elem].longitude >= rangeList[dict].longitudeWest) {
          console.log("-", venues[elem].title)
          var bool = false;
        }
      }
    }
    if (bool) {
      console.log("+", venues[elem].title)
      rangeList.push({
        "latitudeNorth" : venues[elem].latitude + radius,
        "latitudeSouth" : venues[elem].latitude - radius,
        "longitudeWest" : venues[elem].longitude - radius,
        "longitudeEast" : venues[elem].longitude + radius
      });
      venues[elem]["__v"] = distance(lat, lon, venues[elem].latitude, venues[elem].longitude);
      if (venues[elem]["__v"] < ogRadius) {
        tempList.push(venues[elem]);
      }
    }
  }
  tempList.sort((a,b) => (a["__v"] > b["__v"]) ? 1: -1)
  callback(tempList)
}

var checkPrice = async function (price, venues, callback) {
  var tempList = [];
  for (elem in venues) {
    if (venues[elem].cost < price) {
      tempList.push(venues[elem]);
    }
  }
  callback(tempList);
}

module.exports = async function (req, res) {
  if(!req.params.lat) {
    return res.status(400).send('Missing lat')
  }
  if(!req.params.lon) {
    return res.status(400).send('Missing lon')
  }
  var radius = 2
  if(req.query.radius) {
    radius = req.query.radius
  }
  var price = 500;
  if(req.query.price) {
    price = req.query.price;
  }
  getRegions(req.params.lat, req.params.lon, 5, function(regions) {
    getByRegions(regions, function(inRegions) {
      ensureNoOverlap(req.params.lat, req.params.lon, inRegions, radius, function(noOverlap) {
        checkPrice(price, noOverlap, function(finalResult) {
          var tempInRegions = []
          for (elem in finalResult) {
            noOverlap[elem]["category"] = categoryDict[finalResult[elem]["subcategory"]]
          }
          res.json(finalResult)
        })
      })
    });
  });
}
