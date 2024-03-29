/*#################################################
Developed by: Exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;
let pushInternal2 = require('../notifications/pushInternal2');

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
      }).then(result2 => {
        if (result2.n == 1) {
          if (result.userID == req.body.senderID) {
            pushInternal2(result.userID, true, false, "New Message", req.body.message + " FROM " + result.userID, function(data) {
              res.json(data);
            });
          } else {
            if (req.body.venues.length != 0) {
              title = "New Message"
              message = "Hello! I have sent you some venues you might be interested in."
            } else {
              title = "New Message"
              message = req.body.message
            }
            pushInternal2(result.userID, false, false, title, message, function(data) {
              res.json(data);
            });
          };
        } else {
          res.json(false);
        };
      }).catch(err => {
        res.status(500).json(err);
      });
    } else {
      res.json(false);
    };
  }).catch(err => {
    res.status(500).json(err);
  });
};
