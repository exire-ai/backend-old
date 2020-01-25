/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

var referenceDict =       {
  "poke" : "Poke",
  "barbeque" : "BBQ",
  "pizza" : "Pizza",
  "burgers" : "Burgers",
  "cafe" : "Cafe",
  "chinese" : "Chinese",
  "italian" : "Italian",
  "japanese" : "Japanese",
  "markets" : "Market",
  "mexican" : "Mexican",
  "oriental" : "Oriental",
  "sandwiches" : "Sandwiches",
  "sushi" : "Sushi",
  "newamerican" : "American",
  "artmuseums" : "Art",
  "museums" : "Museums",
  "parks" : "Park",
  "artgalleries" : "Gallery",
  "arcades" : "Arcade",
  "rockclimbing" : "Rock Climbing",
  "spa" : "Spa",
  "yoga" : "Yoga",
  "extreme" : "Extreme",
  "dancing" : "Dancing",
  "acaibowl" : "Acai",
  "icecream" : "Ice Cream",
  "bakeries" : "Bakery",
  "tea" : "Tea",
  "bars" : "Bar",
  "pubs" : "Pub",
  "cocktailbars" : "Cocktails",
  "speakeasies" : "Speakeasy",
  "danceclubs" : "Club",
  "karaoke" : "Karaoke",
  "wine_bars" : "Wine",
  "gelato" : "Gelato"
}

var generateID = async function (callback) {
  var planID = Math.random().toString(36).replace('0.', '');
  modelDict.plan.findOne({
    "planID" : planID
  }).then(result => {
    if (result !== null) {
      generateID(function(result) {
        callback(result);
      })
    } else {
      callback(planID);
    }
  })
}

var getVenues = async function (venues, callback) {
  modelDict.venue.find({
    placeID: { $in: venues }
  }, {
    _id: 0
  }).then(result => {
    callback(result)
  }).catch(err => {
    callback([]);
  })
}

module.exports = async function (req, res) {
  var body = req.body;
  generateID(function(planID) {
    body.planID = planID
    getVenues(body.venues, function(result) {
      var name = ""
      var cost = 0
      for (var i = 0; i < result.length; i++) {
        var category = referenceDict[result[i]["subcategory"]]
        cost = cost + result[i]["cost"]
        if (category !== null) {
          name = name.concat(category)
          if (i !== result.length - 1) {
            name = name.concat(" / ")
          }
        }
      }
      body.cost = cost
      body.name = name
      var model = new modelDict.plan(body)
      model.save(body)
      .then(result => {
        if (result != null) {
          modelDict.user.findOne({
            "userID" : body.userID
          }, {
            _id : 0
          }).then(result => {
            if (result != null) {
              result.plans.push(planID)
              modelDict.user.updateOne({
                "userID" : body.userID
              }, {
                "plans" : result.plans
              }, {
                _id : 0
              }).then(result => {
                if (result.n == 1) {
                  res.json({
                    "planID" : planID
                  })
                } else {
                  res.json(false)
                }
              }).catch(err => {
                res.status(500).json(err)
              })
            } else {
              res.json(false);
            }
          }).catch(err => {
            res.status(500).json(err)
          })
        } else {
          res.json(false)
        }
      }).catch(err => {
        res.status(500).json(err)
      })
    })
  })
}
