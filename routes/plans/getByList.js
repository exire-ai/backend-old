/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

var getVenues = async function (ids, callback) {
  modelDict.venue.find({
    placeID: { $in: ids }
  }, {
    _id: 0
  }).then(result => {
    callback(result);
  }).catch(err => {
    callback([]);
  })
}

var getEvents = async function (ids, callback) {
  modelDict.event.find({
    eventID: { $in: ids }
  }, {
    _id: 0
  }).then(result => {
    callback(result);
  }).catch(err => {
    callback([]);
  })
}

module.exports = async function (req, res) {
  getVenues(req.body.ids, function(venues) {
    getEvents(req.body.ids, function(events) {
      var result = venues.concat(venues)
      res.json(result)
    });
  });
}
