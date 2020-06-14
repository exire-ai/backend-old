/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

var getVenues = async function (ids, callback) {
  modelDict.venue.find({
    subcategory: { $in: ids }
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
    subcategory: { $in: ids }
  }, {
    _id: 0
  }).then(result => {
    callback(result);
  }).catch(err => {
    callback([]);
  })
}

module.exports = async function (req, res) {
  // var categories = req.query.categories.split(',');
  var categories = ['sushi', 'italian']
  getVenues(categories, function(venues) {
    getEvents(categories, function(events) {
      var result = venues.concat(events)
      res.json(result)
    });
  });
}
