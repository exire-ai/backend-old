/*#################################################
Developed by: Exire.ai
#################################################*/

let modelDict = require("../models/schema").modelDict;

module.exports = async function (req, res) {
  // req.body.placeID = req.body.title.toLowerCase().replace(/\s/g, "");
  var model = new modelDict.venue(req.body);
  model
    .save(req.body)
    .then((result) => {
      if (result != null) {
        res.json(result.placeID);
      } else {
        res.json(false);
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
