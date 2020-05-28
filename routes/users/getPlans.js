/*#################################################
Developed by: Hayden Daly
For exire.ai
#################################################*/

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
              for (elem in result) {
                tempList.push.apply(
                  tempList,
                  result[elem].bookings.map((a) => a.eventID)
                );
              }
              getVenues(tempList, function (venueData) {
                getEvents(tempList, function (eventData) {
                  data = venueData.concat(eventData);
                  // console.log(data);

                  for (elem in result) {
                    for (j in result[elem]["bookings"]) {
                      for (p in data) {
                        console.log(data[p]["eventID"]);
                        console.log(result[elem]["bookings"][j]["eventID"]);
                        if (
                          data[p]["eventID"] ===
                          result[elem]["bookings"][j]["eventID"]
                        ) {
                          result[elem]["bookings"][j]["venue"] = data[p];
                        }
                      }
                      //TODO: Will have to update when incorporating venueIDs / eventIDs
                      // result[elem]["bookings"][j]["venue"] = data.find(
                      //   (x) =>
                      //     (x.eventID ===
                      //       result[elem]["bookings"][j]["eventID"] &&
                      //       result[elem]["bookings"[j]["eventID"] != null]) ||
                      //     (x.placeID ===
                      //       result[elem]["bookings"][j]["venueID"] &&
                      //       result[elem]["bookings"][j]["venueID"] != null)
                      // );
                    }
                  }
                  res.json(result);
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
