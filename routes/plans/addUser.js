/*#################################################
Developed by: Frank Pinnola
For exire.ai
#################################################*/

let modelDict = require("../models/schema").modelDict;

module.exports = async function (req, res) {
  if (!req.params.planID) {
    return res.status(400).send("Missing planID");
  }
  if (!req.params.userID) {
    return res.status(400).send("Missing userID");
  }
  console.log(req.params.planID);
  modelDict.plan
    .updateOne(
      {
        planID: req.params.planID,
      },
      { $push: { users: req.params.userID } }
    )
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.json(true);
      } else {
        res.json(false);
      }
      res.json(true);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
