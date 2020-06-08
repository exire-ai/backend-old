/*#################################################
Developed by: Frank Pinnola
For exire.ai
#################################################*/

let modelDict = require("../models/schema").modelDict;

module.exports = async function (req, res) {
  if (!req.params.userID) {
    return res.status(400).send("Missing userID");
  }
  if (!req.params.venueID) {
    return res.status(400).send("Missing venueID");
  }
  modelDict.merchant
    .findOne(
      {
        userID: req.params.userID,
      },
      {
        _id: 0,
      }
    )
    .then((result) => {
      if (result != null) {
        result.venues.push(req.params.venueID);
        modelDict.merchant
          .updateOne(
            {
              userID: req.params.userID,
            },
            {
              venues: result.venues,
            },
            {
              _id: 0,
            }
          )
          .then((result) => {
            if (result.n == 1) {
              res.json(true);
            } else {
              res.json(false);
            }
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      } else {
        res.json(false);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
