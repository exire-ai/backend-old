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
  modelDict.chat.find({}, {
    _id: 0
  }).then(result => {
    tempArray = [];
    for (chat in result) {
      for (message in result[chat].chat) {
        for (index in result[chat].chat[message].venues) {
          tempArray.push(result[chat].chat[message].venues[index]);
        };
      };
    };
    getVenues(tempArray, function(data) {
      for (chat in result) {
        for (message in result[chat].chat) {
          for (index in result[chat].chat[message].venues) {
            result[chat].chat[message].venues[index] = data.find(x => x.placeID === result[chat].chat[message].venues[index]);
          };
        };
      };
      res.json(result);
    });
  }).catch(err => {
    res.json([]);
  });
};
