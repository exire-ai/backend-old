/*#################################################
Developed by: Exire.ai
#################################################*/

var apn = require('apn');
path = require("path")
var modelDict = require('../models/schema').modelDict;

module.exports = async function (userID, admin, dev, title, message, callback) {
  if(admin) {
    modelDict.adminUser.find({}, {
      _id : 0
    }).then(result => {
      if (result != null) {
        var apnProvider = new apn.Provider({
          token: {
            key: 'routes/notifications/apns.p8',
            keyId: '',
            teamId: ''
          },
          development: true,
          production: dev
        });

        var notification = new apn.Notification();
        notification.topic = "ai.Exire.ExireAdmin";
        notification.expiry = Math.floor(Date.now() / 1000) + 3600;
        notification.badge = 3;
        notification.sound = 'ping.aiff';
        notification.alert = message;
        notification.payload = { id: 123 };
        notification.title = title;
        apnProvider.send(notification, result[0].deviceID).then( (res) => {
          res.sent.forEach( (token) => {
            apnProvider.send(notification, result[1].deviceID).then( (res) => {
              res.sent.forEach( (token) => {
                callback(true);
              });
              res.failed.forEach( (failure) => {
                if (failure.error) {
                  console.log(failure.error)
                  callback(false)
                } else {
                  console.log(failure.status, " : ", failure.response);
                  callback(false)
                }
              });
            })
          });
          res.failed.forEach( (failure) => {
            if (failure.error) {
              console.log(failure.error)
              callback(false)
            } else {
              console.log(failure.status, " : ", failure.response);
              callback(false)
            }
          });
        })
      } else {
        callback(false)
      }
    }).catch(err => {
      callback(false)
    })
  } else {
    modelDict.user.findOne({
      "userID" : userID
    }, {
      _id : 0
    }).then(result => {
      if (result != null) {
        var apnProvider = new apn.Provider({
          token: {
            key: 'routes/notifications/apns.p8',
            keyId: '',
            teamId: ''
          },
          development: true,
          production: dev
        });

        var notification = new apn.Notification();
        notification.topic = "ai.Exire.ExireApp";
        notification.expiry = Math.floor(Date.now() / 1000) + 3600;
        notification.badge = 3;
        notification.sound = 'ping.aiff';
        notification.alert = message;
        notification.payload = { id: 123 };
        notification.title = title;
        apnProvider.send(notification, result.deviceID).then( (res) => {
          res.sent.forEach( (token) => {
            callback(true);
          });
          res.failed.forEach( (failure) => {
            if (failure.error) {
              console.log(failure.error)
              callback(false)
            } else {
              console.log(failure.status, " : ", failure.response);
              callback(false)
            }
          });
        })
      } else {
        callback(false)
      }
    }).catch(err => {
      callback(false)
    })
  }
}
