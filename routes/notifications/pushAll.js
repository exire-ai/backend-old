/*#################################################
Developed by: Exire.ai
#################################################*/

var apn = require('apn');
path = require("path")
var modelDict = require('../models/schema').modelDict;

module.exports = async function (req, resp) {
  modelDict.user.find()
  .then(result => {
    if (result != null) {
      if (req.query.dev == null) {
        production = true
      } else {
        production = false
      }
      var apnProvider = new apn.Provider({
        token: {
          key: 'routes/notifications/apns.p8',
          keyId: 'X5RW45ZAG7',
          teamId: 'B27FT2QD52'
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
      for (var i = 0; i < result.length; i++) {
        apnProvider.send(notification, result[i].deviceID).then( (res) => {
          res.sent.forEach( (token) => {
            console.log(true)
          });
          res.failed.forEach( (failure) => {
            if (failure.error) {
              console.log(failure.error)
              console.log(false)
            } else {
              console.log(failure.status, " : ", failure.response);
              console.log(false)
            }
          });
        })
      }
      resp.json(true)
    } else {
      resp.json(false)
    }
  }).catch(err => {
    resp.status(500).json(err)
  })
}
