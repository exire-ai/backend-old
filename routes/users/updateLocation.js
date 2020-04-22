/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID')
  }
  if(!req.params.lat) {
    return res.status(400).send('Missing lat')
  }
  if(!req.params.lon) {
    return res.status(400).send('Missing lon')
  }
  modelDict.user.updateOne({
    "userID" : req.params.userID
  }, {
    "lat" : req.params.lat,
    "lon" : req.params.lon
  }, {
    _id : 0
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
