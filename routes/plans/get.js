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
  if(!req.params.planID) {
    return res.status(400).send('Missing planID')
  }
  modelDict.plan.findOne({
    "planID" : req.params.planID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      if (!req.query.populate) {
          res.json(result)
      } else {
        getVenues(result.venues, function(venues) {
          getEvents(result.venues, function(events) {
            var temp = venues.concat(events)
            result.venues = temp;
            res.json(result)
          });
        });
      }
    } else {
      res.json(false)
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
