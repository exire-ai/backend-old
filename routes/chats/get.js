/*#################################################
Developed by: Exire.ai
#################################################*/

let modelDict = require('../models/schema').modelDict;

var getVenues = async function (ids, callback) {
  modelDict.venue.find({
    placeID: { $in: ids }
  }, {
    _id: 0
  }).then(result => {
    callback(result);
  }).catch(err => {
    callback([]);
  })
}

module.exports = async function (req, res) {
  if(!req.params.chatID) {
    return res.status(400).send('Missing chatID');
  };
  modelDict.chat.findOne({
    "chatID" : req.params.chatID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      tempArray = []
      for (message in result.chat) {
        for (index in result.chat[message].venues) {
          tempArray.push(result.chat[message].venues[index])
        }
      }
      getVenues(tempArray, function(data) {
        for (message in result.chat) {
          for (index in result.chat[message].venues) {
            result.chat[message].venues[index] = data.find(x => x.placeID === result.chat[message].venues[index]);
          };
        };
        res.json(result);
      });
    } else {
      res.json(false);
    };
  }).catch(err => {
    res.status(500).json(err);
  });
};
