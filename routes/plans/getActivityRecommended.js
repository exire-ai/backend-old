/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require("../models/schema").modelDict;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

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

var getActivityRecommended = async function (categories, callback) {
  modelDict.venue
    .find(
      {
        category: { $ne: "food" },
        subcategory: { $in: categories },
      },
      {
        _id: 0,
      }
    )
    .then((result) => {
      callback(result);
    })
    .catch((err) => {
      callback([]);
    });
};

module.exports = async function (req, res) {
  if (!req.params.userID) {
    return res.status(400).send("Missing userID");
  }
  modelDict.user
    .findOne(
      {
        userID: req.params.userID,
      },
      {
        _id: 0,
      }
    )
    .then((result) => {
      if (result != null) {
        getActivityRecommended(result.categories, function (recommendedForYou) {
          res.json(shuffle(recommendedForYou));
        });
      } else {
        res.json(false);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
