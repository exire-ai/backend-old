/*#################################################
Developed by: Exire.ai
#################################################*/

var apn = require('apn');
path = require("path")
var modelDict = require('../models/schema').modelDict;
const { TWILIO_SID, TWILIO_KEY } = require('../../config');

const accountSid = TWILIO_SID;
const authToken = TWILIO_KEY;
const client = require('twilio')(accountSid, authToken);

var sendText = (body, callback) => {
  client.messages.create({
     body: body,
     from: '+14243469443',
     to: '+17322527693'
   })
  .then((message, error) =>
    client.messages.create({
       body: body,
       from: '+14243469443',
       to: '+18185191330'
     })
    .then((message, error) =>
      callback(true)
    ).catch( error => {
      callback(false)
    })
  ).catch( error => {
    callback(false)
  })
};

module.exports = async function (req, res) {
  if(!req.params.userID) {
    return res.status(400).send('Missing userID')
  }
  modelDict.user.findOne({
    "userID" : req.params.userID
  }, {
    _id : 0
  }).then(result => {
    body = "User " + result.name + " has made a special occassions request from " + result.number + ". With categories: [" + result.categories + "] These saved: [" + result.saved + "] and UserID: (" + result.userID + ")";
    if (result != null) {
      sendText(body, function(text) {
        res.json(text);
      });
    }
  }).catch(err => {
    res.send(false)
  })
}
