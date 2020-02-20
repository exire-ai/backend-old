/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

module.exports = async function (req, res) {
  if(!req.params.chatID) {
    return res.status(400).send('Missing chatID')
  }
  modelDict.chat.findOne({
    "chatID" : req.params.chatID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      req.body.time = Math.floor(new Date() / 1000);
      if (req.body.venues == null) {
        req.body.venues = []
      }
      result.chat.push(req.body)
      modelDict.chat.updateOne({
        "chatID" : req.params.chatID
      }, {
        "chat" : result.chat
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
