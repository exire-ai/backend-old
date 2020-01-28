/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID')
  }
  if(!req.params.placeID) {
    return res.status(400).send('Missing placeID')
  }
  modelDict.user.findOne({
    "userID" : req.params.userID
  }, {
    _id : 0
  }).then(result => {
    if (result.saved.includes(req.params.placeID)) {
      res.send(false)
      return;
    }
    if (result != null) {
      result.saved.push(req.params.placeID)
      modelDict.user.updateOne({
        "userID" : req.params.userID
      }, {
        "saved" : result.saved
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
    } else {
      res.json(false);
    }
  }).catch(err => {
    res.status(500).json(err)
  })
}
