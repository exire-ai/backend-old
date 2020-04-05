/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

var generateID = async function (callback) {
  var chatID = Math.random().toString(36).replace('0.', '');
  modelDict.chat.findOne({
    "chatID" : chatID
  }).then(result => {
    if (result != null) {
      generateID(function(result) {
        callback(result);
      })
    } else {
      callback(chatID);
    }
  })
}

module.exports = async function (req, res) {
  generateID(function(chatID) {
    req.body.chatID = chatID
    if (req.body.chat.length == 1) {
      req.body.chat[0].time = Math.floor(new Date() / 1000);
      req.body.chat[0].venues = [];
    }
    var model = new modelDict.chat(req.body)
    model.save(req.body)
    .then(result => {
      if (result != null) {
        modelDict.user.findOne({
          "userID" : req.body.userID
        }, {
          _id : 0
        }).then(result => {
          if (result != null) {
            modelDict.user.updateOne({
              "userID" : req.body.userID
            }, {
              "chatID" : req.body.chatID
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
      } else {
        res.json(false)
      }
    }).catch(err => {
      res.status(500).json(err)
    })
  })
}
