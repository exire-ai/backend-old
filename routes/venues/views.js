/*#################################################
Developed by: Exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.placeID) {
    return res.status(400).send('Missing placeID')
  }
  modelDict.venue.updateOne({
    "placeID" : req.params.placeID
  }, {
    $inc: {
      peopleWatching: 1
    }
  }).then(result => {
    if (result.n == 1) {
      res.json(true)
    } else {
      res.json(false)
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
