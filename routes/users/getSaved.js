/*#################################################
Developed by: Exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID')
  }
  modelDict.user.findOne({
    "userID" : req.params.userID
  }, {
    _id : 0
  }).then(userResult => {
    if (userResult != null) {
      modelDict.venue.find({
        placeID: { $in: userResult.saved }
      }, {
        _id: 0
      }).then(result => {
        modelDict.event.find({
          placeID: { $in: userResult.saved }
        }, {
          _id: 0
        }).then(result1 => {
          result = result.concat(result1)
          res.json(result)
        })
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
