/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

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

var getRecommended = async function (categories, callback) {
  modelDict.venue.find({
    subcategory: { $in: categories }
  }, {
    _id: 0
  }).then(result => {
    for (i in result) {
      result[i].rank = 20 + (40*score[result.subcategory]/score.total) + (35*result[i].rank) + Math.floor(Math.random() * Math.floor(5))
    }
    result.sort((a, b) => (a.rank > b.rank) ? 1 : -1)
    callback(result)
  }).catch(err => {
    callback([]);
  })
}

module.exports = async function (req, res) {
  modelDict.user.find({
    "userID" : { $in: req.body.users}
  }, {
    _id : 0
  }).then(result => {
    var score = { 
      total: result.length
    }
    for (user in result) {
      for (category in user.categories) {
        if (score.includes(category)) {
          score[category] = score[category + 1]
        } else {
          score[category] = 1
        }
      }
    }
    if (result != null) {
      getRecommended(score, function(recommendedForYou) {
        res.json({score: score, recommended: recommendedForYou})
      });
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
