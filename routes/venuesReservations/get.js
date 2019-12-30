/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.placeID) {
    return res.status(400).send('Missing placeID')
  }
  modelDict.venueReservation.findOne({
    "placeID" : req.params.placeID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      res.json(result)
    } else {
      res.json(false)
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}