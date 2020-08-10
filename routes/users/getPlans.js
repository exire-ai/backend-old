/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

const _ = require("lodash");
let modelDict = require("../models/schema").modelDict;

var getVenues = async function (ids, callback) {
  modelDict.venue
    .find(
      {
        placeID: { $in: ids },
      },
      {
        _id: 0,
      }
    )
    .then((result) => {
      callback(result);
    })
    .catch((err) => {
      callback([]);
    });
};

var getEvents = async function (ids, callback) {
  modelDict.event
    .find(
      {
        eventID: { $in: ids },
      },
      {
        _id: 0,
      }
    )
    .then((result) => {
      callback(result);
    })
    .catch((err) => {
      callback([]);
    });
};

var getUsers = async function (ids, callback) {
  modelDict.user.find({ userID: { $in: ids },}, { _id: 0 })
  .then((result) => {
    callback(result);
  })
  .catch((err) => {
    callback([])
  })
}

module.exports = async function (req, res) {
  if (!req.params.userID) {
    return res.status(400).send("Missing userID");
  }
  modelDict.user
    .findOne(
      {
        userID: req.params.userID,
      },
      {
        _id: 0,
      }
    )
    .then((userResult) => {
      if (userResult != null) {
        modelDict.plan
          .find(
            {
              planID: { $in: userResult.plans },
            },
            {
              _id: 0,
            }
          )
          .then((result) => {
            if (!req.query.populate) {
              res.json(result);
            } else {
              var tempList = [];
              var userIDs = [];
              for (elem in result) {
                tempList = tempList.concat(result[elem].ids);
                userIDs = userIDs.concat(result[elem].users);
              }
              getVenues(tempList, function (venueData) {
                getEvents(tempList, function (eventData) {
                  getUsers(userIDs, function (userData) {
                    data = venueData.concat(eventData);


                    for (elem in result) {
                      for (j in result[elem]["ids"]) {
                        for (p in data) {
                          if ( 
                            _.get(data[p], "placeID", _.get(data[p], "eventID")) ===
                            result[elem]["ids"][j]
                          ) {
                            result[elem]["ids"][j] = data[p];
                          }
                        }
                      }
                      for (x in result[elem]["users"]) {
                        for (y in userData) {
                          if(userData[y]["userID"] === result[elem]["users"][x]) {
                            result[elem]["users"][x] = userData[y];
                          }
                        }
                      }
                    }
  
                    res.json(result);
                  })

                });
              });
            }
          });
      } else {
        res.json(false);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
