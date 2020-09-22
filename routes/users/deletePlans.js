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
  }).then(result => {
    if (result != null) {
      var originalLength = result.plans.length
      for (var i = 0; i < originalLength; i++) {
        if (result.plans[i].planID == req.params.planID) {
          result.plans.splice(i, 1);
          break;
        }
      }
      if (result.plans.length == originalLength) {
        res.send(false)
      }
      modelDict.user.updateOne({
        "userID" : req.params.userID
      }, {
        "plans" : result.plans
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
