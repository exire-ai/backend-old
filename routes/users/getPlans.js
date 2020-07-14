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
                tempList.concat(result[elem].ids)
                console.log(result[elem])
              }
              console.log(tempList)
              getVenues(tempList, function (venueData) {
                getEvents(tempList, function (eventData) {
                  data = venueData.concat(eventData);

                  console.log(data)

                  // for (elem in result) {
                  //   for (j in result[elem]["ids"]) {
                  //     for (p in data) {
                  //       console.log(data[p]["eventID"]);
                  //       console.log(result[elem]["bookings"][j]["eventID"]);
                  //       if (
                  //         data[p]["eventID"] ===
                  //         result[elem]["bookings"][j]["eventID"]
                  //       ) {
                  //         result[elem]["bookings"][j]["venue"] = data[p];
                  //       }
                  //     }
                  //   }
                  // }

                  for (elem in result) {
                    for (j in result[elem]["ids"]) {
                      for (p in data) {
                        if ( 
                          data[p]["eventID"] ===
                          result[elem]["ids"][j]["eventID"] ||
                          data[p]["planID"] ===
                          result[elem]["ids"][j]["venueID"]
                        ) {
                          result[elem]["ids"][j] = data[p];
                        }
                      }
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
