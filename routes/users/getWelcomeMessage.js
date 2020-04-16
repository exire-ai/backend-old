/*#################################################
Developed by: Frank Pinnola
For exire.ai
#################################################*/

let modelDict = require("../models/schema").modelDict;

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
    .then((result) => {
      var base = "Welcome to Exire! ";
      if (result != null) {
        if (result.name != "" && result.name != null) {
          base = "Hello " + result.name + ", my name is Emma. ";
        }
      }
      res.json({
        text:
          base +
          "I can help you find activities and restaurants based on your preferences!",
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  res.json(welcome);
};
