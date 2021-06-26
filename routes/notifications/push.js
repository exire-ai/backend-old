/*#################################################
Developed by: Exire.ai
#################################################*/

var apn = require('apn');
path = require("path")
var modelDict = require('../models/schema').modelDict;

module.exports = async function (req, resp) {
  if(!req.params.userID) {
    return resp.status(400).send('Missing userID')
  }
  modelDict.user.findOne({
    "userID" : req.params.userID
  }, {
    _id : 0
  }).then(result => {
    if (result != null) {
      if (req.query.dev == null) {
        production = true
      } else {
        production = false
      }
      var apnProvider = new apn.Provider({
        token: {
          key: 'routes/notifications/apns.p8',
          keyId: '',
          teamId: ''
        },
        development: true,
        production: production
      });

      var notification = new apn.Notification();
      notification.topic = "ai.Exire.ExireApp";
      notification.expiry = Math.floor(Date.now() / 1000) + 3600;
      notification.badge = 3;
      notification.sound = 'ping.aiff';
      notification.alert = req.body.message;
      notification.payload = { id: 123 };
      notification.title = req.body.title;
      console.log(result.deviceID);
      apnProvider.send(notification, result.deviceID).then( (res) => {
        res.sent.forEach( (token) => {
          resp.json(true);
        });
        res.failed.forEach( (failure) => {
          if (failure.error) {
            console.log(failure.error)
            resp.json(false)
          } else {
            console.log(failure.status, " : ", failure.response);
            resp.json(false)
          }
        });
      })
    } else {
      resp.json(false)
    }
  }).catch(err => {
    resp.status(500).json(err)
  })
}
