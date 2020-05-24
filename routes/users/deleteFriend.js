/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID')
  }
  if(!req.params.otherUserID) {
    return res.status(400).send('Missing otherUserID')
  }
  modelDict.user.findOne({
    "userID" : req.params.userID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      var originalLength = result.friends.length
      for (var i = 0; i < originalLength; i++) {
        if (result.friends[i] == req.params.otherUserID) {
          result.friends.splice(i, 1);
          break;
        }
      }
      if (result.friends.length == originalLength) {
        res.send(false)
        return
      }
      modelDict.user.updateOne({
        "userID" : req.params.userID
      }, {
        "friends" : result.friends
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
