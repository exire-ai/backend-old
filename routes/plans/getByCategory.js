/*#################################################
Developed by: Exire.ai
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

var getVenues = async function (subcategory, callback) {
  modelDict.venue
    .find(
      {
        subcategory: subcategory,
        valid: true,
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

var getEvents = async function (subcategory, callback) {
  modelDict.event
    .find(
      {
        subcategory: subcategory,
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
  if (!req.params.category) {
    return res.status(400).send("Missing category");
  }
  getVenues(req.params.category, function (venues) {
    getEvents(req.params.category, function (events) {
      var result = venues.concat(events);
      res.json(result);
    });
  });
};
