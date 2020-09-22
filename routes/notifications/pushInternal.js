/*#################################################
Developed by: Exire.ai
#################################################*/

var apn = require('apn');
var path = require("path");
var modelDict = require('../models/schema').modelDict;

module.exports = async function (userID, admin, dev, callback) {
  if (admin) {
    modelDict.adminUser.find({}, {
      _id : 0
    }).then(result => {
      if (result != null) {
        production = dev;
        var apnProvider = new apn.Provider({
          token: {
            key: 'routes/notifications/apns.p8',
            keyId: 'X5RW45ZAG7',
            teamId: 'B27FT2QD52'
          },
          development: true,
          production: false
        });

        var notification = new apn.Notification();
        notification.topic = "ai.Exire.ExireAdmin";
        notification.expiry = Math.floor(Date.now() / 1000) + 3600;
        notification.badge = 3;
        notification.sound = 'ping.aiff';
        notification.alert = "New message";
        notification.payload = { id: 123 };
        notification.title = "From user";
        console.log(result[0].deviceID);
        apnProvider.send(notification, result[0].deviceID).then( (res) => {
          res.sent.forEach( (token) => {
            apnProvider.send(notification, result[1].deviceID).then( (res) => {
              res.sent.forEach( (token) => {
                callback(true);
              });
              res.failed.forEach( (failure) => {
                if (failure.error) {
                  console.log(failure.error)
                  callback(false);
                } else {
                  console.log(failure.status, " : ", failure.response);
                  callback(false);
                };
              });
            });
          });
          res.failed.forEach( (failure) => {
            if (failure.error) {
              console.log(failure.error);
              callback(false);
            } else {
              console.log(failure.status, " : ", failure.response);
              callback(false);
            };
          });
        })
      } else {
        callback(false);
      };
    }).catch(err => {
      callback(false);
    });
  } else {
    modelDict.user.findOne({
      "userID" : userID
    }, {
      _id : 0
    }).then(result => {
      console.log(result)
      if (result != null) {
        production = dev;
        var apnProvider = new apn.Provider({
          token: {
            key: 'routes/notifications/apns.p8',
            keyId: 'X5RW45ZAG7',
            teamId: 'B27FT2QD52'
          },
          development: true,
          production: false
        });
        var notification = new apn.Notification();
        notification.topic = "ai.Exire.ExireApp";
        notification.expiry = Math.floor(Date.now() / 1000) + 3600;
        notification.badge = 3;
        notification.sound = 'ping.aiff';
        notification.alert = "New Message";
        notification.payload = { id: 123 };
        notification.title = "From User";
        console.log(result.deviceID);
        apnProvider.send(notification, result.deviceID).then( (res) => {
          res.sent.forEach( (token) => {
            callback(true);
          });
          res.failed.forEach( (failure) => {
            if (failure.error) {
              console.log(failure.error);
              callback(false);
            } else {
              console.log(failure.status, " : ", failure.response);
              callback(false);
            };
          });
        });
      } else {
        callback(false);
      };
    }).catch(err => {
      callback(false);
    });
  };
};
