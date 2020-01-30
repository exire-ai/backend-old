/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

// Food, Visual, Active, Alcohol, Sports, Musical, Treats

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
  }).limit(100).then(result => {
    callback(result)
  }).catch(err => {
    callback([]);
  })
}

var ensureNoOverlap = async function (venues, callback) {
  twentyMeters = .004;
  console.log(venues.length)
  rangeList = [];
  for ( elem in  venues) {
    var bool = true
    for ( dict in rangeList ) {
      console.log(rangeList[dict].latitudeSouth, rangeList[dict].latitudeNorth, rangeList[dict].longitudeWest, rangeList[dict].longitudeEast)
      // console.log(rangeList[dict].longitudeEast, " > ", rangeList[dict].longitudeWest)
      if (venues[elem].latitude >= rangeList[dict].latitudeSouth && venues[elem].latitude <= rangeList[dict].latitudeNorth) {
        if (venues[elem].longitude <= rangeList[dict].longitudeEast && venues[elem].longitude >= rangeList[dict].longitudeWest) {
          console.log("Works!")
          var bool = false;
        }
      }
    }
    if (bool) {
      rangeList.push({
        "latitudeNorth" : venues[elem].latitude + twentyMeters,
        "latitudeSouth" : venues[elem].latitude - twentyMeters,
        "longitudeWest" : venues[elem].longitude - twentyMeters,
        "longitudeEast" : venues[elem].longitude + twentyMeters
      });
    }
  }

  console.log(rangeList.length)
  callback(venues)
}

module.exports = async function (req, res) {
  if(!req.params.lat) {
    return res.status(400).send('Missing lat')
  }
  if(!req.params.lon) {
    return res.status(400).send('Missing lon')
  }
  var radius = 1
  if(req.query.radius) {
    radius = req.query.radius
  }
  getRegions(req.params.lat, req.params.lon, radius, function(regions) {
    getByRegions(regions, function(inRegions) {
      ensureNoOverlap(inRegions, function(noOverlap) {
        var tempInRegions = []
        for (elem in noOverlap) {
          noOverlap[elem]["category"] = categoryDict[noOverlap[elem]["subcategory"]]
        }
        res.json(noOverlap)
      })
    });
  });
}
