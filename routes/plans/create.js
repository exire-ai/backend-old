/*#################################################
Developed by: Hayden Daly & Frank Pinnola
For exire.ai
#################################################*/

let modelDict = require("../models/schema").modelDict;

var generateID = async function (callback) {
  var planID = Math.random().toString(36).replace("0.", "");
  modelDict.plan
    .findOne({
      planID: planID,
    })
    .then((result) => {
      if (result !== null) {
        generateID(function (result) {
          callback(result);
        });
      } else {
        callback(planID);
      }
    });
};

module.exports = async function (req, res) {
  var body = req.body;
  generateID(function (planID) {
    body.planID = planID;
    var model = new modelDict.plan(body);
    model
      .save(req.body)
      .then((result) => {
        if (result != null) {
          res.json(body.planID);
        } else {
          res.json(false);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  });
};
