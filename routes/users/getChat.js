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
    if (result !== null) {
      generateID(function(result) {
        callback(result);
      })
    } else {
      callback(chatID);
    }
  })
}

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID')
  }
  modelDict.user.findOne({
    "userID" : req.params.userID
  }, {
    _id : 0
  }).then(userResult => {
    console.log(userResult)
    if (userResult != null) {
      modelDict.chat.findOne({
        chatID: userResult.chatID
      }, {
        _id: 0
      }).then(result => {
        if (result) {
          res.json(result);
        } else {

// NEED TO APPLY SOME DESIGN PATTERNS AND SIMPLIFY

          generateID(function(chatID) {
            body = {
              "chatID" : chatID,
              "userID" : req.params.userID
            };
            var model = new modelDict.chat(body)
            model.save(body)
            .then(result => {
              if (result != null) {
                  modelDict.user.updateOne({
                    "userID" : req.params.userID
                  }, {
                    "chatID" : body.chatID
                  }, {
                    _id : 0
                  }).then(userUpdate => {
                    if (userUpdate.n == 1) {
                      res.json(result)
                    } else {
                      res.json(false)
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
