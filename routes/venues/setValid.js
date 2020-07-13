/*#################################################
Developed by: Frank Pinnola
For exire.ai
#################################################*/

let modelDict = require("../models/schema").modelDict;

module.exports = async function (req, res) {
  if (!req.params.placeID) {
    return res.status(400).send("Missing placeID");
  } else if (!req.params.isValid) {
    return res.status(400).send("Missing isValid");
  }
  modelDict.venue
    .update(
      { placeID: req.params.placeID },
      {
        $set: {
          valid: req.params.isValid,
        },
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
};
